import { ISize } from '../../../styles/size';
import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdRadio extends IUI {
  className: 'TdRadio';
}

export interface ITdRadioConfig extends IUIConfig {
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
  /**
   * @description whether to add a border around Radio
   */
  border?: boolean,
  // 是否选中
  checked?: boolean,
  isFirst?: boolean,
  isLast?: boolean,
}
