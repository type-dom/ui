import { ITypeHeader, TypeHeaderProps } from '@type-dom/framework';

export interface ITdHeader extends ITypeHeader {
  className: 'TdHeader';
}

export interface TdHeaderProps extends TypeHeaderProps {
  height?: string | number; // default 60px
  backgroundColor?: string; // default #fff
}
