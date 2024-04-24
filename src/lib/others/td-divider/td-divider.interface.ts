import { IUI, IUIConfig } from '../../ui.interface';

export interface ITdDivider extends IUI {
  className: 'TdDivider';
}

export interface ITdDividerConfig extends IUIConfig {
  /**
   * @description Set divider's direction
   */
  direction?: 'horizontal' | 'vertical'; // default: 'horizontal',
  /**
   * @description Set the style of divider
   */
  contentPosition?: 'left' | 'center' | 'right'; // default: 'center',
  /**
   * @description the position of the customized content on the divider line
   */
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset'; //  default: 'solid',
}
