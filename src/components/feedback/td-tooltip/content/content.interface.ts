import { ITypeFragment, TypeFragmentProps } from '@type-dom/framework';
import { MaybeRef, Ref } from '@type-dom/signals';
import { UseDelayedToggleProps } from '../../../../hooks/use-delayed-toggle';
import { PopperContentProps } from '../../td-popper/content/content.interface';

export interface ITdTooltipContent extends ITypeFragment {
  className: 'TdTooltipContent';
  props: TooltipContentProps & TypeFragmentProps;
}

export interface TooltipContentProps
  extends PopperContentProps,
    UseDelayedToggleProps {
  // ...useDelayedToggleProps,
  /**
   * @description delay of appearance, in millisecond
   *     default: 0,
   */
  showAfter?: number;
  /**
   * @description delay of disappear, in millisecond
   *     default: 200,
   */
  hideAfter?: number;
  /**
   * @description disappear automatically, in millisecond
   *     default: 0,
   */
  autoClose?: number;

  /**
   * @description which element the tooltip CONTENT appends to
   */
  appendTo?: string | HTMLElement;
  /**
   * @description display content, can be overridden by `slot#content`
   */
  content?: MaybeRef<string>; // default: '',
  /**
   * @description whether `content` is treated as HTML string
   */
  rawContent?: boolean; // default: false,
  /**
   * @description when tooltip inactive and `persistent` is `false` , popconfirm will be destroyed
   */
  persistent?: boolean;
  /**
   * @description same as `aria-label`
   */
  ariaLabel?: MaybeRef<string>;
  // because model toggle prop is generated dynamically
  // so the typing cannot be evaluated by typescript as type:
  // [name]: { type?: boolean, default: null }
  // so we need to declare that again for type checking.
  /**
   * @description visibility of Tooltip
   *  // default: null,
   */
  visible?: MaybeRef<boolean> | null;
  /**
   * @description animation name
   */
  transition?: string;
  /**
   * @description whether tooltip content is teleported, if `true` it will be teleported to where `append-to` sets
   */
  teleported?: boolean; // default: true,
  /**
   * @description whether Tooltip is disabled
   */
  disabled?: MaybeRef<boolean>;
}
