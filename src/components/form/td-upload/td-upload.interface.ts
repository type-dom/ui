import { Awaitable, Mutable } from '@type-dom/utils';
import { UploadAjaxError } from './ajax';
import { ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { MaybeRef, Signal } from '@type-dom/signals';

export interface ITdUpload extends ITypeDiv {
  className: 'TdUpload';
}
export interface UploadBaseProps extends TypeDivProps {
  /**
   * @description request URL
   */
  action?: string,
    // default: '#',
  /**
   * @description request headers
   */
  headers?: Headers | Record<string, any>
  /**
   * @description set upload request method
   */
  method?: string,
    // default: 'post',
  /**
   * @description additions options of request
   */
  data?: | Awaitable<UploadData>
      | ((rawFile: UploadRawFile) => Awaitable<UploadData>),
    // default: () => mutable({} as const),
  /**
   * @description whether uploading multiple files is permitted
   */
  multiple?: boolean,
  /**
   * @description key name for uploaded file
   */
  name?: string,
    // default: 'file',
  /**
   * @description whether to activate drag and drop mode
   */
  drag?: boolean,
  /**
   * @description whether cookies are sent
   */
  withCredentials?: boolean,
  /**
   * @description whether to show the uploaded file list
   */
  showFileList?: boolean,
    // default: true,
  /**
   * @description accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept), will not work when `thumbnail-mode === true`
   */
  accept?: string,
    // default: '',
  /**
   * @description default uploaded files
   */
  fileList?: MaybeRef<UploadFiles>,
    // default: () => mutable([] as const),
  /**
   * @description whether to auto upload file
   */
  autoUpload?: boolean,
    // default: true,
  /**
   * @description type of file list
   */
  listType?: string,
    // values: uploadListTypes,
    // default: 'text',
  /**
   * @description override default xhr behavior, allowing you to implement your own upload-file's request
   */
  httpRequest?: UploadRequestHandler;
    // default: ajaxUpload,
  /**
   * @description whether to disable upload
   */
  disabled?: boolean,
  /**
   * @description maximum number of uploads allowed
   */
  limit?: number,
}

export interface UploadProps extends UploadBaseProps {
  // ...uploadBaseProps,
  /**
   * @description hook function before uploading with the file to be uploaded as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, uploading will be aborted
   */
  beforeUpload?: UploadHooks['beforeUpload'];
    // default: NOOP,
  /**
   * @description hook function before removing a file with the file and file list as its parameters. If `false` is returned or a `Promise` is returned and then is rejected, removing will be aborted
   */
  beforeRemove?: UploadHooks['beforeRemove'];
  /**
   * @description hook function when files are removed
   */
  onRemove?: UploadHooks['onRemove']
    // default: NOOP,
  /**
   * @description hook function when select file or upload file success or upload file fail
   */
  onChange?: UploadHooks['onChange'];
    // default: NOOP,
  /**
   * @description hook function when clicking the uploaded files
   */
  onPreview?: UploadHooks['onPreview'];
    // default: NOOP,
  /**
   * @description hook function when uploaded successfully
   */
  onSuccess?: UploadHooks['onSuccess'];
    // default: NOOP,
  /**
   * @description hook function when some progress occurs
   */
  onProgress?: UploadHooks['onProgress'];
    // default: NOOP,
  /**
   * @description hook function when some errors occurs
   */
  onError?: UploadHooks['onError'],
    // default: NOOP,
  /**
   * @description hook function when limit is exceeded
   */
  onExceed?: UploadHooks['onExceed'];
    // default: NOOP,
  /**
   * @description set HTML attribute: crossorigin.
   */
  crossorigin?: 'anonymous' | 'use-credentials' | '';
}


export type UploadStatus = 'ready' | 'uploading' | 'success' | 'fail'
export interface UploadProgressEvent extends ProgressEvent {
  percent: number
}

export interface UploadRequestOptions {
  action?: string
  method?: string
  data?: Record<string, string | Blob | [Blob, string]>
  filename?: string
  file?: UploadRawFile
  headers?: Headers | Record<string, string | number | null | undefined>
  onError?: (evt: UploadAjaxError) => void
  onProgress?: (evt: UploadProgressEvent) => void
  onSuccess?: (response: any) => void
  withCredentials?: boolean
}
export interface UploadFile {
  name?: string
  percentage?: number
  status?: UploadStatus
  size?: number
  response?: unknown
  uid?: number
  url?: string
  raw?: UploadRawFile
}
export type UploadUserFile = Omit<UploadFile, 'status' | 'uid'> &
  Partial<Pick<UploadFile, 'status' | 'uid'>>

export type UploadFiles = UploadFile[]
export interface UploadRawFile extends File {
  uid: number
}
export type UploadRequestHandler = (
  options: UploadRequestOptions
) => XMLHttpRequest | Promise<unknown>
export interface UploadHooks {
  beforeUpload: (
    rawFile: UploadRawFile
  ) => Awaitable<void | undefined | null | boolean | File | Blob>
  beforeRemove: (
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => Awaitable<boolean>
  onRemove: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onChange: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
  onPreview: (uploadFile: UploadFile) => void
  onSuccess: (
    response: any,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onProgress: (
    evt: UploadProgressEvent,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onError: (
    error: Error,
    uploadFile: UploadFile,
    uploadFiles: UploadFiles
  ) => void
  onExceed: (files: File[], uploadFiles: UploadUserFile[]) => void
}

export type UploadData = Mutable<Record<string, any>>
