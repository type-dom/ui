import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdOption extends IUI {
  className: 'TdOption';
}

export interface ITdOptionConfig extends IUIConfig {
  /**
   * @description value of option
   *     required: true,
   */
  value?: string | number | boolean | object;

  /**
   * @description label of option, same as `value` if omitted
   */
  label?: string | number;
  created?: boolean;
  /**
   * @description whether option is disabled
   */
  disabled?: boolean;
}
