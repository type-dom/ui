import { IStyle } from '@type-dom/css-type';
import {
  $bgColor,
  $borderColor,
  $borderRadius,
  $borderStyle,
  $borderWidth,
  $boxShadow,
  $colors,
  $textColor,
} from '../../../styles/var';
import { IMessageType, MessageProps } from './td-message.interface';

export const $message = {
  // bgColor: getCssVar('color', 'info', 'light-9'),
  bgColor: $colors.info['light-9'],
  // borderColor: getCssVar('border-color-lighter'),
  borderColor: $borderColor.lighter,
  padding: '11px 15px',
  closeSize: '16px',
  // closeIconColor: getCssVar('text-color-placeholder'),
  closeIconColor: $textColor.placeholder,
  // closeHoverColor: getCssVar('text-color-secondary'),
  closeHoverColor: $textColor.secondary,
};

export const $messageStyle: IStyle = {
  width: 'fit-content',
  maxWidth: 'calc(100% - 32px)',
  boxSizing: 'border-box',
  // border-radius: getCssVar('border-radius-base'),
  borderRadius: $borderRadius.base,
  // border-width: getCssVar('border-width'),
  borderWidth: $borderWidth,
  // border-style: getCssVar('border-style'),
  borderStyle: $borderStyle,
  // border-color: getCssVar('message', 'border-color'),
  borderColor: $message.borderColor,
  position: 'fixed',
  left: '50%',
  top: '20px',
  transform: 'translateX(-50%)',
  // background-color: getCssVar('message', 'bg-color'),
  backgroundColor: $message.bgColor,
  // transition: opacity getCssVar('transition-duration'), transform 0.4s, top 0.4s,
  transition: 'opacity 0.3s, transform 0.4s, top 0.4s',
  // padding: getCssVar('message', 'padding'),
  padding: $message.padding,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  zIndex: 99999,
};

export const $messageContentStyle: IStyle = {
  padding: 0,
  fontSize: '14px',
  lineHeight: 1,
  margin: 0, // add by me  P 标签默认有 margin
};

export const $messageBadgeStyle: IStyle = {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
};

export const $messageCloseBtnStyle: IStyle = {
  cursor: 'pointer',
  // color: getCssVar('message', 'close-icon-color'),
  color: $message.closeIconColor,
  // font-size: getCssVar('message', 'close-size'),
  fontSize: $message.closeSize,
};

export function useMessageStyle(config?: MessageProps) {
  if (config?.center) {
    $messageStyle.justifyContent = 'center';
  }
  useMessageType(config);
  if (config?.plain) {
    // background-color: getCssVar('bg-color', 'overlay');
    $messageStyle.backgroundColor = $bgColor.overlay;
    // border-color: getCssVar('bg-color', 'overlay');
    $messageStyle.borderColor = $bgColor.overlay;
    // box-shadow: getCssVar('box-shadow-light');
    $messageStyle.boxShadow = $boxShadow.light;
  } else {
    $messageStyle.backgroundColor = $message.bgColor;
    $messageStyle.borderColor = $message.borderColor;
    $messageStyle.boxShadow = undefined;
  }
}

export const $messageIconStyle: IStyle = {};

export function useMessageType(config?: MessageProps) {
  const type: IMessageType = config?.type || 'info';
  //    @include css-var-from-global(
  //         ('message', 'bg-color'),
  //         ('color', $type, 'light-9')
  //       );
  $message.bgColor = $colors[type]['light-9'];
  //       @include css-var-from-global(
  //         ('message', 'border-color'),
  //         ('color', $type, 'light-8')
  //       );
  $message.borderColor = $colors[type]['light-8'];
  //       @include css-var-from-global(('message', 'text-color'), ('color', $type));

  const $messageTextColor = $colors[type].base;
  //  .#{$namespace}-message__content {
  //         color: getCssVar('message', 'text-color');
  //         overflow-wrap: break-word;
  //       }
  $messageContentStyle.color = $messageTextColor;
  $messageContentStyle.overflowWrap = 'break-word';
  $messageIconStyle.color = $messageTextColor;
}
