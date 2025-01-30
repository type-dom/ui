import { IStyle } from '@type-dom/css-type';
import { unref } from '@type-dom/signals';
import {
  $colors,
  $colorWhite,
  $fillColor,
  $textColor,
} from '../../../styles/var';
import { $buttonBorderRadius } from '../../basic/td-button/td-button.style';
import { $inputHeight } from '../../form/td-input/td-input.style';
import { SegmentedProps } from './td-segmented.interface';

export const $segmentedBorderRadius = {
  large: $buttonBorderRadius.large, // map.get($button-border-radius, 'large'),
  default: $buttonBorderRadius.default, // map.get($button-border-radius, 'default'),
  small: $buttonBorderRadius.small, // map.get($button-border-radius, 'small'),
};

export const $segmentedFontSize = {
  large: '16px',
  default: '14px',
  small: '14px',
};

export const $segmentedItemPadding = {
  large: '0 11px',
  default: '0 11px',
  small: '0 7px',
};

export const $segmented = {
  // 'color': getCssVar('text-color', 'regular'),
  color: $textColor.regular,
  // 'bg-color': getCssVar('fill-color', 'light'),
  bgColor: $fillColor.light,
  padding: '2px',
  // 'item-selected-color': getCssVar('color-white'),
  itemSelectedColor: $colorWhite,
  // 'item-selected-bg-color': getCssVar('color-primary'),
  itemSelectedBgColor: $colors.primary.base,
  // 'item-selected-disabled-bg-color': getCssVar('color-primary', 'light-5'),
  itemSelectedDisabledBgColor: $colors.primary['light-5'],
  // 'item-hover-color': getCssVar('text-color', 'primary'),
  itemHoverColor: $textColor.primary,
  // 'item-hover-bg-color': getCssVar('fill-color', 'dark'),
  itemHoverBgColor: $fillColor.dark,
  // 'item-active-bg-color': getCssVar('fill-color', 'darker'),
  itemActiveBgColor: $fillColor.darker,
  // 'item-disabled-color': getCssVar('text-color', 'placeholder'),
  itemDisabledColor: $textColor.placeholder,
};

export const $segmentedStyle: IStyle = {
  display: 'inline-flex',
  alignItems: 'stretch',
  // minHeight: map.get($input-height, 'default'),
  minHeight: $inputHeight.default,
  // background: getCssVar('segmented-bg-color'),
  background: $segmented.bgColor,
  // padding: getCssVar('segmented-padding'),
  padding: $segmented.padding,
  // border-radius: map.get($segmented-border-radius, 'default'),
  borderRadius: $segmentedBorderRadius.default,
  // font-size: map.get($segmented-font-size, 'default'),
  fontSize: $segmentedFontSize.default,
  // color: getCssVar('segmented-color'),
  color: $segmented.color,
  boxSizing: 'border-box',
};

export const $segmentedGroupStyle: IStyle = {
  display: 'flex',
  alignItems: 'stretch',
  position: 'relative',
  width: '100%',
};

export const $segmentedItemStyle: IStyle = {
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  cursor: 'pointer',
  // borderRadius: calc(#{map.get($segmented-border-radius, 'default')} - 2px),
  borderRadius: parseInt($segmentedBorderRadius.default, 10) - 2 + 'px',
  // padding: map.get($segmented-item-padding, 'default'),
  padding: $segmentedItemPadding.default,
};

export const $segmentedItemSelectedStyle: IStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  // background: getCssVar('segmented-item-selected-bg-color'),
  background: $segmented.itemSelectedBgColor,
  height: '100%',
  width: '10px',
  // border-radius: calc(#{map.get($segmented-border-radius, 'default')} - 2px),
  borderRadius: parseInt($segmentedBorderRadius.default, 10) - 2 + 'px',
  transition: 'all 0.3s',
  pointerEvents: 'none',
};

export const $segmentedItemInputStyle: IStyle = {
  position: 'absolute',
  margin: 0,
  width: 0,
  height: 0,
  opacity: 0,
  pointerEvents: 'none',
};

export const $segmentedItemLabelStyle: IStyle = {
  flex: 1,
  textAlign: 'center',
  lineHeight: 'normal',
  // @include utils-ellipsis,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  transition: 'color 0.3s',
  zIndex: 1,
};

export function useStyle(config?: SegmentedProps) {
  useSize(config);
  if (config?.block) {
    $segmentedStyle.display = 'flex';
    $segmentedItemStyle.minWidth = 0;
  } else {
    $segmentedStyle.display = 'inline-flex';
    delete $segmentedItemStyle.minWidth;
  }
  if (config?.disabled) {
    $segmentedItemSelectedStyle.background =
      $segmented.itemSelectedDisabledBgColor;
    $segmentedItemStyle.cursor = 'not-allowed';
    $segmentedItemStyle.color = $segmented.itemDisabledColor;
  } else {
    $segmentedItemSelectedStyle.background = $segmented.itemSelectedBgColor;
    $segmentedItemStyle.cursor = 'pointer';
    delete $segmentedItemStyle.color;
  }
  // if (config.focusVisible) {
  //
  // }
}

export function useSize(config?: SegmentedProps) {
  const size = unref(config?.size) || 'default';
  $segmentedStyle.minHeight = $inputHeight[size];
  $segmentedStyle.borderRadius = $segmentedBorderRadius[size];
  $segmentedStyle.fontSize = $segmentedFontSize[size];
  $segmentedItemSelectedStyle.borderRadius =
    parseInt($segmentedBorderRadius[size], 10) - 2 + 'px';
  $segmentedItemStyle.borderRadius =
    parseInt($segmentedBorderRadius[size]) - 2 + 'px';
  $segmentedItemStyle.padding = $segmentedItemPadding[size];
}
