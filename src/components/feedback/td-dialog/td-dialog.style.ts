import { IStyle } from '@type-dom/css-type';
import {
  $bgColor,
  $borderRadius,
  $boxShadow,
  $fontLineHeightPrimary,
  $fontSizes,
  $textColor,
} from '../../../styles/var';
import { $message } from '../td-message/td-message.style';

export const $dialog = {
  width: '50%',
  marginTop: '15vh',
  // bgColor: getCssVar('bg-color'),
  bgColor: $bgColor.default,
  // boxShadow: getCssVar('box-shadow'),
  boxShadow: $boxShadow.default,
  // titleFontSize: getCssVar('font-size-large'),
  titleFontSize: $fontSizes.large,
  contentFontSize: '14px',
  // fontLineHeight: getCssVar('font-line-height-primary'),
  fontLineHeight: $fontLineHeightPrimary,
  paddingPrimary: '16px',
  // borderRadius: getCssVar('border-radius-small'),
  borderRadius: $borderRadius.small,
};

export const $dialogStyle: IStyle = {
  position: 'relative',
  // margin: var(#{getCssVarName('dialog-margin-top')}, 15vh) auto 50px,
  margin: $dialog.marginTop + ' auto 50px',
  // background: getCssVar('dialog', 'bg-color'),
  background: $dialog.bgColor,
  // borderRadius: getCssVar('dialog', 'border-radius'),
  borderRadius: $dialog.borderRadius,
  // boxShadow: getCssVar('dialog', 'box-shadow'),
  boxShadow: $dialog.boxShadow,
  boxSizing: 'border-box',
  // padding: getCssVar('dialog', 'padding-primary'),
  padding: $dialog.paddingPrimary,
  // width: var(#{getCssVarName('dialog-width')}, 50%),
  width: $dialog.width,
  overflowWrap: 'break-word',
};

export const $dialogHeaderStyle: IStyle = {
  paddingBottom: $dialog.paddingPrimary,
};

export const $dialogHeaderCloseStyle: IStyle = {
  paddingRight:
    'calc(' + $dialog.paddingPrimary + ' + ' + $message.closeSize + ')',
};

export const $dialogHeaderBtn: IStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  padding: 0,
  width: '48px',
  height: '48px',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  //   font-size: var(
  //   #{getCssVarName('message-close-size')},
  //   map.get($message, 'close-size')
  // );
  fontSize: $message.closeSize,
};

export const $dialogTitleStyle: IStyle = {
  // lineHeight: getCssVar('dialog-font-line-height'),
  lineHeight: $dialog.fontLineHeight,
  // fontSize: getCssVar('dialog-title-font-size'),
  fontSize: $dialog.titleFontSize,
  // color: getCssVar('text-color', 'primary'),
  color: $textColor.primary,
};

export const $dialogBodyStyle: IStyle = {
  // color: getCssVar('text-color', 'regular'),
  color: $textColor.regular,
  // font-size: getCssVar('dialog-content-font-size'),
  fontSize: $dialog.contentFontSize,
};

export const $dialogFooterStyle: IStyle = {
  paddingTop: $dialog.paddingPrimary,
  // padding-top: getCssVar('dialog', 'padding-primary'),
  textAlign: 'right',
  boxSizing: 'border-box',
};

export const $dialogOverlayStyle: IStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: 'auto',
};
