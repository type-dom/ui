// Select
import {
  $bgColor,
  $borderColor,
  $borderColorHover, $boxShadow,
  $colorPrimary,
  $colors,
  $disabled,
  $fillColor,
  $fontSizes,
  $textColor
} from '../../../styles/var';

export const $select = {
  // borderColorHover: getCssVar('border-color-hover'),
  borderColorHover: $borderColorHover,
  // disabledColor: getCssVar('disabled-text-color'),
  disabledColor: $disabled.textColor,
  // disabledBorder: getCssVar('disabled-border-color'),
  disabledBorder: $disabled.borderColor,
  // fontSize: getCssVar('font-size-base'),
  fontSize: $fontSizes.base,
  // closeHoverColor: getCssVar('text-color-secondary'),
  closeHoverColor: $textColor.secondary,
  // inputColor: getCssVar('text-color-placeholder'),
  inputColor: $textColor.placeholder,
  // multipleInputColor: getCssVar('text-color-regular'),
  // inputFocusBorderColor: getCssVar('color-primary'),
  inputFontSize: '14px',
  width: '100%',
}

export const $selectOption = {
  // textColor: getCssVar('text-color-regular'),
  textColor: $textColor.regular,
  // disabledColor: getCssVar('text-color-placeholder'),
  disabledColor: $textColor.placeholder,
  height: '34px',
  // hoverBackground: getCssVar('fill-color', 'light'),
  hoverBackground: $fillColor.light,
  // selectedTextColor': getCssVar('color-primary'),
  selectedTextColor: $colorPrimary,
}

export const $selectGroup = {
  // 'text-color': getCssVar('color-info'),
  textColor: $colors.info.base,
  height: '30px',
  fontSize: '12px',
}

export const $selectDropdown = {
  // bgColor: getCssVar('bg-color', 'overlay'),
  bgColor: $bgColor.overlay,
  // shadow: getCssVar('box-shadow-light'),
  shadow: $boxShadow.light,
  // emptyColor: getCssVar('text-color-secondary'),
  emptyColor: $textColor.secondary,
  maxHeight: '274px',
  padding: '6px 0',
  emptyPadding: '10px 0',
  headerPadding: '10px',
  footerPadding: '10px',
  // border: 1px solid getCssVar('border-color-light'),
  border: '1px solid ' + $borderColor.light,
}

export const $selectWrapperPadding = {
  large: '8px 16px',
  default: '4px 12px',
  small: '2px 8px',
}

export const $selectNearMarginLeft = {
  large: '-8px',
  default: '-8px',
  small: '-6px',
}

export const $selectItemGap = {
  large: '6px',
  default: '6px',
  small: '4px',
}

// the same height of el-tag
export const $selectItemHeight = {
  large: '24px',
  default: '24px',
  small: '20px',
}

