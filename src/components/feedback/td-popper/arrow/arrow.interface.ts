import { IUI, IUIConfig } from '../../../../ui/ui.interface';

export interface ITdPopperArrow extends IUI {
  className: 'TdPopperArrow';
}

export interface ITdPopperArrowConfig extends IUIConfig {
  /**
   *
   *     default: 5,
   */
  arrowOffset?: number;
}
