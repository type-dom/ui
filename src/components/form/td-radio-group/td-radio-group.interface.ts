import { ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';

import { ComponentSize } from '../../../constants/size';
import { RadioProps } from '../td-radio/td-radio.interface';
import { IPrimitive } from '@type-dom/utils';

export interface ITdRadioGroup extends ITypeDiv {
  className: 'TdRadioGroup';
}

export interface RadioGroupProps extends TypeDivProps {
  isButton?: boolean; // 是否为按钮组
  options?: RadioProps[];
  /**
   * @description native `id` attribute
   */
  id?: string;
  /**
   * @description the size of radio buttons or bordered radios
   */
  size?: ComponentSize;
  /**
   * @description whether the nesting radios are disabled
   */
  disabled?: boolean;
  /**
   * @description binding value
   */
  modelValue?: MaybeRef<IPrimitive>;
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
