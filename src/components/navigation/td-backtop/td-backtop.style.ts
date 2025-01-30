import {
  $bgColor,
  $borderColor,
  $boxShadow,
  $colorPrimary,
} from '../../../styles/var';
import { IStyle } from '@type-dom/css-type';

export const $backtop = {
  // 'bg-color': getCssVar('bg-color', 'overlay'),
  bgColor: $bgColor.overlay,
  // 'text-color': getCssVar('color-primary'),
  textColor: $colorPrimary,
  // 'hover-bg-color': getCssVar('border-color-extra-light'),
  hoverBgColor: $borderColor.extraLight,
  // 'hover-text-color':
};

export const $backtopStyle: IStyle = {
  position: 'fixed',
  // background-color: getCssVar('backtop', 'bg-color'),
  backgroundColor: $backtop.bgColor,
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  // color: getCssVar('backtop', 'text-color'),
  color: $backtop.textColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  // boxShadow: getCssVar('box-shadow', 'lighter'),
  boxShadow: $boxShadow.lighter,
  cursor: 'pointer',
  zIndex: 15, // 5 会被遮挡
};
