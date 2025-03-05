import { defineExpose, Fragment, onBeforeUnmount, provide, TypeDiv } from '@type-dom/framework';
import { computed, signal, toRaw, toRef } from '@type-dom/signals';
import { isFunction } from '@type-dom/utils';
import { useFormDisabled } from '../td-form/hooks/use-form-common-props';
import { UploadContentProps } from './upload-content/upload-content.interface';
import { TdUploadContent } from './upload-content/upload-content.class';
import { TdUploadList } from './upload-list/upload-list.class';
import { useHandlers } from './use-handlers';
import { uploadContextKey } from './constants';
import { uploadProps } from './td-upload.const';
import { ITdUpload, UploadFile, UploadProps, UploadStatus } from './td-upload.interface';
import './style/index';

export class TdUpload extends TypeDiv implements ITdUpload {
  className: 'TdUpload';
  override props: UploadProps;
  abort?: (file: UploadFile) => void;
  submit?: () => void;
  clearFiles?: (states?: UploadStatus[]) => void;
  handleStart?: UploadContentProps['onStart'];
  handleRemove?: UploadContentProps['onRemove'];

  constructor(params: UploadProps = {}) {
    super();
    this.className = 'TdUpload';

    this.assignProps(uploadProps);
    this.props = this.useParams(params)
  }

  override setup(): void {
    const props = this.props;
    const disabled = useFormDisabled()
    const uploadRef = signal<TdUploadContent>()
    const {
      abort,
      submit,
      clearFiles,
      revokeFileObjectURL,
      uploadFiles,
      handleStart,
      handleError,
      handleRemove,
      handleSuccess,
      handleProgress,
    } = useHandlers(props, uploadRef)
    const isPictureCard = computed(() => props.listType === 'picture-card')
    const uploadContentProps = computed<UploadContentProps>(() => ({
      ...props,
      fileList: uploadFiles,
      onStart: handleStart,
      onProgress: handleProgress,
      onSuccess: handleSuccess,
      onError: handleError,
      onRemove: handleRemove,
    }))
    console.log('uploadContentProps.get() is ', uploadContentProps.get());
    onBeforeUnmount(() => {
      console.warn('uploadFiles is ', uploadFiles);
      toRaw(uploadFiles).forEach(revokeFileObjectURL)
    })

    provide(uploadContextKey, {
      accept: toRef(props, 'accept'),
    })

    defineExpose({
      /** @description cancel upload request */
      abort,
      /** @description upload the file list manually */
      submit,
      /** @description clear the file list  */
      clearFiles,
      /** @description select the file manually */
      handleStart,
      /** @description remove the file manually */
      handleRemove,
    })

    if (isPictureCard.get() && props.showFileList) {
      this.addChild(
        new TdUploadList({
          disabled: disabled.get(),
          listType: props.listType,
          files: uploadFiles,
          crossorigin: props.crossorigin,
          handlePreview: props.onPreview,
          emits: {
            remove: handleRemove,
          },
          slots: {
            default: (file: UploadFile, index: number) => {
              return  isFunction(props.slots?.file) ? props.slots?.file(file, index) : undefined
            },
            append: new TdUploadContent({
              ...uploadContentProps.get(), // uploadContentProps 中有 refEl: upload
              refEl: uploadRef,
              slot: props.slots?.trigger
                ? props.slots?.trigger
                : props.slot ?? props.slots?.default,
            }),
          }
        }),
      )
    }
    if (!isPictureCard.get() || (isPictureCard.get() && !props.showFileList)) {
      console.error('!isPictureCard.get() || (isPictureCard.get() && !props.showFileList)')
      this.addChild(
        new TdUploadContent({
          // v-bind="uploadContentProps"
          ...uploadContentProps.get(), // uploadContentProps 中有 refEl: upload
          refEl: uploadRef,
          slot: props.slots?.trigger ?? props.slot ?? props.slots?.default
        }),
      )
    }
    if (props.slots?.trigger) {
      this.addChild(
        new Fragment({
          slot: props.slot ?? props.slots?.default, // props.slot 如果上面props.slot已经被使用了，这里如果vIf会被remove掉
        })
      )
    }
    this.addChildren(
      new Fragment({
        slot: props.slots?.tip,
      }),
    )
    if (!isPictureCard.get() && props.showFileList) {
      console.error('!isPictureCard.get() && props.showFileList')
      this.addChild(
        new TdUploadList({
          disabled: disabled.get(),
          listType: props.listType,
          files: uploadFiles,
          crossorigin: props.crossorigin,
          handlePreview: props.onPreview,
          emits: {
            remove: handleRemove,
          },
          slots: {
            default: (file: UploadFile, index: number) => {
              return isFunction(props.slots?.file) ? props.slots?.file(file, index) : undefined
            },
          },
          // slot: props.slots?.file
          //   ? (file, index) => isFunction(props.slots?.file)
          //     ? props.slots?.file(file, index)
          //     : undefined
          //   : undefined,
        })
      )
    }
  }
}
