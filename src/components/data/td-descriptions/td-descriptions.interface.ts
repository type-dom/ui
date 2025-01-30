import {
  TypeProps,
  ITypeDiv,
  TypeDivProps,
  TypeElement,
} from '@type-dom/framework';
import { ComponentSize } from '../../../constants/size';
import { TdDescriptionsItem } from '../td-descriptions-item/td-descriptions-item.class';
import { MaybeRef, Signal } from '@type-dom/signals';

export interface ITdDescriptions extends ITypeDiv {
  className: 'TdDescriptions';
  props: DescriptionsProps;
}

export interface DescriptionsProps extends TypeDivProps {
  /**
   * @description with or without border
   *     default: false,
   */
  border?: boolean;
  /**
   * @description numbers of `Descriptions Item` in one line
   *     default: 3,
   */
  column?: number;
  /**
   * @description direction of list
   *     default: 'horizontal',
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @description size of list
   */
  size?: MaybeRef<ComponentSize>; // ISize | Signal<ISize>;
  /**
   * @description title text, display on the top left
   *     default: '',
   */
  title?: string;
  /**
   * @description extra text, display on the top right
   *     default: '',
   */
  extra?: string;
  /**
   * @description width of every label column
   *     default: '',
   */
  labelWidth?: string | number;

  slot?: TdDescriptionsItem[];
  slots?: {
    title?: TypeElement;
    extra?: TypeElement;
  };
}

export interface IDescriptionsInject extends TypeProps {
  border?: boolean;
  column?: number;
  direction?: 'horizontal' | 'vertical';
  size?: ComponentSize;
  title?: string;
  extra?: string;
  labelWidth?: string | number;
}

export interface IDescriptionsItemInject {
  label: string;
  span: number;
  rowspan: number;
  width: string | number;
  minWidth: string | number;
  labelWidth: string | number;
  align: string;
  labelAlign: string;
  className: string;
  labelClassName: string;
}
