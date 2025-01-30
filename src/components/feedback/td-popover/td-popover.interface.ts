import {
  ITypeFragment,
  TypeFragmentProps,
  TypeElement,
  TypeHtml,
} from '@type-dom/framework';
import { TooltipTriggerType } from '../td-tooltip/trigger/trigger.interface';
import { Placement } from '@type-dom/popper';
import { IStyle } from '@type-dom/css-type';
import { Ref } from '@type-dom/signals';
import { Measurable } from '../td-popper/td-popper.interface';
import { TooltipContentProps } from '../td-tooltip/content/content.interface';

export interface ITdPopover extends ITypeFragment {
  className: 'TdPopover';
}

export interface PopoverProps extends TypeFragmentProps {
  /**
   * @description how the popover is triggered
   */
  // trigger: useTooltipTriggerProps.trigger,
  trigger?: TooltipTriggerType | TooltipTriggerType[]; // hover
  /**
   * @description popover placement
   * bottom
   */
  placement?: Placement;
  /**
   * @description whether Popover is disabled
   */
  disabled?: boolean;
  /**
   * @description whether popover is visible
   */
  visible?: TooltipContentProps['visible']; // null
  /**
   * @description popover transition animation
   */
  transition?: string;
  /**
   * @description parameters for [popper.js](https://popper.js.org/docs/v2/)
   */
  popperOptions?: any; // dropdownProps.popperOptions,
  /**
   * @description [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of Popover
   */
  tabindex?: string | number; // 9
  /**
   * @description popover content, can be replaced with a default `slot`
   */
  content?: string;
  /**
   * @description custom style for popover
   */
  popperStyle?: IStyle;
  /**
   * @description custom class name for popover
   */
  popperClass?: TooltipContentProps['popperClass']; // useTooltipContentProps.popperClass,
  /**
   *  ...useTooltipContentProps.enterable,
   default: true,
   */
  enterable?: TooltipContentProps['enterable']; // true
  /**
   * @description Tooltip theme, built-in theme: `dark` / `light`
   *     default: 'light',
   */
  effect?: 'dark' | 'light';
  /**
   * @description whether popover dropdown is teleported to the body
   * true
   */
  teleported?: boolean;
  /**
   * @description popover title
   */
  title?: string;
  /**
   * @description popover width
   default: 150,
   */
  width?: string | number;
  /**
   * @description popover offset
   default: undefined,
   */
  offset?: number;
  /**
   * @description delay of appearance, in millisecond
   default: 0,
   */
  showAfter?: number;
  /**
   * @description delay of disappear, in millisecond
   default: 200,
   */
  hideAfter?: number;
  /**
   * @description timeout in milliseconds to hide tooltip
   default: 0,
   */
  autoClose?: number;
  /**
   * @description whether a tooltip arrow is displayed or not. For more info, please refer to [ElPopper](https://github.com/element-plus/element-plus/tree/dev/packages/components/popper)
   default: true,
   */
  showArrow?: boolean;
  /**
   * @description when popover inactive and `persistent` is `false` , popover will be destroyed
   default: true,
   */
  persistent?: boolean;
  'onUpdate:visible'?: (visible: boolean) => void;
  //   type: Function as PropType<(visible: boolean) => void>,
  // },
  //
  // slots?: {
  //   reference?: TypeElement;
  //   default?: TypeElement;
  // }
  // slot?: TypeElement;
}
