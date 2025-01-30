import {
  $bgColor,
  $borderColor,
  $boxShadow,
  $fontSizes,
  $textColor,
} from '../../../styles/var';
import { IStyle } from '@type-dom/css-type';

// Popover
// css3 var in packages/theme-chalk/src/popover.scss
export const $popover = {
  // bgColor': getCssVar('bg-color', 'overlay'),
  bgColor: $bgColor.overlay,
  // font-size': getCssVar('font-size-base'),
  fontSize: $fontSizes.base,
  // border-color': getCssVar('border-color-lighter'),
  borderColor: $borderColor.lighter,
  padding: '12px',
  paddingLarge: '18px 20px',
  titleFontSize: '16px',
  // title-text-color': getCssVar('text-color-primary'),
  titleTextColor: $textColor.primary,
  borderRadius: '4px',
};

export const $popoverPopperStyle: IStyle = {
  // background: getCssVar('popover-bg-color'),
  background: $popover.bgColor,
  minWidth: '150px',
  // borderRadius: getCssVar('popover-border-radius'),
  borderRadius: $popover.borderRadius,
  // border: 1px solid getCssVar('popover-border-color'),
  border: '1px solid ' + $popover.borderColor,
  // padding: getCssVar('popover-padding'),
  padding: $popover.padding,
  // z-index: getCssVar('index-popper'),
  zIndex: 1000,
  // color: getCssVar('text-color', 'regular'),
  color: $textColor.regular,
  lineHeight: 1.4,
  // font-size: getCssVar('popover-font-size'),
  fontSize: $popover.fontSize,
  // box-shadow: getCssVar('box-shadow-light'),
  boxShadow: $boxShadow.light,
  overflowWrap: 'break-word',
  boxSizing: 'border-box',
};

export const $popoverTitleStyle: IStyle = {
  // color: getCssVar('popover-title-text-color'),
  color: $popover.titleTextColor,
  // font-size: getCssVar('popover-title-font-size'),
  fontSize: $popover.titleFontSize,
  lineHeight: 1,
  marginBottom: '12px',
};
