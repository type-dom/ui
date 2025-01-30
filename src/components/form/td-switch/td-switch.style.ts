import {
  $borderColor,
  $borderRadius,
  $colorPrimary,
  $colors,
  $colorWhite,
  $textColor,
  $transitionDurationDefault,
  $transitionDurationFast,
} from '../../../styles/var';
import { IStyle } from '@type-dom/css-type';
import { unref } from '@type-dom/signals';

export const $switchOnColor = $colors.primary.base;
// -switch-on-color: var(--el-color-primary);
export const $switchOffColor = $borderColor.base;
// --el-switch-off-color: var(--el-border-color);
export const $switchBorderColor = $borderColor.base;
export const $switchHeight = {
  large: '40px',
  default: '32px',
  small: '24px',
};

export const $switchFontSize = {
  large: '14px',
  default: '14px',
  small: '12px',
};
export const $switchCoreBorderRadius = {
  large: '12px',
  default: '10px',
  small: '8px',
};

export const $switchCoreWidth = {
  large: '50px',
  default: '40px',
  small: '30px',
};

export const $switchCoreHeight = {
  large: '24px',
  default: '20px',
  small: '16px',
};

export const $switchButtonSize = {
  large: '20px',
  default: '16px',
  small: '12px',
};

export const $switchContentPadding = {
  large: '6px',
  default: '4px',
  small: '2px',
};

export const $switch = {
  // 'on-color': getCssVar('color-primary'),
  onColor: $colorPrimary,
  // 'off-color': getCssVar('border-color'),
  offColor: $borderColor,
};

export const $switchStyle: IStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  position: 'relative',
  // font-size: map.get($switch-font-size, 'default'),
  fontSize: $switchFontSize['default'],
  // line-height: map.get($switch-core-height, 'default'),
  lineHeight: $switchHeight['default'],
  // height: map.get($switch-height, 'default'),
  height: $switchHeight['default'],
  verticalAlign: 'middle',
};

export const $switchLabel = {
  // transition: getCssVar('transition-duration-fast'),
  transition: $transitionDurationFast,
  // height: map.get($switch-core-height, 'default'),
  display: 'inline-flex',
  // font-size: map.get($switch-font-size, 'default'),
  fontWeight: $switchFontSize['default'],
  cursor: 'pointer',
  verticalAlign: 'middle',
  // color: getCssVar('text-color', 'primary'),
  color: $textColor.primary,
};

export const $switchInputStyle: IStyle = {
  position: 'absolute',
  width: 0,
  height: 0,
  opacity: 0,
  margin: 0,
};

export const $switchCoreStyle: IStyle = {
  display: 'inline-flex',
  position: 'relative',
  alignItems: 'center',
  //   min-width: map.get($switch-core-width, 'default');
  minWidth: $switchCoreWidth['default'],
  // height: map.get($switch-core-height, 'default');
  height: $switchCoreHeight['default'],
  // border: '1px solid var(--el-switch-border-color, var(--el-switch-off-color))',
  border: '1px solid ' + $switchBorderColor,
  // border-radius: map.get($switch-core-border-radius, 'default'),
  borderRadius: $switchCoreBorderRadius['default'],
  outline: 'none',
  boxSizing: 'border-box',
  // background: getCssVar('switch-off-color'),
  backgroundColor: $switchOffColor,
  cursor: 'pointer',
  // transition: border-color getCssVar('transition-duration'),
  //     background-color getCssVar('transition-duration'),
  transition:
    'border-color ' +
    $transitionDurationDefault +
    ', background-color ' +
    $transitionDurationDefault,
};

export const $switchDisabledStyle: IStyle = {
  opacity: 0.6,
};
export const $disabledStyle: IStyle = {
  cursor: 'not-allowed',
};

export const $switchCoreInnerStyle: IStyle = {
  width: '100%',
  // transition: all getCssVar('transition-duration'),
  transition: 'all ' + $transitionDurationDefault,
  // height: map.get($switch-button-size, 'default'),
  height: $switchButtonSize['default'],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  // padding: 0 #{map.get($switch-content-padding, 'default')} 0 calc(#{map.get(
  //     $switch-button-size,
  //     'default'
  //   )} + 2px);
  padding:
    '0 ' +
    $switchContentPadding['default'] +
    ' 0 calc(' +
    $switchButtonSize['default'] +
    ' + 2px)',
};

export const $switchCoreActionStyle: IStyle = {
  position: 'absolute',
  left: '1px',
  // border-radius: getCssVar('border-radius-circle'),
  borderRadius: $borderRadius.circle,
  // transition: all getCssVar('transition-duration'),
  transition: 'all ' + $transitionDurationDefault,
  // width: map.get($switch-button-size, 'default'),
  width: $switchButtonSize['default'],
  // height: map.get($switch-button-size, 'default'),
  height: $switchButtonSize['default'],
  // background-color: getCssVar('color-white'),
  backgroundColor: $colorWhite,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // color: getCssVar('switch-off-color'),
  color: $switchOffColor,
};
