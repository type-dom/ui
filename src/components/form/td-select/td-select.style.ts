// Select
import {
  $bgColor,
  $borderColor,
  $borderColorHover, $borderRadius,
  $boxShadow,
  $colorPrimary,
  $colors,
  $disabled,
  $fillColor,
  $fontSizes,
  $textColor
} from '../../../styles/var';
import { IStyle } from '@type-dom/css-type';
import { $input, $inputFontSize, $inputHeight } from '../td-input/td-input.style';
import { $transition, $transitionDuration } from '../../../styles/transition';
import { ITdSelectConfig } from './td-select.interface.plus';

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
  multipleInputColor: $textColor.regular,
  // inputFocusBorderColor: getCssVar('color-primary'),
  inputFocusBorderColor: $colorPrimary,
  inputFontSize: '14px',
  width: '100%'
};

export const $selectOption = {
  // textColor: getCssVar('text-color-regular'),
  textColor: $textColor.regular,
  // disabledColor: getCssVar('text-color-placeholder'),
  disabledColor: $textColor.placeholder,
  height: '34px',
  // hoverBackground: getCssVar('fill-color', 'light'),
  hoverBackground: $fillColor.light,
  // selectedTextColor': getCssVar('color-primary'),
  selectedTextColor: $colorPrimary
};

export const $selectGroup = {
  // 'text-color': getCssVar('color-info'),
  textColor: $colors.info.base,
  height: '30px',
  fontSize: '12px'
};

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
  border: '1px solid ' + $borderColor.light
};

export const $selectWrapperPadding = {
  large: '8px 16px',
  default: '4px 12px',
  small: '2px 8px'
};

export const $selectNearMarginLeft = {
  large: '-8px',
  default: '-8px',
  small: '-6px'
};

export const $selectItemGap = {
  large: '6px',
  default: '6px',
  small: '4px'
};

// the same height of el-tag
export const $selectItemHeight = {
  large: '24px',
  default: '24px',
  small: '20px'
};

export const $selectStyle: IStyle = {
  display: 'inline-block',
  position: 'relative',
  verticalAlign: 'middle',
// width: getCssVar('select-width'),
  width: $select.width
};

export function mixInputBorder($color: string) {
  return {
    boxShadow: '0 0 0 1px ' + $color + 'inset'
  };
}

export const $selectWrapperStyle: IStyle = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  boxSizing: 'border-box',
  cursor: 'pointer',
  textAlign: 'left',
// font-size: map.get($input-font-size, 'default'),
  fontSize: $inputFontSize.default,
// padding: map.get($select-wrapper-padding, 'default'),
  padding: $selectWrapperPadding.default,
// gap: map.get($select-item-gap, 'default'),
  gap: $selectItemGap.default,
// min-height: map.get($input-height, 'default'),
  minHeight: $inputHeight.default,
// line-height: map.get($select-item-height, 'default'),
  lineHeight: $selectItemHeight.default,
// border-radius: getCssVar('border-radius-base'),
  borderRadius: $borderRadius.base,
// background-color: getCssVar('fill-color', 'blank'),
  backgroundColor: $fillColor.blank,
// transition: getCssVar('transition', 'duration'),
  transition: $transitionDuration.default,
  transform: 'translate3d(0, 0, 0)',
  // @include mixed-input-border(#{getCssVar('border-color')});
  ...mixInputBorder($borderColor.base)
};

export const $selectPrefixStyle: IStyle = {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
// gap: map.get($select-item-gap, 'default'),
  gap: $selectItemGap.default,
// color: var(
//   #{getCssVarName('input-icon-color')},
//   map.get($input, 'icon-color')
// );
  color: $input.iconColor
};

export const $selectSuffixStyle: IStyle = {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
// gap: map.get($select-item-gap, 'default'),
  gap: $selectItemGap.default,
// color: var(
//   #{getCssVarName('input-icon-color')},
//   map.get($input, 'icon-color')
// );
  color: $input.iconColor
};

export const $selectCaretStyle: IStyle = {
//   color: getCssVar('select-input-color'),
  color: $select.inputColor,
//   font-size: getCssVar('select-input-font-size'),
  fontSize: $select.inputFontSize,
// transition: getCssVar('transition', 'duration'),
  transition: $transitionDuration.default,
  transform: 'rotateZ(0deg)',
  cursor: 'pointer'
};

export const $selectSelectionStyle: IStyle = {
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  flex: 1,
  minWidth: 0,
// gap: map.get($select-item-gap, 'default'),
  gap: $selectItemGap.default
};

export const $selectedItemStyle: IStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  userSelect: 'none'
};

export const $selectTagTextStyle: IStyle = {
  display: 'block',
  lineHeight: 'normal',
// @include utils-ellipsis,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

export const $selectPlaceholderStyle: IStyle = {
  position: 'absolute',
  display: 'block',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '100%',
//    @include utils-ellipsis;
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
//    color: var(
//      #{getCssVarName('input-text-color')},
//      map.get($input, 'text-color')
// );
  color: $input.textColor
};

export const $selectPopperStyle: IStyle = {
  // @include picker-popper(
  //   map.get($select-dropdown, 'bg-color'),
  //   map.get($select-dropdown, 'border'),
  //   map.get($select-dropdown, 'shadow')
  // );
  backgroundColor: $selectDropdown.bgColor,
  border: $selectDropdown.border,
  boxShadow: $selectDropdown.shadow
};

export const $selectInputWrapperStyle: IStyle = {
  maxWidth: '100%'
};

export const $selectInputStyle: IStyle = {
  border: 'none',
  outline: 'none',
  padding: 0,
  // color: getCssVar('select-multiple-input-color'),
  color: $select.multipleInputColor,
  fontSize: 'inherit',
  fontFamily: 'inherit',
  appearance: 'none',
// height: map.get($select-item-height, 'default'),
  height: $selectItemHeight.default,
  maxWidth: '100%',
  backgroundColor: 'transparent'
};

export const $selectInputCalculatorStyle: IStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  maxWidth: '100%',
  visibility: 'hidden',
  whiteSpace: 'pre',
  overflow: 'hidden'
};

export function useSelectStyle(params: ITdSelectConfig) {
  useSize(params);
}

export function useSize(params: ITdSelectConfig) {
  const size = params.size || 'default';
  $selectWrapperStyle.gap = $selectItemGap[size];
  $selectWrapperStyle.padding = $selectWrapperPadding[size];
  $selectWrapperStyle.minHeight = $selectItemHeight[size];
  $selectWrapperStyle.lineHeight = $selectItemHeight[size];
  $selectWrapperStyle.fontSize = $inputFontSize[size];
  $selectSelectionStyle.gap = $selectItemGap[size];

  $selectPrefixStyle.gap = $selectItemGap[size];

  $selectSuffixStyle.gap = $selectItemGap[size];

  $selectInputStyle.height = $selectItemHeight[size];
}

