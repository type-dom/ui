import { defineExpose, Fragment, Input, TypeDiv } from '@type-dom/framework';
import { ITdUploadContent, UploadContentProps } from './upload-content.interface';
import { uploadContentProps } from './upload-content.const';
import { useNamespace } from '../../../../hooks/use-namespace';
import { useFormDisabled } from '../../td-form/hooks/use-form-common-props';
import { signal, unref } from '@type-dom/signals';
import { UploadFile, UploadHooks, UploadRawFile, UploadRequestOptions } from '../td-upload.interface';
import { genFileId } from '../td-upload.const';
import { AnyFn, entriesOf, isFunction, isPlainObject } from '@type-dom/utils';
import { cloneDeep, isEqual } from 'lodash';
import { TdUploadDrag } from '../upload-dragger/upload-dragger.class';

export class TdUploadContent extends TypeDiv implements ITdUploadContent {
  className: 'TdUploadContent';
  override props: UploadContentProps;
  abort?: (file?: UploadFile) => void;
  upload?: (rawFile: UploadRawFile) => Promise<void>;
  constructor(params: UploadContentProps = {}) {
    super();
    this.className = 'TdUploadContent';

    this.assignProps(uploadContentProps);
    this.props = this.useParams(params);
  }

  override setup() {
    console.log('TdUploadContent setup');
    const props = this.props;
    const emit = this.emit;
    const ns = useNamespace('upload')
    const disabled = useFormDisabled()

    const requests = signal<Record<string, XMLHttpRequest | Promise<unknown>>>(
      {}
    )
    const inputRef = signal<HTMLInputElement>()

    const uploadFiles = (files: File[]) => {
      console.log('uploadFiles, files is ', files);
      if (files.length === 0) return

      const { autoUpload, limit, fileList, multiple, onStart, onExceed } = props;
      console.warn('uploadFiles, limit is ', limit)
      if (limit && unref(fileList)!.length + files.length > limit) {
        onExceed?.(files, unref(fileList)!)
        return
      }

      if (!multiple) {
        files = files.slice(0, 1)
      }

      for (const file of files) {
        const rawFile = file as UploadRawFile
        rawFile.uid = genFileId()
        onStart?.(rawFile)
        if (autoUpload) upload(rawFile)
      }
    }

    const upload = async (rawFile: UploadRawFile): Promise<void> => {
      console.warn('upload, rawFile is ', rawFile);
      inputRef.get()!.value = ''

      if (!props.beforeUpload) {
        return doUpload(rawFile)
      }

      let hookResult: Exclude<ReturnType<UploadHooks['beforeUpload']>, Promise<any>>
      let beforeData: UploadContentProps['data'] = {}

      try {
        // origin data: Handle data changes after synchronization tasks are executed
        const originData = props.data
        const beforeUploadPromise = props.beforeUpload(rawFile)
        beforeData = isPlainObject(props.data) ? cloneDeep(props.data) : props.data
        hookResult = await beforeUploadPromise
        if (isPlainObject(props.data) && isEqual(originData, beforeData)) {
          beforeData = cloneDeep(props.data)
        }
      } catch {
        hookResult = false
      }

      if (hookResult === false) {
        props.onRemove?.(rawFile)
        return
      }

      let file: File = rawFile
      if (hookResult instanceof Blob) {
        if (hookResult instanceof File) {
          file = hookResult
        } else {
          file = new File([hookResult], rawFile.name, {
            type: rawFile.type,
          })
        }
      }

      doUpload(
        Object.assign(file, {
          uid: rawFile.uid,
        }),
        beforeData
      )
    }

    const resolveData = async (
      data: UploadContentProps['data'],
      rawFile: UploadRawFile
    ): Promise<Record<string, any>> => {
      if (isFunction(data)) {
        return data(rawFile)
      }

      return data as Promise<Record<string, any>>
    }

    const doUpload = async (
      rawFile: UploadRawFile,
      beforeData?: UploadContentProps['data']
    ) => {
      console.warn('doUpload, rawFile is ', rawFile);
      const {
        headers,
        data,
        method,
        withCredentials,
        name: filename,
        action,
        onProgress,
        onSuccess,
        onError,
        httpRequest,
      } = props

      try {
        beforeData = await resolveData(beforeData ?? data, rawFile)
      } catch {
        props.onRemove?.(rawFile)
        return
      }

      const { uid } = rawFile
      const options: UploadRequestOptions = {
        headers: headers || {},
        withCredentials,
        file: rawFile,
        data: beforeData,
        method,
        filename,
        action,
        onProgress: (evt) => {
          onProgress?.(evt, rawFile)
        },
        onSuccess: (res) => {
          onSuccess?.(res, rawFile)
          delete requests.get()[uid]
        },
        onError: (err) => {
          onError?.(err, rawFile)
          delete requests.get()[uid]
        },
      }
      const request = httpRequest?.(options);
      (requests.get() as any)[uid] = request
      if (request instanceof Promise) {
        request.then(options.onSuccess, options.onError)
      }
    }

    const handleChange = (e?: Event) => {
      const files = (e?.target as HTMLInputElement).files
      if (!files) return
      uploadFiles(Array.from(files))
    }

    const handleClick = () => {
      if (!disabled.get()) {
        inputRef.get()!.value = ''
        inputRef.get()!.click()
      }
    }

    const handleKeydown = () => {
      handleClick()
    }

    const abort = (file?: UploadFile) => {
      const _reqs = entriesOf(requests.get()).filter(
        file ? ([uid]) => String(file.uid) === uid : () => true
      )
      _reqs.forEach(([uid, req]) => {
        if (req instanceof XMLHttpRequest) req.abort()
        delete requests.get()[uid]
      })
    }

    defineExpose({
      abort,
      upload,
    })

    this.attr.addClass([
      ns.b(),
      ns.m(props.listType),
      ns.is('drag', props.drag),
      ns.is('disabled', disabled.get()),
    ]);
    this.attr.addObj({
      tabindex: disabled.get() ? '-1' : '0',
    });
    this.addEvents({
      click: handleClick,
      keydown: (evt) => {
        if (evt?.target === this.dom) { // 确保事件是从该元素本身触发的
          // 处理 Enter 或 Space 键按下的逻辑
          console.log('Enter 或 Space 键被按下');
          if (evt?.key === 'Enter' || evt?.key === ' ') {
            evt?.preventDefault();
            handleKeydown();
          }
        }
      },
    });
    console.warn('TdUploadContent drag is ', props.drag)
    if (props.drag) {
      this.addChild(new TdUploadDrag({
        disabled: disabled.get(),
        emits: {
          file: uploadFiles
        },
        slot: props.slot ?? props.slots?.default,
      }))
    } else {
      this.addChild(new Fragment({
        slot: props.slot ?? props.slots?.default,
      }))
    }
    this.addChild(new Input({
      refDom: inputRef,
      class: ns.e('input'),
      attrObj: {
        name: props.name,
        multiple: props.multiple,
        accept: props.accept,
        disabled: disabled,
        type: 'file',
      },
      events: {
        change: handleChange,
        click: evt => evt?.stopPropagation()
      },
    }))
    console.warn('this is uploadContent ', this);
  }
}
