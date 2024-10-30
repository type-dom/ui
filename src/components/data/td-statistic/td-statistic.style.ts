import { Property } from '@type-dom/css-type';
import { $fontSizes, $textColor } from '../../../styles/var';

export const $statistic = {
  titleFontWeight: 400 as Property.FontWeight,
  // titleFontSize: getCssVar('font-size', 'extra-small'),
  titleFontSize: $fontSizes.extraSmall,
  // titleColor: getCssVar('text-color', 'regular'),
  titleColor: $textColor.regular,
  contentFontWeight: 400 as Property.FontWeight,
  // contentFontSize: getCssVar('font-size', 'extra-large'),
  contentFontSize: $fontSizes.extraLarge,
  // contentColor: getCssVar('text-color', 'primary'),
  contentColor: $textColor.primary
};
