// Empty
// css3 var in packages/theme-chalk/src/empty.scss

import { IStyle } from '@type-dom/css-type';
import { $colorWhite, $fontSizes, $svgMonochromeGrey, $textColor } from '../../../styles/var';

export const $empty = {
  padding: '40px 0',
  imageWidth: '160px',
  descriptionMarginTop: '20px',
  bottomMarginTop: '20px',
  'fill-color-0': $colorWhite,
  'fill-color-1': '#fcfcfd',
  'fill-color-2': '#f8f9fb',
  'fill-color-3': '#f7f8fc',
  'fill-color-4': '#eeeff3',
  'fill-color-5': '#edeef2',
  'fill-color-6': '#e9ebef',
  'fill-color-7': '#e5e7e9',
  'fill-color-8': '#e0e3e9',
  'fill-color-9': '#d5d7de',
};

export const $emptyStyle: IStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  boxSizing: 'border-box',
  padding: $empty.padding,
}

export const $emptyImageStyle: IStyle = {
  // width: getCssVar('empty-image-width');
  width: $empty.imageWidth,
}

export const $emptyImageImgStyle: IStyle = {
  userSelect: 'none',
  width: '100%',
  height: '100%',
  verticalAlign: 'top',
  objectFit: 'contain',
}

export const $emptyImageSvgStyle: IStyle = {
  // color: getCssVar('svg-monochrome-grey'),
  color: $svgMonochromeGrey,
  fill: 'currentColor',
  width: '100%',
  height: '100%',
  verticalAlign: 'top',
}

export const $emptyDescriptionStyle: IStyle = {
  // marginTop: getCssVar('empty-description-margin-top');
  marginTop: $empty.descriptionMarginTop,
}

export const $emptyDescriptionPStyle: IStyle = {
  margin: 0,
  // font-size: getCssVar('font-size', 'base');
  fontSize: $fontSizes.base,
  // color: getCssVar('text-color', 'secondary');
  color: $textColor.secondary,
}

export const $emptyBottomStyle: IStyle = {
  // margin-top: getCssVar('empty-bottom-margin-top');
  marginTop: $empty.bottomMarginTop,
}
