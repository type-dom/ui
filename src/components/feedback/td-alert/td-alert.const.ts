import { AlertProps } from '@type-dom/ui';

export const alertEffects = ['light', 'dark'] as const;

export const alertProps: AlertProps = {
  title: '',
  description: '',
  type: 'info',
  closable: true,
  closeText: '',
  effect: 'light',
};

export const alertEmits = {
  close: (evt?: MouseEvent) => evt instanceof MouseEvent,
};
export type AlertEmits = typeof alertEmits;
