import { NOOP } from '@type-dom/utils';
import { Ref, signal } from '@type-dom/signals';
import { UploadBaseProps, UploadProps } from './td-upload.interface';
import { ajaxUpload } from './ajax';

export const uploadListTypes = ['text', 'picture', 'picture-card'] as const

let fileId = 1
export const genFileId = () => Date.now() + fileId++

export const uploadBaseProps: UploadBaseProps = {
  action: '#',
  method: 'post',
  name: 'file',
  showFileList: true,
  accept: '',
  fileList: signal([]),
  autoUpload: true,
  listType: 'text',
  httpRequest: ajaxUpload
}

export const uploadProps: UploadProps = {
  ...uploadBaseProps,
  beforeUpload: NOOP,
  onRemove: NOOP,
  onChange: NOOP,
  onPreview: NOOP,
  onSuccess: NOOP,
  onProgress: NOOP,
  onError: NOOP,
  onExceed: NOOP,
}
