import { ITypeDiv, TypeDivProps, TypeSvgSvg } from '@type-dom/framework';
// import {
//   CHANGE_EVENT,
//   INPUT_EVENT,
//   UPDATE_MODEL_EVENT,
// } from '../../../constants/event';
import { MaybeRef, Signal } from '@type-dom/signals';

export interface ITdSwitch extends ITypeDiv {
  className: 'TdSwitch';
}

export interface SwitchProps extends TypeDivProps {
  /**
   * @description binding value, it should be equivalent to either `active-value` or `inactive-value`, by default it's `boolean` type
   * default: false
   */
  modelValue?: boolean | number | string;
  vModel?: Signal<boolean | number | string>;
  /**
   * @description whether Switch is disabled
   * default false
   */
  disabled?: boolean;
  /**
   * @description whether Switch is in loading state
   * default false
   */
  loading?: MaybeRef<boolean>;
  /**
   * @description size of Switch
   */
  size?: 'large' | 'default' | 'small';
  /**
   * @description width of Switch
   */
  width?: number | string;
  /**
   * @description whether icon or text is displayed inside dot, only the first character will be rendered for text
   * default false
   */
  inlinePrompt?: boolean;
  /**
   * @description component of the icon displayed in action when in `off` state
   */
  inactiveActionIcon?: TypeSvgSvg;
  /**
   * @description component of the icon displayed in action when in `on` state
   */
  activeActionIcon?: TypeSvgSvg;

  /**
   * @description component of the icon displayed when in `on` state, overrides `active-text`
   */
  activeIcon?: TypeSvgSvg;
  /**
   * @description component of the icon displayed when in `off` state, overrides `inactive-text`
   */
  inactiveIcon?: TypeSvgSvg;
  /**
   * @description text displayed when in `on` state
   */
  activeText?: string;
  /**
   * @description text displayed when in `off` state
   */
  inactiveText?: string;
  /**
   * @description switch value when in `on` state
   * default true
   */
  activeValue?: boolean | string | number;
  /**
   * @description switch value when in `off` state
   */
  inactiveValue?: boolean | string | number;
  /**
   * @description input name of Switch
   */
  name?: string;
  /**
   * @description whether to trigger form validation
   *     default: true
   */
  validateEvent?: boolean;
  /**
   * @description before-change hook before the switch state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop switching
   */
  beforeChange?: () => Promise<boolean> | boolean;
  //   type: definePropType<() => Promise<boolean> | boolean>(Function),
  // },
  /**
   * @description id for input
   */
  id?: string;
  /**
   * @description tabindex for input
   */
  tabindex?: string | number;
  /**
   * @description native input aria-label
   */
  label?: string;

  // add by me
  // emits?: {
  //   [UPDATE_MODEL_EVENT]?: (val?: boolean | string | number) => void;
  //   // isBoolean(val) || isString(val) || isNumber(val),
  //   [CHANGE_EVENT]?: (val?: boolean | string | number) => void;
  //   // isBoolean(val) || isString(val) || isNumber(val),
  //   [INPUT_EVENT]?: (val?: boolean | string | number) => void;
  //   // isBoolean(val) || isString(val) || isNumber(val),
  // },
  switchOnColor?: string;
  switchOffColor?: string;
  activeActionText?: string;
  inactiveActionText?: string;
  // beforeChange?: () => Promise<unknown>;
}

export interface SwitchContext {
  checked: MaybeRef<boolean>;
}
