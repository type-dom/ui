import { ISize } from '../../../styles/size';
import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { ITdRadioConfig } from '../td-radio/td-radio.interface';
import { IJsonData, IPrimitive, XProxy } from '@type-dom/framework';

export interface ITdRadioGroup extends IUI {
  className: 'TdRadioGroup';
}

export interface ITdRadioGroupConfig extends IUIConfig {
  isButton?: boolean; // 是否为按钮组
  options?: ITdRadioConfig[];
  /**
   * @description native `id` attribute
   */
  id?: string;
  /**
   * @description the size of radio buttons or bordered radios
   */
  size?: ISize;
  /**
   * @description whether the nesting radios are disabled
   */
  disabled?: boolean;
  /**
   * @description binding value
   */
  modelValue?: IPrimitive | XProxy<IJsonData>;
  // resultValue?: string | number | boolean, // todo 是否应该跟modelValue合并
  /**
   * @description border and background color when button is active
   */
  fill?: string;
  /**
   * @description same as `aria-label` in RadioGroup
   */
  label?: string;
  /**
   * @description font color when button is active
   */
  textColor?: string;
  /**
   * @description native `name` attribute
   */
  name?: string;
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
}
