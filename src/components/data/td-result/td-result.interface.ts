import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { TypeElement } from '@type-dom/framework';

export interface ITdResult extends IUI {
  className: 'TdResult';
}

export interface ITdResultConfig extends IUIConfig {
  /**
   * @description title of result
   *     default: '',
   */
  title?: string;
  /**
   * @description sub title of result
   *     default: '',
   */
  subTitle?: string;
  /**
   * @description icon type of result
   *     default: 'info',
   */
  icon?: 'success' | 'warning' | 'info' | 'error';

  slots?: {
    title?: TypeElement;
    subTitle?: TypeElement;
    extra?: TypeElement;
    icon?: TypeElement;
  };
}
