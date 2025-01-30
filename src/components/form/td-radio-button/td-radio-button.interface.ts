import { ITypeLabel, TypeLabelProps } from '@type-dom/framework';
import { ComponentSize } from '../../../constants/size';

export interface ITdRadioButton extends ITypeLabel {
  className: 'TdRadioButton';
}

export interface RadioButtonProps extends TypeLabelProps {
  /**
   * @description binding value
   */
  modelValue?: string | number | boolean;
  /**
   * @description size of the Radio
   */
  size?: ComponentSize;
  /**
   * @description whether Radio is disabled
   */
  disabled?: boolean;
  /**
   * @description the label of Radio
   */
  label?: string;
  /**
   * @description the value of Radio
   */
  value?: string | number | boolean;
  /**
   * @description native `name` attribute
   */
  name?: string;
  // 是否选中
  checked?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}
