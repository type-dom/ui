import { ITypeLabel, TypeLabelProps } from '@type-dom/framework';
import { ComponentSize } from '../../../constants/size';

export interface ITdRadio extends ITypeLabel {
  className: 'TdRadio';
}

export interface RadioProps extends TypeLabelProps {
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
  /**
   * @description whether to add a border around Radio
   */
  border?: boolean;
  // 是否选中
  checked?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}
