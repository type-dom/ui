import { ITypeDiv, TypeDivProps } from '@type-dom/framework';

export interface ITdUploadDrag extends ITypeDiv {
  className: 'TdUploadDrag';
}

export interface UploadDragProps extends TypeDivProps {
  disabled?: boolean,
    // default: false,
}

