/**
 * scss/var
 */
export const $fontWeightPrimary = 500;
export const $fontLineHeightPrimary = '24px';
/**
 * 样式的通用全局变量
 * scss/common/var
 */
export type IType = 'primary' | 'success' | 'warning' | 'danger' | 'error' | 'info';
export const $types: IType[] = ['primary', 'success', 'warning', 'danger', 'error', 'info'];

export const $textColors = {
  primary: '#303133',
  regular: '#606266',
  secondary: '#909399',
  placeholder: '#a8abb2',
  disabled: '#c0c4cc',
};
export const $borderColors = {
  '': '#dcdfe6',
  light: '#e4e7ed',
  lighter: '#ebeef5',
  extraLight: '#f2f6fc',
  dark: '#d4d7de',
  darker: '#cdd0d6',
};
export const $fillColors = {
  '': '#f0f2f5',
  light: '#f5f7fa',
  lighter: '#fafafa',
  extraLight: '#fafcff',
  dark: '#ebedf0',
  darker: '#e6e8eb',
  blank: '#ffffff',
};
// Background
export const $bgColors = {
  '': '#ffffff',
  page: '#f2f3f5',
  overlay: '#ffffff',
};
// Border
export const $borderWidth = '1px';
export const $borderStyle = 'solid';
export const $borderColorHover = $textColors.disabled;
export const $borderRadius = {
  base: '4px',
  small: '2px',
  round: '20px',
  circle: '100%',
};
// Box-shadow
export const $boxShadow = {
  '': `0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08)`,
  light: '0px 0px 12px rgba(0, 0, 0, 0.12)',
  lighter: '0px 0px 6px rgba(0, 0, 0, 0.12)',
  dark: '0px 16px 48px 16px rgba(0, 0, 0, 0.08),0px 12px 32px rgba(0, 0, 0, 0.12),0px 8px 16px -8px rgba(0, 0, 0, 0.16)',
};
// Typography （排版）
export const fontFamily = {
  '': "'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif"
};
export const $fontSizes = {
  extraLarge: '20px',
  large: '18px',
  medium: '16px',
  base: '14px',
  small: '13px',
  extraSmall: '12px',
};
// zIndex
export const $zIndex = {
  normal: 1,
  top: 1000,
  popper: 2000,
};

// Disable default
export const $disabled = {
  bgColor: $fillColors.light,
  textColor: $textColors.placeholder,
  borderColor: $borderColors.light
};

export const $commonComponentSize = {
  large: '40px',
  default: '32px',
  small: '24px',
};

// overlay
export const $overlayColor = {
  '': 'rgba(0, 0, 0, 0.8)',
  light: 'rgba(0, 0, 0, 0.7)',
  lighter: 'rgba(0, 0, 0, 0.5)'
};

// mask
const $maskColor = {
  '': 'rgba(255, 255, 255, 0.9)',
  'extra-light': 'rgba(255, 255, 255, 0.3)',
};

export const $colors: Record<string, any> = {
  white: '#ffffff',
  black: '#000000',
  default: { base: $textColors.regular },
  primary: { base: '#409eff' },
  success: { base: '#67c23a' },
  warning: { base: '#e6a23c' },
  danger: { base: '#f56c6c' },
  error: { base: '#f56c6c' },
  info: { base: '#909399' },
};
export const $colorWhite = $colors.white;
export const $colorBlack = $colors.black;
export const $colorPrimary = $colors.primary.base;
export const $colorSuccess = $colors.success.base;
export const $colorWarning = $colors.warning.base;
export const $colorDanger = $colors.danger.base;
export const $colorError = $colors.error.base;
export const $colorInfo = $colors.info.base;

function blendColors(color1: string, color2: string, mixRatio: number) {
  console.log('blenderColors . color1 is ', color1, ' color2 is ', color2, ' mixRation is ', mixRatio);
  // 将颜色转换为RGB格式
  let rgb1 = rgbStringToRgbArray(color1);
  let rgb2 = rgbStringToRgbArray(color2);
  // 根据比例混合RGB值
  // let mixedRgb = mixColorsRgb(rgb1, rgb2, mixRatio);
  const mixedRgb: number[] = [];
  for (let i = 0; i < 3; i++) {
    mixedRgb[i] = Math.round(mixRatio * rgb1[i] + (1 - mixRatio) * rgb2[i]);
  }
  // 将混合后的RGB值转回颜色字符串
  return rgbArrayToColorString(mixedRgb);
}
function rgbStringToRgbArray(colorString: string): number[] {
  if (colorString.length < 5) {
    throw Error('colorString is error . ');
  }
  const r = parseInt(colorString.substring(1, 3), 16);
  const g = parseInt(colorString.substring(3, 5), 16);
  const b = parseInt(colorString.substring(5, 7), 16);
  return [r, g, b];
}
function rgbArrayToColorString(rgbArray: number[]) {
  let redHex = padStart(rgbArray[0].toString(16), 2, '0');
  let greenHex = padStart(rgbArray[1].toString(16), 2, '0');
  let blueHex = padStart(rgbArray[2].toString(16), 2, '0');
  console.log('rgbArrayToColorString color is ', '#' + redHex + greenHex + blueHex);
  return '#' + redHex + greenHex + blueHex;
}
function padStart(str: string, targetLength: number, padString: string) {
  str = str.toString();
  padString = padString ? String(padString) : '0';
  return (str.length >= targetLength) ? str : str.padStart(targetLength, padString);
}
export function setColorMixLevel(
  $type: IType,
  $number: number,
  $mode = 'light',
  $mixColor = $colorWhite
) {
  // $colors[$type][$mode] = {};
  // $colors[$type][$mode + '-' + $number] = mix($mixColor, $colors[$type].base, Math.round($number * 10) / 100);
  $colors[$type][$mode + '-' + $number] = blendColors($mixColor, $colors[$type].base, Math.round($number * 10) / 100);
  // $colors =  map.deepMerge(
  //     $type: (
  //       '#{$mode}-#{$number}':
  //       mix(
  //         $mixColor,
  //         $colors[$type].base,
  //         math.percentage(math.div($number, 10))
  //       ),
  //     )
  // );
  // return $colors;
}

// $colors.primary.light-i
// --el-color-primary-light-i
// 10% 53a8ff
// 20% 66b1ff
// 30% 79bbff
// 40% 8cc5ff
// 50% a0cfff
// 60% b3d8ff
// 70% c6e2ff
// 80% d9ecff
// 90% ecf5ff
for (const $type of $types) {
  for (let $i = 1; $i < 10; $i++) {
    setColorMixLevel($type, $i, 'light', $colorWhite);
  }
  // --el-color-primary-dark-2
  setColorMixLevel($type, 2, 'dark', $colorBlack);
}
console.log('$colors is ', $colors);
// Button
// css3 var in packages/theme-chalk/src/button.scss
export const $button = {
  fontWeight: $fontWeightPrimary, // getCssVar('font-weight-primary'),
  borderColor: $borderColors[''],
  bgColor: $fillColors.blank,
  textColor: $textColors.regular,
  disabled: {
    textColor: $disabled.textColor,
    bgColor: $fillColors.blank,
    borderColor: $borderColors.light,
  },
  divide: {
    borderColor: 'rgba(' + $colorWhite + ', 0.5)'
  },
  hover: {
    textColor: $colorPrimary,
    bgColor: $colors.primary['light-9'],
    borderColor: $colors.primary['light-7'],
    link: {
      textColor: $colors.info.base, // getCssVar('color-info'),
    },
  },
  active: {
    textColor: $colorPrimary,
    borderColor: $colorPrimary, // 'hover-text-color'
    bgColor: $colors.primary['light-9'], //  getCssVar('button', 'hover-bg-color),
    color: $textColors.primary, // getCssVar('text-color', 'primary'),
  },
  outline: {
    Color: $colors.primary['light-5'], // getCssVar('color-primary', 'light-5'),}
  }
};

export const $buttonBorderWidth = $borderWidth;

// need mix, so do not use css var
export const $buttonHoverTintPercent = '20%';
export const $buttonActiveShadePercent = '10%';

export const $buttonBorderColor: Record<string, string> = {};
export const $buttonBgColor: Record<string, string> = {};
export const $buttonTextColor = {};

for (const $type of $types) {
  $buttonBorderColor[$type] = $colors[$type].base;
  $buttonBgColor[$type] = $colors[$type].base;
}
export const $buttonFontSize = {
  large: $fontSizes.base,
  default: $fontSizes.base,
  small: '12px',
};
export const $buttonBorderRadius = {
  large: $borderRadius.base,
  default: $borderRadius.base,
  small: (parseInt($borderRadius.base, 10) - 1) + 'px',
};
export const $buttonPaddingVertical = {
  large: '13px',
  default: '9px',
  small: '6px',
};
export const $buttonPaddingHorizontal = {
  large: '20px',
  default: '16px',
  small: '12px',
};
