import { $borderRadius, $colorWhite, $textColor } from '../../../styles/var';
import { IStyle } from '@type-dom/css-type';

export const $image = {
  // 'text-color': getCssVar('color-white'),
  textColor: $colorWhite,
  // 'bg-color': getCssVar('text-color', 'disabled'),
  bgColor: $textColor.disabled,
  textSize: '14px',
  iconSize: '18px',
  // 'border-radius': getCssVar('border-radius-base'),
  borderRadius: $borderRadius.base,
};

export const $size = {
  width: '100%',
  height: '100%',
};

export const $imageStyle: IStyle = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  textAlign: 'center',
  overflow: 'hidden',
  // color: getCssVar('image', 'text-color'),
  color: $image.textColor,
  // background: getCssVar('image', 'bg-color'),
  background: $image.bgColor,
  // width: getCssVar('image', 'size'),
  width: $size.width,
  // height: getCssVar('image', 'size'),
  height: $size.height,
  // font-size: getCssVar('image', 'text-size'),
  fontSize: $image.textSize,
};
