import {
  $bgColors, $borderColorHover,
  $borderColors,
  $borderRadius,
  $borderWidth,
  $colors,
  $commonComponentSize,
  $disabled,
  $fillColors,
  $textColors
} from '../../styles/var';

// Input
// css3 var in packages/theme-chalk/src/input.scss
export const $input = {
  textColor: $textColors.regular,
  // 'border': $border, // getCssVar('border'),
  hoverBorder: $borderColorHover, // getCssVar('border-color-hover'),
  focusBorder: $colors.primary.base, // getCssVar('color-primary'),
  transparentBorder: '0 0 0 1px transparent inset',
  borderColor: $borderColors.base, // getCssVar('border-color'),
  borderRadius: $borderRadius.base, // getCssVar('border-radius-base'),
  bgColor: $fillColors.blank, // getCssVar('fill-color', 'blank'),
  iconColor: $textColors.placeholder, // getCssVar('text-color-placeholder'),
  placeholderColor: $textColors.placeholder, // getCssVar('text-color-placeholder'),
  hoverBorderColor: $borderColorHover, // getCssVar('border-color-hover'),
  clearHoverColor: $textColors.secondary, // getCssVar('text-color-secondary'),
  focusBorderColor: $colors.primary.base, // getCssVar('color-primary'),
  width: '100%'
};

export const $inputDisabled = {
  fill: $disabled.bgColor,
  border: $disabled.borderColor,
  textColor: $disabled.textColor,
  placeholderColor: $textColors.placeholder
};

export const $inputFontSize = {
  large: '14px',
  default: '14px',
  small: '12px'
};

export const $inputHeight = $commonComponentSize;

export const $inputLineHeight = $commonComponentSize;

export const $inputNumberWidth = {
  large: '180px',
  default: '150px',
  small: '120px'
};

export const $inputPaddingHorizontal = {
  large: '16px',
  default: '12px',
  small: '8px'
};

export const $wrapperPadding = {
  large: $borderWidth +
    ' ' +
    (parseFloat($inputPaddingHorizontal.large.slice(0, -2)) -
      parseFloat($borderWidth.slice(0, -2))) +
    'px',
  default: $borderWidth +
    ' ' +
    (parseFloat($inputPaddingHorizontal.default.slice(0, -2)) -
      parseFloat($borderWidth.slice(0, -2))) +
    'px',
  small: $borderWidth +
    ' ' +
    (parseFloat($inputPaddingHorizontal.small.slice(0, -2)) -
      parseFloat($borderWidth.slice(0, -2))) +
    'px'
};

export const $inputTextColor = $textColors.primary;
export const $inputInnerHeight =
  parseFloat($commonComponentSize.default.slice(0, -2)) -
  parseFloat($borderWidth.slice(0, -2)) * 2 +
  'px';
