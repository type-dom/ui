import { radioEmits } from '../td-radio/td-radio.const';
import { RadioGroupProps } from './td-radio-group.interface';

export const radioGroupProps: RadioGroupProps = {
  fill: '',
  textColor: '',
  validateEvent: true,
  // ...useAriaProps(['ariaLabel']),
};

export const radioGroupEmits = radioEmits;
