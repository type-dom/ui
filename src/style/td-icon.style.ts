import { IStyle } from './style.interface';
export const $tdIcon: Partial<IStyle> = {
  height: '1em',
  width: '1em',
  lineHeight: '1em',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  fill: 'currentColor',
  // color: var(--color),
  fontSize: 'inherit',
};

export const $iconLoading = {
  animation: 'rotating 2s linear infinite'
};
export const $iconRight = {
  marginLeft: '5px',
  float: 'right',
};
export const $iconLeft = {
  marginRight: '5px',
  float: 'left',
};
