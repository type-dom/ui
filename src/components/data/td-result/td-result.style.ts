import { IStyle } from '@type-dom/css-type';
import {
  $colors,
  $fontSizes,
  $textColor,
  $types,
  IType
} from '../../../styles/var';

export const $result = {
  padding: ' 40px 30px',
  iconFontSize: '64px',
  titleFontSize: '20px',
  titleMarginTop: '20px',
  subtitleMarginTop: '10px',
  extraMarginTop: '30px'
};

export const $titleStyle: IStyle = {
  marginTop: $result.titleMarginTop
};

export const $titlePStyle: IStyle = {
  margin: 0,
  //   font-size: getCssVar('result-title-font-size'),
  fontSize: $result.titleFontSize,
  // color: getCssVar('text-color', 'primary'),
  color: $textColor.primary,
  lineHeight: 1.3
};

export const $subTitleStyle: IStyle = {
  marginTop: $result.subtitleMarginTop
};

export const $subTitlePStyle: IStyle = {
  margin: 0,
  // font-size: getCssVar('font-size', 'base'),
  fontSize: $fontSizes.base,
  // color: getCssVar('text-color', 'regular'),
  color: $textColor.regular,
  lineHeight: 1.3
};

export const $extraStyle: IStyle = {
  marginTop: $result.extraMarginTop
};

export const $icon = {} as Record<IType, IStyle>;
// export function userIcon() {
  for (const type of $types) {
    $icon[type] = {
      // resultColor: $colors[type],
      color: $colors[type].base
    };
  }
// }

