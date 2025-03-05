import { ITypeFragment, TypeFragmentProps } from '@type-dom/framework';
import { Ref } from '@type-dom/signals';

export interface IThumb extends ITypeFragment {
  className: 'Thumb';
}

export interface ThumbProps extends TypeFragmentProps {
  vertical?: boolean;
  size?: Ref<string>;
  move?: Ref<number>;
  ratio?: Ref<number>; // required: true,
  always?: boolean;
}
