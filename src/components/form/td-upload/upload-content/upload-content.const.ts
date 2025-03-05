import { NOOP } from '@type-dom/utils';
import { uploadBaseProps } from '../td-upload.const';
import { UploadContentProps } from './upload-content.interface';

export const uploadContentProps: UploadContentProps = {
  ...uploadBaseProps,
  beforeUpload: NOOP,
  onRemove: NOOP,
  onStart: NOOP,
  onSuccess: NOOP,
  onProgress: NOOP,
  onError: NOOP,
  onExceed: NOOP,
}
