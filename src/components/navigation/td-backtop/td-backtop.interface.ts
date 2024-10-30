import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdBackTop extends IUI {
  className: 'TdBackTop';
}

export interface ITdBackTopConfig extends IUIConfig {
  /**
   * @description the button will not show until the scroll height reaches this value.
   *     default: 200,
   */
  visibilityHeight?: number;
  /**
   * @description the target to trigger scroll.
   *     default: '',
   */
  target?: HTMLElement; // string;
  /**
   * @description right distance.
   *     default: 40,
   */
  right?: number;
  /**
   * @description bottom distance.
   *     default: 40,
   */
  bottom?: number;

  // slot?: TypeElement;

  emits?: {
    click: (event: MouseEvent) => void;
  };
}
