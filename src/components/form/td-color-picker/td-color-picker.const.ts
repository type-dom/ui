import { InjectionKey } from '@type-dom/framework';
import { isNil, isString } from 'lodash-es';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants';
import { ColorPickerContext, ColorPickerProps } from './td-color-picker.interface';

export const colorPickerProps: ColorPickerProps = {
  popperClass: '',
  tabindex: 0,
  validateEvent: true,
}

export const colorPickerEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | null) => isString(val) || isNil(val),
  [CHANGE_EVENT]: (val: string | null) => isString(val) || isNil(val),
  activeChange: (val: string | null) => isString(val) || isNil(val),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
}

export const colorPickerContextKey: InjectionKey<ColorPickerContext> = Symbol(
  'colorPickerContextKey'
)
