import { IStyle } from '@type-dom/css-type';

import {
  $bgColor,
  $borderColor,
  $boxShadow, $colors,
  $fontSizes,
  $textColor,
  $transitionDurationDefault
} from '../../../styles/var';
import { $message } from '../td-message/td-message.style';
import { ITdNotificationConfig } from './td-notification.interface';

export const $messageCloseSize = $message.closeSize;

export const $notification = {
  width: '330px',
  padding: '14px 26px 14px 13px',
  radius: '8px',
  // shadow: getCssVar(box-shadow-light),
  shadow: $boxShadow.light,
  // border-color: getCssVar(border-color-lighter),
  borderColor: $borderColor.lighter,
  iconSize: '24px',
  //   close-font-size: var(
  //     #{getCssVarName(message-close-size)},
  //     map.get($message, close-size)
  // ),
  closeFontSize: $messageCloseSize,
  groupMarginLeft: '13px',
  groupMarginRight: '8px',
  // content-font-size: getCssVar(font-size-base),
  contentFontSize: $fontSizes.base,
  // content-color: getCssVar(text-color-regular),
  contentColor: $textColor.regular,
  titleFontSize: '16px',
  // title-color: getCssVar(text-color-primary),
  titleColor: $textColor.regular,
  // close-color: getCssVar(text-color-secondary),
  closeColor: $textColor.secondary,
  // close-hover-color: getCssVar(text-color-regular),
  closeHoverColor: $textColor.regular,
};

export const $notificationStyle: IStyle = {
  display: 'flex',
  // width: getCssVar('notification-width'),
  width: $notification.width,
  // padding: getCssVar('notification-padding'),
  padding: $notification.padding,
  // border-radius: getCssVar('notification-radius'),
  borderRadius: $notification.radius,
  boxSizing: 'border-box',
  // border: 1px solid getCssVar('notification-border-color'),
  border: `1px solid ${$notification.borderColor}`,
  position: 'fixed',
  // background-color: getCssVar('bg-color', 'overlay'),
  backgroundColor: $bgColor.overlay,
  // box-shadow: getCssVar('notification-shadow'),
  boxShadow: $notification.shadow,
  // transition: opacity getCssVar('transition-duration'),
  transition:
    'opacity ' +
    $transitionDurationDefault +
    ', ' +
    //   transform getCssVar('transition-duration'),
    'transform ' +
    $transitionDurationDefault +
    ', ' +
    //   top getCssVar('transition-duration'),
    'top ' +
    $transitionDurationDefault +
    ', ' +
    //   left getCssVar('transition-duration'),
    'left ' +
    $transitionDurationDefault +
    ', ' +
    //   right getCssVar('transition-duration'), top 0.4s,
    'right ' +
    $transitionDurationDefault +
    ', ' +
    //   bottom getCssVar('transition-duration'),
    'bottom ' +
    $transitionDurationDefault +
    ', ',
  overflowWrap: 'break-word',
  overflow: 'hidden',
  zIndex: 9999,
};

export const $notificationGroupStyle: IStyle = {
//   margin-left: getCssVar('notification-group-margin-left');
  marginLeft: $notification.groupMarginLeft,
// margin-right: getCssVar('notification-group-margin-right');
  marginRight: $notification.groupMarginRight,
};

export const $notificationTitleStyle: IStyle = {
  fontWeight: 'bold',
// font-size: getCssVar('notification-title-font-size'),
  fontSize: $notification.titleFontSize,
// line-height: getCssVar('notification-icon-size'),
  lineHeight: $notification.iconSize,
// color: getCssVar('notification-title-color'),
  color: $notification.titleColor,
  margin: 0,
}

export const $notificationContentStyle: IStyle = {
  // font-size: getCssVar('notification-content-font-size'),
  fontSize: $notification.contentFontSize,
  lineHeight: '24px',
  margin: '6px 0 0',
  // color: getCssVar('notification-content-color'),
  color: $notification.contentColor,
}

export const $notificationIconStyle: IStyle = {
  // height: getCssVar('notification-icon-size'),
  height: $notification.iconSize,
  // width: getCssVar('notification-icon-size'),
  width: $notification.iconSize,
  // font-size: getCssVar('notification-icon-size'),
  fontSize: $notification.iconSize,
}

export const $notificationCloseBtnStyle: IStyle = {
  position: 'absolute',
  top: '18px',
  right: '15px',
  cursor: 'pointer',
  // color: getCssVar('notification-close-color'),
  color: $notification.closeColor,
  // font-size: getCssVar('notification-close-font-size'),
  fontSize: $notification.closeFontSize,
}

export function useStyle(config?: ITdNotificationConfig) {
  useType(config);
}
export function useType(config?: ITdNotificationConfig) {
// @each $type in (success, info, warning, error) {
//   & .#{$namespace}-notification--#{$type} {
//     @include css-var-from-global(
//         ('notification', 'icon-color'),
//         ('color', $type)
//       );
//       color: getCssVar('notification-icon-color');
//     }
//   }
  const $notificationIconColor = $colors[config?.type || 'info'].base;
  $notificationStyle.color = $notificationIconColor
}
