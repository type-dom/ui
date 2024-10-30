import { IUIConfig } from './ui/ui.interface';

export interface IAriaConfig extends IUIConfig {
  /**
   * @description native `aria-label` attribute
   */
  ariaLabel?: string;
  /**
   * @description native `aria-orientation` attribute
   */
  ariaOrientation?: 'horizontal' | 'vertical' | 'undefined';
  /**
   * @description native `aria-controls` attribute
   */
  ariaControls?: string;
}
