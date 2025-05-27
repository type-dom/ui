import { BacktopProps } from './td-backtop.interface';

export const backtopProps: BacktopProps = {
  visibilityHeight: 200,
  target: '',
  right: 40,
  bottom: 40,
};

export const backtopEmits = {
  click: (evt: MouseEvent, _target?: HTMLElement) => evt instanceof MouseEvent,
};
export type BacktopEmits = typeof backtopEmits;
