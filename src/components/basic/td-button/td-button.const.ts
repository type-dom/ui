import { InjectionKey } from '@type-dom/framework';
import type { ITdButtonConfig } from './td-button.interface'

export interface ButtonGroupContext {
  size?: ITdButtonConfig['size']
  type?: ITdButtonConfig['type']
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol(
  'buttonGroupContextKey'
);

