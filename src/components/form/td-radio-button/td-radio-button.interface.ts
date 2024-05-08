import { ITypeConfig } from '@type-dom/framework';
import { ISize } from '../../../styles/size';
import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdRadioButton extends IUI {
  className: 'TdRadioButton';
}

export interface ITdRadioButtonConfig extends IUIConfig {
  /**
   * @description binding value
   */
  modelValue?: string | number | boolean,
  /**
   * @description size of the Radio
   */
  size?: ISize,
  /**
   * @description whether Radio is disabled
   */
  disabled?: boolean,
  /**
   * @description the label of Radio
   */
  label?: string,
  /**
   * @description the value of Radio
   */
  value?: string | number | boolean,
  /**
   * @description native `name` attribute
   */
  name?: string,
  // 是否选中
  checked?: boolean,
  isFirst?: boolean,
  isLast?: boolean,
}
