import { InjectionKey } from '@type-dom/framework';
import { isArray, isBoolean, isString } from '@type-dom/utils';
import { FormItemProp } from '../td-form-item/td-form-item.interface';
import { FormContext, FormItemContext, FormProps } from './td-form.interface';

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey');

export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey');

export const formProps: FormProps = {
  labelPosition: 'right',
  requireAsteriskPosition: 'left',
  labelWidth: '',
  labelSuffix: '',
  showMessage: true,
  validateOnRuleChange: true,
  scrollIntoViewOptions: true
};

export const formEmits = {
  validate: (prop: FormItemProp, isValid: boolean, message: string) =>
    (isArray(prop) || isString(prop)) &&
    isBoolean(isValid) &&
    isString(message),
};
