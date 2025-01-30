import { ITypeDiv, TypeDivProps } from '@type-dom/framework';
import {
  IButtonSize,
  IButtonType,
  TdButtonProps,
} from '../td-button/td-button.interface';

export interface ITdButtonGroup extends ITypeDiv {
  className: 'TdButtonGroup';
  props: ITdButtonGroupConfig;
}

export interface ITdButtonGroupConfig extends TypeDivProps {
  /**
   * @description control the size of buttons in this button-group
   */
  size?: IButtonSize;
  /**
   * @description control the type of buttons in this button-group
   */
  type?: IButtonType;

  options?: TdButtonProps[];
}
