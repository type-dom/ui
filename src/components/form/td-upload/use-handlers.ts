// import { watch } from 'vue'
// import { isNil } from 'lodash-unified'
// import { useVModel } from '@vueuse/core'
// import { debugWarn, throwError } from '@element-plus/utils'
// import { genFileId } from './upload'
// import type { ShallowRef } from 'vue'
// import type {
//   UploadContentInstance,
//   UploadContentProps,
// } from './upload-content'
// import type {
//   UploadFile,
//   UploadFiles,
//   UploadProps,
//   UploadRawFile,
//   UploadStatus,
// } from './upload'

import { debugWarn, isNil, throwError } from '@type-dom/utils';
import { Ref, Signal, toRaw, unref, watch } from '@type-dom/signals';
import {
  UploadFile,
  UploadFiles,
  UploadProps,
  UploadRawFile,
  UploadStatus,
} from './td-upload.interface';
import { genFileId } from './td-upload.const';
import { TdUploadContent } from './upload-content/upload-content.class';
import { UploadContentProps } from './upload-content/upload-content.interface';
import { useVModel } from '@type-dom/framework';

const SCOPE = 'TdUpload'

const revokeFileObjectURL = (file: UploadFile) => {
  if (file.url?.startsWith('blob:')) {
    URL.revokeObjectURL(file.url)
  }
}

export const useHandlers = (
  props: UploadProps,
  uploadRef: Signal<TdUploadContent | undefined>
) => {
  const uploadFiles = useVModel(
    props as Omit<UploadProps, 'fileList'> & { fileList: UploadFiles },
    'fileList',
    undefined,
    { passive: true }
  )

  const getFile = (rawFile: UploadRawFile) =>
    uploadFiles?.get().find((file) => file.uid === rawFile.uid)

  function abort(file: UploadFile) {
    uploadRef.get()?.abort?.(file)
  }

  function clearFiles(
    /** @default ['ready', 'uploading', 'success', 'fail'] */
    states: UploadStatus[] = ['ready', 'uploading', 'success', 'fail']
  ) {
    uploadFiles.set(uploadFiles.get().filter(
      (row) => !states.includes(row.status!))
    )
  }

  function removeFile(file: UploadFile) {
    console.warn('removeFile file is ', file);
    uploadFiles.set(uploadFiles.get().filter(
      (uploadFile) => uploadFile.uid !== file.uid
    ))
  }

  const handleError: UploadContentProps['onError'] = (err, rawFile) => {
    const file = getFile(rawFile)
    if (!file) return

    // console.error(err)
    file.status = 'fail'
    removeFile(file)
    props.onError?.(err, file, uploadFiles.get())
    props.onChange?.(file, uploadFiles.get())
  }

  const handleProgress: UploadContentProps['onProgress'] = (evt, rawFile) => {
    const file = getFile(rawFile)
    if (!file) return

    props.onProgress?.(evt, file, uploadFiles.get())
    file.status = 'uploading'
    file.percentage = Math.round(evt.percent)
  }

  const handleSuccess: UploadContentProps['onSuccess'] = (
    response,
    rawFile
  ) => {
    console.log('handleSuccess', response, rawFile);
    const file = getFile(rawFile)
    if (!file) return

    file.status = 'success'
    file.response = response
    props.onSuccess?.(response, file, uploadFiles.get())
    props.onChange?.(file, uploadFiles.get())
  }

  const handleStart: UploadContentProps['onStart'] = (file) => {
    if (isNil(file.uid)) file.uid = genFileId()
    const uploadFile: UploadFile = {
      name: file.name,
      percentage: 0,
      status: 'ready',
      size: file.size,
      raw: file,
      uid: file.uid,
    }
    if (props.listType === 'picture-card' || props.listType === 'picture') {
      try {
        uploadFile.url = URL.createObjectURL(file)
      } catch (err: unknown) {
        debugWarn(SCOPE, (err as Error).message)
        props.onError?.(err as Error, uploadFile, uploadFiles.get())
      }
    }
    uploadFiles.set(uploadFiles.get()
      ? [...uploadFiles.get(), uploadFile]
      : [uploadFile]
    )
    props.onChange?.(uploadFile, uploadFiles.get())
  }

  const handleRemove: UploadContentProps['onRemove'] = async (
    file
  ): Promise<void> => {
    console.error('handleRemove');
    const uploadFile = file instanceof File ? getFile(file) : file
    if (!uploadFile) throwError(SCOPE, 'file to be removed not found')

    const doRemove = (file: UploadFile) => {
      console.warn('doRemove . file is ', file);
      abort(file)
      removeFile(file)
      props.onRemove?.(file, uploadFiles.get())
      revokeFileObjectURL(file)
    }

    if (props.beforeRemove) {
      const before = await props.beforeRemove(uploadFile, uploadFiles.get())
      if (before !== false) doRemove(uploadFile)
    } else {
      doRemove(uploadFile)
    }
  }

  function submit() {
    console.warn('submit');
    uploadFiles.get()
      .filter(({ status }) => status === 'ready')
      .forEach(({ raw }) => raw && uploadRef.get()?.upload?.(raw))
  }

  watch(
    () => props.listType,
    (val) => {
      if (val !== 'picture-card' && val !== 'picture') {
        return
      }

      uploadFiles.set(
        toRaw(uploadFiles)?.map((file) => {
          const { raw, url } = file
          if (!url && raw) {
            try {
              file.url = URL.createObjectURL(raw)
            } catch (err: unknown) {
              props.onError?.(err as Error, file, uploadFiles.get())
            }
          }
          return file
        })
      )
    }
  )

  watch(
    uploadFiles,
    (files) => {
      if (!files) return;
      for (const file of unref(files)) {
        file.uid ||= genFileId()
        file.status ||= 'success'
      }
    },
    // { immediate: true, deep: true }
  )

  return {
    /** @description two-way binding ref from props `fileList` */
    uploadFiles,
    abort,
    clearFiles,
    handleError,
    handleProgress,
    handleStart,
    handleSuccess,
    handleRemove,
    submit,
    revokeFileObjectURL,
  }
}
