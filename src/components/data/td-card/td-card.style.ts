import { IStyle } from '@type-dom/css-type';
import { $borderColor, $fillColor, $textColor } from '../../../styles/var';
import { $transitionDuration } from '../../../styles/transition';

export const $card = {
  // 'border-color': getCssVar('border-color', 'light'),
  borderColor: $borderColor.light,
  borderRadius: '4px',
  padding: '20px',
  // 'bg-color': getCssVar('fill-color', 'blank'),
  bgColor: $fillColor.blank,
};

export const $cardStyle: IStyle = {
  //   border-radius: getCssVar('card', 'border-radius'),
  borderRadius: $card.borderRadius,
  // border: 1px solid getCssVar('card', 'border-color'),
  border: '1px solid ' + $card.borderColor,
  // background-color: getCssVar('card', 'bg-color'),
  backgroundColor: $card.bgColor,
  overflow: 'hidden',
  // color: getCssVar('text-color', 'primary'),
  color: $textColor.primary,
  // transition: getCssVar('transition-duration'),
  transition: $transitionDuration.default,
};

export const $cardHeaderStyle: IStyle = {
  // padding: calc(#{getCssVar('card', 'padding')} - 2px) getCssVar('card', 'padding'),
  padding: `calc(${$card.padding} - 2px) ${$card.padding}`,
  // border-bottom: 1px solid getCssVar('card', 'border-color'),
  borderBottom: '1px solid ' + $card.borderColor,
  // box-sizing: border-box,
  boxSizing: 'border-box',
};

export const $cardFooterStyle: IStyle = {
  //     padding: calc(#{getCssVar('card', 'padding')} - 2px)
  // getCssVar('card', 'padding'),
  padding: `calc(${$card.padding} - 2px) ${$card.padding}`,
  // border-top: 1px solid getCssVar('card', 'border-color'),
  borderTop: '1px solid ' + $card.borderColor,
  // box-sizing: border-box,
  boxSizing: 'border-box',
};
