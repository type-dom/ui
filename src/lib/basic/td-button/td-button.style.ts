import { IStyle, StyleCursor, StyleDisplay } from '@type-dom/framework';
import {
  $borderStyle,
  $borderWidth,
  $button,
  $borderRadiusMap,
  $fontSizeMap,
  $paddingHorizontalMap,
  $paddingVerticalMap,
  $colors,
  $colorWhite,
  $commonComponentSize,
  IType
} from '../../styles/var';

export const $buttonIconSpanGap = {
  large: '8px',
  default: '6px',
  small: '4px'
};

export const sizeOpts: Record<string, Partial<IStyle>> = {
  mini: {
    height: $commonComponentSize.small,
    fontSize: $fontSizeMap.small,
    padding: $paddingVerticalMap.small + ' ' + $paddingHorizontalMap.small,
    borderRadius: $borderRadiusMap.small
  },
  small: {
    height: $commonComponentSize.small,
    fontSize: $fontSizeMap.small,
    padding: $paddingVerticalMap.small + ' ' + $paddingHorizontalMap.small,
    borderRadius: $borderRadiusMap.small
  },
  middle: {
    height: $commonComponentSize.default,
    fontSize: $fontSizeMap.default,
    padding: $paddingVerticalMap.default + ' ' + $paddingHorizontalMap.default,
    borderRadius: $borderRadiusMap.default
  },
  large: {
    height: $commonComponentSize.large,
    fontSize: $fontSizeMap.large,
    padding: $paddingVerticalMap.large + ' ' + $paddingHorizontalMap.large,
    borderRadius: $borderRadiusMap.large
  }
};
export const tdButtonBase: Partial<IStyle> = {
  display: StyleDisplay.inlineFlex,
  justifyContent: 'center',
  alignItems: 'center',
  lineHeight: '1',
  // min-height will expand when in flex
  height: '32px',
  whiteSpace: 'nowrap',
  cursor: StyleCursor.pointer,
  color: $button.textColor,
  textAlign: 'center',
  boxSizing: 'border-box',
  outline: 'none',
  transition: '.1s',
  fontWeight: $button.fontWeight, // getCssVar('button', 'font-weight');
  userSelect: 'none',
  verticalAlign: 'middle',
  appearance: 'none',
  // '-webkit-appearance': 'none',
  backgroundColor: $button.bgColor, // getCssVar('button', 'bg-color');
  // border: $border, // getCssVar('border'),
  borderWidth: $borderWidth,
  borderStyle: $borderStyle,
  borderColor: $button.borderColor, // getCssVar('button', 'border-color');
  padding: '8px 15px'
};
export const $buttonStateColors: Record<string, Record<string, Partial<IStyle>>> = {};

export function buttonVariant($type: IType) {
  $buttonStateColors[$type] = {
    default: {
      color: $colorWhite,
      backgroundColor: $colors[$type].base,
      borderColor: $colors[$type].base,
      borderWidth: $borderWidth,
      outlineColor: $colors[$type]['light-5']
      // activeColor: $colors[$type]['dark-2'],
    },
    hover: {
      color: $colorWhite,
      // 'link-text-color': $colors[$type]['light-5'],
      backgroundColor: $colors[$type]['light-3'], // ['color', $type, 'light-3'],
      borderColor: $colors[$type]['light-3'] // ['color', $type, 'light-3'],
    },
    active: {
      backgroundColor: $colors[$type]['dark-2'], // ['color', $type, 'dark-2'],
      borderColor: $colors[$type]['dark-2'] // ['color', $type, 'dark-2'],
    },
    disabled: {
      color: $colorWhite,
      backgroundColor: $colors[$type]['light-5'], // ['color', $type, 'light-5'],
      borderColor: $colors[$type]['light-5'] // ['color', $type, 'light-5'],
    }
  };
  // for (const $type1 in $buttonColorTypes) {
  //   console.log('$type1 is ', $type1);
  //   const $typeMap = $buttonColorTypes[$type1];
  //   console.log('$typeMap is ', $typeMap);
  //   for (const $typeColor in $typeMap) {
  //     console.log('$typeColor is ', $typeColor);
  //     const $list = $typeMap[$typeColor];
  //     console.log('$list is ', $list);
  //     // cssVarFromGlobal(('button', $type, $typeColor), $list);
  //   }
  // }
  // @each $type, $typeMap in $buttonColorTypes {
  //   @each $typeColor, $list in $typeMap {
  //     @include css-var-from-global(('button', $type, $typeColor), $list);
  //   }
  // }

// &.is-plain,
// &.is-text,
// &.is-link {
//   @include button-plain($type);
// }
}

for (const $type of ['default', 'primary', 'success', 'warning', 'danger', 'info']) {
// @include m($type) {
//   @include button-variant($type);
//   }
  buttonVariant($type as IType);
}

export const $buttonPlainColors: Record<string, Record<string, Partial<IStyle>>> = {};

export function buttonPlain($type: IType) {
  $buttonPlainColors[$type] = {
    default: {
      color: $colors[$type].base,
      backgroundColor: $colors[$type]['light-9'],
      borderColor: $colors[$type]['light-5'],
      borderWidth: $borderWidth
    },
    hover: {
      color: $colorWhite,
      backgroundColor: $colors[$type].base,
      borderColor: $colors[$type].base
    },
    active: {
      color: $colorWhite
    },
    disabled: {
      color: $colors[$type].base,
      backgroundColor: $colors[$type]['light-9'], // ['color', $type, 'light-5'],
      borderColor: $colors[$type]['light-5'] // ['color', $type, 'light-5'],
    }
  };
}

for (const $type of ['default', 'primary', 'success', 'warning', 'danger', 'info']) {
  buttonPlain($type as IType);
}
