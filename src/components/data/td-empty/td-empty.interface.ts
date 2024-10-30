import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { TypeElement } from '@type-dom/framework';

export interface ITdEmpty extends IUI {
  className: 'TdEmpty';
}

export interface ITdEmptyConfig extends IUIConfig {
  /**
   * @description image URL of empty
   *     default: ''
   */
  image?: string;
  /**
   * @description image size (width) of empty
   */
  imageSize?: number;
  /**
   * @description description of empty
   *     default: ''
   */
  description?: string;

  slots?: {
    image?: TypeElement | TypeElement[];
    description?: TypeElement | TypeElement[];
  }
}
