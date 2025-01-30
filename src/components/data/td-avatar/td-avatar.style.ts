import { $borderRadius, $colorWhite, $textColor } from '../../../styles/var';
import { IStyle } from '@type-dom/css-type';

export const $avatar = {
  // 'text-color': getCssVar('color-white'),
  textColor: $colorWhite,
  // 'bg-color': getCssVar('text-color', 'disabled'),
  bgColor: $textColor.disabled,
  textSize: '14px',
  iconSize: '18px',
  // 'border-radius': getCssVar('border-radius-base'),
  borderRadius: $borderRadius.base,
};

export const $avatarSize = {
  large: '56px',
  default: '40px',
  small: '24px',
};

export const $avatarStyle: IStyle = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  textAlign: 'center',
  overflow: 'hidden',
  // color: getCssVar('avatar', 'text-color'),
  color: $avatar.textColor,
  // background: getCssVar('avatar', 'bg-color'),
  background: $avatar.bgColor,
  // width: getCssVar('avatar', 'size'),
  width: $avatarSize.default,
  // height: getCssVar('avatar', 'size'),
  height: $avatarSize.default,
  // font-size: getCssVar('avatar', 'text-size'),
  fontSize: $avatar.textSize,
};

export const $avatarSizeDefault = $avatarSize.default;
