import { ITypeFragment, TypeFragmentProps } from '@type-dom/framework';

export interface ITdScrollbarThumb extends ITypeFragment {
  className: 'TdScrollbarThumb';
}

export interface ITdScrollbarThumbConfig extends TypeFragmentProps {
  vertical?: boolean;
  size?: string;
  move?: number;
  ratio?: number; // required: true,
  always?: boolean;
}
