import { IUI, IUIConfig } from '../../../../ui/ui.interface';

export interface ITdOptionGroup extends IUI {
  className: 'TdOptionGroup';
}

export interface ITdOptionGroupConfig extends IUIConfig {
  /**
   * @description name of the group
   */
  label?: string,
  /**
   * @description whether to disable all options in this group
   */
  disabled?: boolean,
}
