import { vHash } from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';

export const $iconStyle: IStyle = {
  height: '1em',
  width: '1em',
  lineHeight: '1em',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  fill: 'currentColor',
  // color: 'var(--color)',
  fontSize: 'inherit',
};

export const $iconLoadingStyle: IStyle = {
  animation: `rotating-${vHash} 2s linear infinite`,
};
export const $iconRightStyle: IStyle = {
  marginLeft: '5px',
  float: 'right',
};
export const $iconLeftStyle: IStyle = {
  marginRight: '5px',
  float: 'left',
};
