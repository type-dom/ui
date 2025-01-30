import { InjectionKey } from '@type-dom/framework';
import { RadioGroupProps } from '../td-radio-group/td-radio-group.interface';

export interface RadioGroupContext extends RadioGroupProps {
  changeEvent: (val: RadioGroupProps['modelValue']) => void;
}

export const radioGroupKey: InjectionKey<RadioGroupContext> =
  Symbol('radioGroupKey');
