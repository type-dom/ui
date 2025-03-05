import { IEmits, ITypeFragment, TypeFragmentProps } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';
import { UploadFile, UploadFiles, UploadHooks } from '../td-upload.interface';

export interface ITdUploadList extends ITypeFragment {
  className: 'TdUploadList';
}

export interface UploadListProps extends TypeFragmentProps {
  files?: MaybeRef<UploadFiles>;
  disabled?: boolean; // false,
  handlePreview?: UploadHooks['onPreview']; // NOOP,
  listType?: string; //  'text',
  /**
   * @description set HTML attribute: crossorigin.
   */
  crossorigin?: 'anonymous' | 'use-credentials' | '';
}

export interface UploadListEmits extends IEmits {
  remove: (file: UploadFile) => boolean
}
