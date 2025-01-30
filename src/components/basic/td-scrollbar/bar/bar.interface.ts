import {
  TypeProps,
  ITypeFragment,
  TypeFragmentProps,
} from '@type-dom/framework';

export interface ITdScrollbarBar extends ITypeFragment {
  className: 'TdScrollbarBar';
}

export interface ITdScrollbarBarConfig extends TypeFragmentProps {
  always?: boolean; // default: true,
  minSize?: number; // required: true,
}
