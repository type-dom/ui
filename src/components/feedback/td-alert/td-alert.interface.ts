import { ITypeElement, TypeTransitionProps } from '@type-dom/framework';

export interface ITdAlert extends ITypeElement {
  className: 'TdAlert';
}

export interface AlertProps extends TypeTransitionProps {
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
    close?(): void;
  };
}

export type IAlertEffect = 'dark' | 'light';
