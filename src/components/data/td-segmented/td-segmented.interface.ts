import {
  ITypeFragment,
  TypeElement,
  TypeFragmentProps,
} from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';
import { ComponentSize } from '../../../constants/size';

export interface ITdSegmented extends ITypeFragment {
  className: 'TdSegmented';
}

export type OptionObject = {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
  slot?: TypeElement;
  [key: string]: any;
};
export type Option = OptionObject | string | number | boolean | undefined;

export interface SegmentedProps extends TypeFragmentProps {
  // default: 'horizontal',
  direction?: MaybeRef<'vertical' | 'horizontal'>;
  /**
   * @description options of segmented
   *     default: () => [],
   */
  options?: Option[];
  /**
   * @description binding value
   *     default: undefined,
   */
  modelValue?: string | number | boolean; // todo Ref
  /**
   * @description fit width of parent content
   */
  block?: boolean;
  /**
   * @description size of component
   */
  size?: MaybeRef<ComponentSize>;
  /**
   * @description whether segmented is disabled
   */
  disabled?: boolean;
  /**
   * @description whether to trigger form validation
   *     default: true,
   */
  validateEvent?: boolean;
  /**
   * @description native input id
   */
  id?: string;
  /**
   * @description native `name` attribute
   */
  name?: string;
}
