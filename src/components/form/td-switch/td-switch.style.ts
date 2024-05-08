import { $borderColor, $colors, $textColor, $transitionDuration, $transitionDurationFast } from '../../../styles/var';
import { StyleCursor } from '@type-dom/framework';

export const $switchOnColor = $colors.primary.base;
// -switch-on-color: var(--el-color-primary);
export const $switchOffColor = $borderColor.base;
// --el-switch-off-color: var(--el-border-color);
export const $switchBorderColor = $borderColor.base;
export const $switchHeight = {
  large: '40px',
  default: '32px',
  small: '24px'
};

export const $switchFontSize = {
  large: '14px',
  default: '14px',
  small: '12px'
};
export const $switchCoreBorderRadius = {
  large: '12px',
  default: '10px',
  small: '8px'
};

export const $switchCoreWidth = {
  large: '50px',
  default: '40px',
  small: '30px'
};

export const $switchCoreHeight = {
  large: '24px',
  default: '20px',
  small: '16px'
};

export const $switchButtonSize = {
  large: '20px',
  default: '16px',
  small: '12px'
};

export const $switchContentPadding = {
  large: '6px',
  default: '4px',
  small: '2px'
};

export const $switchLabel = {
  // transition: getCssVar('transition-duration-fast'),
  transition: $transitionDurationFast,
  // height: map.get($switch-core-height, 'default'),
  display: 'inline-flex',
  // font-size: map.get($switch-font-size, 'default'),
  fontWeight: $switchFontSize['default'],
  cursor: StyleCursor.pointer,
  verticalAlign: 'middle',
  // color: getCssVar('text-color', 'primary'),
  color: $textColor.primary
};
