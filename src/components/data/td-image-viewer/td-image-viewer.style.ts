import { IStyle } from '@type-dom/css-type';
import { $textColor } from '../../../styles/var';

export const $opIcon: IStyle = {
  width: '44px',
  height: '44px',
  fontSize: '24px',
  color: '#fff',
  // background-color: getCssVar('text-color', 'regular'),
  backgroundColor: $textColor.regular,
  borderColor: '#fff',
};
export const $btn: IStyle = {
  position: 'absolute',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  opacity: 0.8,
  cursor: 'pointer',
  boxSizing: 'border-box',
  userSelect: 'none',
};

export const $canvas: IStyle = {
  position: 'static',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
};

export const $actions: IStyle = {
  left: '50%',
  bottom: '30px',
  transform: 'translateX(-50%)',
  width: '282px',
  height: '44px',
  padding: '0 23px',
  // background-color: getCssVar('text-color', 'regular'),
  backgroundColor: $textColor.regular,
  borderColor: '#fff',
  borderRadius: '22px',
};

export const $actionsInner: IStyle = {
  width: '100%',
  height: '100%',
  cursor: 'default',
  fontSize: '23px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
};

export const $prev: IStyle = {
  top: '50%',
  transform: 'translateY(-50%)',
  left: '40px',
  ...$opIcon,
};

export const $next: IStyle = {
  top: '50%',
  transform: 'translateY(-50%)',
  right: '40px',
  textIndent: '2px',
  ...$opIcon,
};

export const $mask: IStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  opacity: 0.5,
  background: '#000',
};
