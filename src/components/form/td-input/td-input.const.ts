import { isString } from '@type-dom/utils';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { TdInputProps } from './td-input.interface';

export type InputAutoSize = { minRows?: number; maxRows?: number } | boolean;

export const inputProps: TdInputProps = {
  modelValue: '',
  type: 'text',
  autosize: false,
  autocomplete: 'off',
  tabindex: 0,
  validateEvent: true,
  rows: 2,
  // ...useAriaProps(['ariaLabel']),
};

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  // NOTE: when autofill by browser, the keydown event is instanceof Event, not KeyboardEvent
  // relative bug report https://github.com/element-plus/element-plus/issues/6665
  keydown: (evt: KeyboardEvent | Event) => evt instanceof Event,
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent,
};
export type InputEmits = typeof inputEmits;
