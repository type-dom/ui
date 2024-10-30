import { $borderRadius, $colorWhite, $textColor } from '../../../styles/var';

export const $image = {
  // 'text-color': getCssVar('color-white'),
  textColor: $colorWhite,
  // 'bg-color': getCssVar('text-color', 'disabled'),
  bgColor: $textColor.disabled,
  textSize: '14px',
  iconSize: '18px',
  // 'border-radius': getCssVar('border-radius-base'),
  borderRadius: $borderRadius.base
};

export const $size = {
  width: '100%',
  height: '100%'
};
