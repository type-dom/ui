import { NOOP } from '@type-dom/utils';
import { UploadFile } from '../td-upload.interface';
import { UploadListEmits, UploadListProps } from './upload-list.interface';

export const uploadListProps: UploadListProps = {
  files: [],
  disabled: false,
  handlePreview: NOOP,
  listType: 'text',
}

export const uploadListEmits: UploadListEmits = {
  remove: (file: UploadFile) => !!file,
}
