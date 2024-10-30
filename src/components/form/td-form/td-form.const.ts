import { InjectionKey } from '@type-dom/framework';
import { ITdFormItemConfig } from '../td-form-item/td-form-item.interface';
import { ITdFormConfig } from './td-form.interface';

export const formContextKey: InjectionKey<ITdFormConfig> =
  Symbol('formContextKey');
export const formItemContextKey: InjectionKey<ITdFormItemConfig> =
  Symbol('formItemContextKey');
