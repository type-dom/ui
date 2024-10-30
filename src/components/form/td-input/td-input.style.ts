import {
  $bgColor,
  $borderColorHover,
  $borderColor,
  $fillColor,
  $textColor,
  $borderRadius,
  $borderWidth,
  $colors,
  $commonComponentSize,
  $disabled
} from '../../../styles/var';

// Input
// css3 var in packages/theme-chalk/src/input.scss
export const $input = {
  textColor: $textColor.regular,
  // 'border': $border, // getCssVar('border'),
  hoverBorder: $borderColorHover, // getCssVar('border-color-hover'),
  focusBorder: $colors.primary.base, // getCssVar('color-primary'),
  transparentBorder: '0 0 0 1px transparent inset',
  borderColor: $borderColor.base, // getCssVar('border-color'),
  borderRadius: $borderRadius.base, // getCssVar('border-radius-base'),
  bgColor: $fillColor.blank, // getCssVar('fill-color', 'blank'),
  iconColor: $textColor.placeholder, // getCssVar('text-color-placeholder'),
  placeholderColor: $textColor.placeholder, // getCssVar('text-color-placeholder'),
  hoverBorderColor: $borderColorHover, // getCssVar('border-color-hover'),
  clearHoverColor: $textColor.secondary, // getCssVar('text-color-secondary'),
  focusBorderColor: $colors.primary.base, // getCssVar('color-primary'),
  width: '100%'
};

export const $inputDisabled = {
  fill: $disabled.bgColor,
  border: $disabled.borderColor,
  textColor: $disabled.textColor,
  placeholderColor: $textColor.placeholder
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
  large:
    $borderWidth +
    ' ' +
    (parseFloat($inputPaddingHorizontal.large.slice(0, -2)) -
      parseFloat($borderWidth.slice(0, -2))) +
    'px',
  default:
    $borderWidth +
    ' ' +
    (parseFloat($inputPaddingHorizontal.default.slice(0, -2)) -
      parseFloat($borderWidth.slice(0, -2))) +
    'px',
  small:
    $borderWidth +
    ' ' +
    (parseFloat($inputPaddingHorizontal.small.slice(0, -2)) -
      parseFloat($borderWidth.slice(0, -2))) +
    'px'
};

export const $inputTextColor = $textColor.primary;
export const $inputInnerHeight =
  parseFloat($commonComponentSize.default.slice(0, -2)) -
  parseFloat($borderWidth.slice(0, -2)) * 2 +
  'px';
