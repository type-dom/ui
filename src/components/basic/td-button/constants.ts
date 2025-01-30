import { InjectionKey } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';
import { TdButtonProps } from './td-button.interface';

export interface ButtonGroupContext {
  size?: MaybeRef<TdButtonProps['size']>;
  type?: MaybeRef<TdButtonProps['type']>;
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol(
  'buttonGroupContextKey'
);
