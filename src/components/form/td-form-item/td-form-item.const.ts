import { InjectionKey } from '@type-dom/framework';
import { FormContext, FormItemContext } from '../td-form/td-form.interface';
import { FormItemProps } from './td-form-item.interface';

export const formItemValidateStates = [
  '',
  'error',
  'validating',
  'success',
] as const;

export const formItemProps: FormItemProps = {
  labelWidth: '',
  labelPosition: '',
  inlineMessage: '',
  showMessage: true,
};

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey');
export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey');
