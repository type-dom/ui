import {
  ITypeFragment,
  TypeFragmentProps,
} from '@type-dom/framework';

export interface IBar extends ITypeFragment {
  className: 'Bar';
}

export interface BarProps extends TypeFragmentProps {
  always?: boolean; // default: true,
  minSize?: number; // required: true,
}
