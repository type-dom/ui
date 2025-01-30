import { IStyle } from '@type-dom/css-type';
import {
  $bgColor,
  $boxShadow,
  $colors,
  $fontLineHeightPrimary,
  $fontSizes,
  $textColor,
} from '../../../styles/var';
import { $message } from '../td-message/td-message.style';
import {
  MessageBoxProps,
  TdMessageBoxOptions,
} from './td-message-box.interface';

export const $messageBox = {
  // 'title-color': getCssVar('text-color-primary'),
  titleColor: $textColor.primary,
  width: '420px',
  borderRadius: '4px',
  // 'box-shadow': getCssVar('box-shadow'),
  boxShadow: $boxShadow,
  // 'font-size': getCssVar('font-size-large'),
  fontSize: $fontSizes.large,
  // 'content-font-size': getCssVar('font-size-base'),
  contentFontSize: $fontSizes.base,
  // 'content-color': getCssVar('text-color-regular'),
  contentColor: $textColor.regular,
  errorFontSize: '12px',
  paddingPrimary: '12px',
  // 'font-line-height': getCssVar('font-line-height-primary'),
  fontLineHeight: $fontLineHeightPrimary,
};

export const $messageBoxStyle: IStyle = {
  display: 'inline-block',
  position: 'relative',
  // max-width: getCssVar('messagebox-width'),
  maxWidth: $messageBox.width,
  width: '100%',
  // padding: getCssVar('messagebox-padding-primary'),
  padding: $messageBox.paddingPrimary,
  verticalAlign: 'middle',
  // background-color: getCssVar('bg-color'),
  backgroundColor: $bgColor.default,
  // border-radius: getCssVar('messagebox-border-radius'),
  borderRadius: $messageBox.borderRadius,
  // font-size: getCssVar('messagebox-font-size'),
  fontSize: $messageBox.fontSize,
  // box-shadow: getCssVar('messagebox-box-shadow'),
  boxShadow: $messageBox.boxShadow.default,
  textAlign: 'left',
  overflow: 'hidden',
  backfaceVisibility: 'hidden',
  // To avoid small screen overflowing, see #1191,
  boxSizing: 'border-box',
  overflowWrap: 'break-word',
};

export const $messageBoxOverlayStyle: IStyle = {
  textAlign: 'center',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  padding: '16px',
  overflow: 'auto',
};

export const $messageBoxHeaderStyle: IStyle = {
  // paddingBottom: getCssVar('messagebox-padding-primary');
  paddingBottom: $messageBox.paddingPrimary,
};

const $messageCloseSize = $message.closeSize;
export const $messageBoxHeaderCloseStyle: IStyle = {
  //   padding-right: calc(
  //   getCssVar('messagebox-padding-primary') +
  // var(
  //   #{getCssVarName('message-close-size')},
  //   map.get($message, 'close-size')
  // )
  paddingRight:
    parseInt($messageBox.paddingPrimary) + parseInt($message.closeSize) + 'px',
};

export const $messageBoxTitleStyle: IStyle = {
  //   font-size: getCssVar('messagebox-font-size');
  fontSize: $messageBox.fontSize,
  // line-height: getCssVar('messagebox-font-line-height');
  lineHeight: $messageBox.fontLineHeight,
  // color: getCssVar('messagebox-title-color');
  color: $messageBox.titleColor,
};

export const $messageBoxHeaderBtnStyle: IStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  padding: 0,
  width: '40px',
  height: '40px',
  border: 'none',
  outline: 'none',
  background: 'transparent',
  // font-size: var(
  //   #{getCssVarName('message-close-size')},
  //   map.get($message, 'close-size')
  // );
  fontSize: $message.closeSize,
  cursor: 'pointer',
};

export const $messageBoxContentStyle: IStyle = {
  // color: getCssVar('messagebox-content-color');
  color: $messageBox.contentColor,
  // font-size: getCssVar('messagebox-content-font-size');
  fontSize: $messageBox.contentFontSize,
};

export const $messageBoxContainerStyle: IStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

export const $messageBoxInputStyle: IStyle = {
  paddingTop: '12px',
};

export const $messageBoxStatusStyle: IStyle = {
  fontSize: '24px',
};

export const $messageBoxMessageStyle: IStyle = {
  margin: 0,
};

export const $messageBoxMessagePStyle: IStyle = {
  margin: 0,
  // line-height: getCssVar('messagebox-font-line-height');
  lineHeight: $messageBox.fontLineHeight,
};

export const $messageBoxErrorMsgStyle: IStyle = {
  //   color: getCssVar('color-error');
  color: $colors.error.base,
  //   font-size: getCssVar('messagebox-error-font-size');
  fontSize: $messageBox.errorFontSize,
  // line-height: getCssVar('messagebox-font-line-height');
  lineHeight: $messageBox.fontLineHeight,
};

export const $messageBoxBtnsStyle: IStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  alignItems: 'center',
  // padding-top: getCssVar('messagebox-padding-primary'),
  paddingTop: $messageBox.paddingPrimary,
};

export function useStyle(config?: TdMessageBoxOptions) {
  useType(config);
  const draggable = config?.draggable || false;
  if (draggable) {
    $messageBoxHeaderStyle.cursor = 'move';
    $messageBoxHeaderStyle.userSelect = 'none';
  }
  if (config?.showClose !== false) {
    $messageBoxHeaderCloseStyle.display = 'block';
    //   $messageBoxHeaderStyle.paddingRight =  calc(
    //     getCssVar('messagebox-padding-primary') +
    //   var(
    //     #{getCssVarName('message-close-size')},
    //     map.get($message, 'close-size')
    // )
    // );
    $messageBoxHeaderStyle.paddingRight =
      parseInt($messageBox.paddingPrimary) + parseInt($messageCloseSize) + 'px';
  }
  if (config?.center) {
    $messageBoxTitleStyle.display = 'flex';
    $messageBoxTitleStyle.alignItems = 'center';
    $messageBoxTitleStyle.justifyContent = 'center';
    $messageBoxTitleStyle.gap = '6px';

    $messageBoxStatusStyle.fontSize = 'inherit';
    $messageBoxBtnsStyle.justifyContent = 'center';
    $messageBoxContainerStyle.justifyContent = 'center';
  } else {
    delete $messageBoxTitleStyle.display;
    delete $messageBoxTitleStyle.alignItems;
    delete $messageBoxTitleStyle.justifyContent;
    delete $messageBoxTitleStyle.gap;
    $messageBoxStatusStyle.fontSize = '24px';
    $messageBoxBtnsStyle.justifyContent = 'flex-end';
    delete $messageBoxContainerStyle.justifyContent;
  }
}

export function useType(config?: TdMessageBoxOptions) {
  const type = config?.type || 'info';
  const $messageBoxColor = $colors[type].base;
  // $messageBoxIconStyle.color = $messageBoxColor;
  $messageBoxStatusStyle.color = $messageBoxColor;
}
