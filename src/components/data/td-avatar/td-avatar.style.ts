import { $borderRadius, $colorWhite, $textColor } from '../../../styles/var';

export const $avatar = {
  // 'text-color': getCssVar('color-white'),
  textColor: $colorWhite,
  // 'bg-color': getCssVar('text-color', 'disabled'),
  bgColor: $textColor.disabled,
  textSize: '14px',
  iconSize: '18px',
  // 'border-radius': getCssVar('border-radius-base'),
  borderRadius: $borderRadius.base
};

export const $avatarSize = {
  large: '56px',
  default: '40px',
  small: '24px'
};

export const $avatarSizeDefault = $avatarSize.default;
