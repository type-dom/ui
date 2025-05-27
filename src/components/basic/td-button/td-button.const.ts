import { InjectionKey } from '@type-dom/framework';
import { ElLoadingSvg } from '@type-dom/svgs';
import type { TdButtonProps } from './td-button.interface';

export interface ButtonGroupContext {
  size?: TdButtonProps['size'];
  type?: TdButtonProps['type'];
}

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol(
  'buttonGroupContextKey'
);

export const buttonTypes = [
  'default',
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  /**
   * @deprecated
   * Text type will be deprecated in the preview major version (3.0.0)
   */
  'text',
  '',
] as const;

export const buttonNativeTypes = ['button', 'submit', 'reset'] as const;

export const buttonProps = {
  type: '',
  nativeType: 'button',
  loadingIcon: ElLoadingSvg,
  plain: undefined,
  round: undefined,
  tag: 'button',
};
export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type ButtonType = TdButtonProps['type'];
export type ButtonNativeType = TdButtonProps['nativeType'];

export interface ButtonConfigContext {
  type?: string
  plain?: boolean
  round?: boolean
  autoInsertSpace?: boolean;
}
