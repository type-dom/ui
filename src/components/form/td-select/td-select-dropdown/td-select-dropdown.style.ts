import { $borderRadius } from '@type-dom/ui';
import { IStyle } from '@type-dom/css-type';
import { $select, $selectDropdown } from '../td-select.style';

export const $selectDropdownStyle: IStyle = {
  // zIndex: calc(#{getCssVar('index-top')} + 1),
  zIndex: 'calc(index-top + 1)',
  // border-radius: getCssVar('border-radius-base'),
  borderRadius: $borderRadius.base,
  boxSizing: 'border-box',
  // {
  //   .#{$namespace}-scrollbar.is-empty .#{$namespace}-select-dropdown__list {
  //     padding: 0;
  //   }
  // }
};

export const $selectDropdownLoading: IStyle = {
  // padding: map.get($select-dropdown, 'empty-padding'),
  padding: $selectDropdown.emptyPadding,
  margin: 0,
  textAlign: 'center',
  // color: map.get($select-dropdown, 'empty-color'),
  color: $selectDropdown.emptyColor,
  // font-size: getCssVar('select-font-size'),
  fontSize: $select.fontSize,
};

export const $selectDropdownEmptyStyle: IStyle = {
  // padding: map.get($selectDropdown, 'empty-padding'),
  padding: $selectDropdown.emptyPadding,
  margin: 0,
  textAlign: 'center',
  // color: map.get($selectDropdown, 'empty-color'),
  color: $selectDropdown.emptyColor,
  // font-size: getCssVar('select-font-size'),
  fontSize: $select.fontSize,
};

export const $selectDropdownWrapStyle: IStyle = {
  // max-height: map.get($selectDropdown, 'max-height')
  maxHeight: $selectDropdown.maxHeight,
};

export const $selectDropdownListStyle: IStyle = {
  listStyle: 'none',
  // padding: map.get($selectDropdown, 'padding'),
  padding: $selectDropdown.padding,
  margin: 0,
  boxSizing: 'border-box',

  // &.#{$namespace}-vl__window {
  //   // for select-v2
  //   margin: map.get($selectDropdown, 'padding');
  //   padding: 0;
  // }
};

export const $selectDropdownHeaderStyle: IStyle = {
  // padding: map.get($selectDropdown, 'header-padding'),
  padding: $selectDropdown.headerPadding,
  // border-bottom: map.get($selectDropdown, 'border'),
  borderBottom: $selectDropdown.border,
};

export const $selectDropdownFooterStyle = {
  // padding: map.get($selectDropdown, 'footer-padding');
  padding: $selectDropdown.footerPadding,
  // border-top: map.get($selectDropdown, 'border');
  borderTop: $selectDropdown.border,
};
