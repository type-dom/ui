import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { IButtonSize, IButtonType, ITdButtonConfig } from '../td-button/td-button.interface';
import { TdButton } from '../td-button/td-button.class';

export interface ITdButtonGroup extends IUI {
  className: 'TdButtonGroup';
}

export interface ITdButtonGroupConfig extends IUIConfig {
  /**
   * @description control the size of buttons in this button-group
   */
  size?: IButtonSize;
  /**
   * @description control the type of buttons in this button-group
   */
  type?: IButtonType;

  options?: ITdButtonConfig[];
}
