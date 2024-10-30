import { vHash } from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';

export const $tdIcon: IStyle = {
  height: '1em',
  width: '1em',
  lineHeight: '1em',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  fill: 'currentColor',
  // color: 'var(--color)',
  fontSize: 'inherit'
};

export const $iconLoading: IStyle = {
  animation: `rotating-${vHash} 2s linear infinite`
};
export const $iconRight: IStyle = {
  marginLeft: '5px',
  float: 'right'
};
export const $iconLeft: IStyle = {
  marginRight: '5px',
  float: 'left'
};
