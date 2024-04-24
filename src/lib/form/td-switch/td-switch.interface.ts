import { IUI, IUIConfig } from '../../ui.interface';
import { TypeSvgSvg } from '@type-dom/framework';

export interface ITdSwitch extends IUI {
  className: 'TdSwitch';
}

export interface ITdSwitchConfig extends IUIConfig {
  /**
   * @description binding value, it should be equivalent to either `active-value` or `inactive-value`, by default it's `boolean` type
   * default: false
   */
  modelValue?: boolean | number | string;
  /**
   * @description whether Switch is disabled
   * default false
   */
  disabled?: boolean;
  /**
   * @description whether Switch is in loading state
   * default false
   */
  loading?: boolean;
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
  activeIcon?: TypeSvgSvg,
  /**
   * @description component of the icon displayed when in `off` state, overrides `inactive-text`
   */
  inactiveIcon?: TypeSvgSvg,
  /**
   * @description text displayed when in `on` state
   */
  activeText?: string,
  /**
   * @description text displayed when in `off` state
   */
  inactiveText?: string,
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
  // beforeChange: {
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
  switchOnColor?: string;
  switchOffColor?: string;
  activeActionText?: string;
  inactiveActionText?: string;
  beforeChange?: () => boolean;
}
