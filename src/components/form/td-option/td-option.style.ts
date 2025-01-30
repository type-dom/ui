import { IStyle } from '@type-dom/css-type';
import { $colors, $fillColor, $textColor } from '../../../styles/var';
import { $select } from '../td-select/td-select.style';

export const $selectOption = {
  // 'text-color': getCssVar('text-color-regular'),
  textColor: $textColor.regular,
  // 'disabled-color': getCssVar('text-color-placeholder'),
  disabledColor: $textColor.placeholder,
  height: '34px',
  // 'hover-background': getCssVar('fill-color', 'light'),
  hoverBackground: $fillColor.light,
  // 'selected-text-color': getCssVar('color-primary'),
  selectedTextColor: $colors.primary.base,
};

export const $checkedIcon =
  "data:image/svg+xml;utf8,%3Csvg class='icon' width='200' height='200' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='currentColor' d='M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.592 706.944z'%3E%3C/path%3E%3C/svg%3E";

export const checkedIconStyle: IStyle = {
  content: '',
  position: 'absolute',
  top: '50%',
  right: '20px',
  borderTop: 'none',
  borderRight: 'none',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  // backgroundColor: map.get($select-option, 'selected-text-color'),
  backgroundColor: $selectOption.selectedTextColor,
  mask: 'url(#' + $checkedIcon + ') no-repeat',
  maskSize: '100% 100%',
  '-webkit-mask': 'url(#' + $checkedIcon + ') no-repeat',
  '-webkit-mask-size': '100% 100%',
  transform: 'translateY(-50%)',
  width: '12px',
  height: '12px',
};

export const $selectDropdownItemStyle: IStyle = {
  // font-size: map.get($select, 'font-size'),
  fontSize: $select.fontSize,
  // 20 as the padding of option item, 12 as the size of ✓ icon siz,
  padding: '0 32px 0 20px',
  position: 'relative',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  // color: map.get($select-option, 'text-color'),
  color: $selectOption.textColor,
  // height: map.get($select-option, 'height'),
  height: $selectOption.height,
  // line-height: map.get($select-option, 'height'),
  lineHeight: $selectOption.height,
  boxSizing: 'border-box',
  cursor: 'pointer',
};


//     @include when(hovering) {
//       background-color: map.get($select-option, 'hover-background');
//     }
//
//     @include when(selected) {
//       color: map.get($select-option, 'selected-text-color');
//       font-weight: bold;
//     }
//
//     @include when(disabled) {
//       color: map.get($select-option, 'disabled-color');
//       cursor: not-allowed;
//       background-color: unset;
//     }
//   }
//
//   @include when(multiple) {
//     .#{$namespace}-select-dropdown__item.is-selected {
//       &::after {
//         @include checked-icon;
//       }
//     }
//
//     .#{$namespace}-select-dropdown__item.is-disabled {
//       &::after {
//         background-color: map.get($select-option, 'disabled-color');
//       }
//     }
//   }
// }
