import { UploadBaseProps, UploadFile, UploadHooks, UploadProgressEvent, UploadRawFile } from '../td-upload.interface';
import { UploadAjaxError } from '../ajax';
import { ITypeDiv } from '@type-dom/framework';

export interface ITdUploadContent extends ITypeDiv {
  className: 'TdUploadContent',
}

export interface UploadContentProps extends UploadBaseProps {
  beforeUpload?: UploadHooks['beforeUpload'];
    // default: NOOP,
  onRemove?: (file: UploadFile | UploadRawFile, rawFile?: UploadRawFile) => void;
    // default: NOOP,
  onStart?: (rawFile: UploadRawFile) => void,
    // default: NOOP,
  onSuccess?: (response: any, rawFile: UploadRawFile) => unknown,
    // default: NOOP,
  onProgress?: (evt: UploadProgressEvent, rawFile: UploadRawFile) => void,
    // default: NOOP,
  onError?: (err: UploadAjaxError, rawFile: UploadRawFile) => void,
    // default: NOOP,
  onExceed?: UploadHooks['onExceed'],
    // default: NOOP,
}
