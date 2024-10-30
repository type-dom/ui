import { IStyle } from '@type-dom/css-type';
import { $borderColor, $fillColor } from '../../../styles/var';

export const $card = {
  // 'border-color': getCssVar('border-color', 'light'),
  borderColor: $borderColor.light,
  borderRadius: '4px',
  padding: '20px',
  // 'bg-color': getCssVar('fill-color', 'blank'),
  bgColor: $fillColor.blank
};

export const $cardHeader: IStyle = {
  // padding: calc(#{getCssVar('card', 'padding')} - 2px) getCssVar('card', 'padding'),
  padding: `calc(${$card.padding} - 2px) ${$card.padding}`,
  // border-bottom: 1px solid getCssVar('card', 'border-color'),
  borderBottom: '1px solid ' + $card.borderColor,
  // box-sizing: border-box,
  boxSizing: 'border-box'
};

export const $cardFooter: IStyle = {
  //     padding: calc(#{getCssVar('card', 'padding')} - 2px)
  // getCssVar('card', 'padding'),
  padding: `calc(${$card.padding} - 2px) ${$card.padding}`,
  // border-top: 1px solid getCssVar('card', 'border-color'),
  borderTop: '1px solid ' + $card.borderColor,
  // box-sizing: border-box,
  boxSizing: 'border-box'
};
