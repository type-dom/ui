import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdAlert extends IUI {
  className: 'TdAlert';
}

export interface ITdAlertConfig extends IUIConfig {
  /**
   * @description alert title.
   *     default: ''
   */
  title?: string;
  description?: string; // default: ''
  /**
   * @description alert type.
   *     default: 'info'
   */
  type?: 'success' | 'warning' | 'error' | 'info';

  /**
   * @description whether alert can be dismissed.
   *     default: true
   */
  closable?: boolean;
  /**
   * @description text for replacing x button
   *     default: ''
   */
  closeText?: string;
  /**
   * @description whether show icon
   */
  showIcon?: boolean;
  /**
   * @description should content be placed in center.
   *     default: 'light'
   */
  center?: boolean;
  effect?: IAlertEffect;

  emits?: {
    close?(): void
  }
}

export type IAlertEffect = 'dark' | 'light';
