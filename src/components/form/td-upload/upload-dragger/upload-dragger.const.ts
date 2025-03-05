import { UploadDragProps } from './upload-dragger.interface';
import { isArray } from '@type-dom/utils';

export const uploadDragProps: UploadDragProps = {
  disabled: false,
}

export const uploadDragEmits = {
  file: (file: File[]) => isArray(file),
}
