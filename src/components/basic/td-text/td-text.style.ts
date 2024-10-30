import { IStyle } from '@type-dom/css-type';
import {
  $fontSizeMap,
  $colors,
  $commonComponentSize,
  IType,
  $fontSizes
} from '../../../styles/var';

export const $baseText: Partial<IStyle> = {
  alignSelf: 'center',
  margin: '0',
  padding: '0',
  fontSize: $fontSizeMap.default,
  color: $colors.default.base,
  overflowWrap: 'break-word'
};

export const sizeOpts: Record<string, Partial<IStyle>> = {
  // mini: {
  //   height: $commonComponentSize.small,
  //   fontSize: $fontSizeMap.small,
  //   padding: $paddingVerticalMap.small + ' ' + $paddingHorizontalMap.small,
  // },
  small: {
    height: $commonComponentSize.small,
    fontSize: $fontSizes.extraSmall
  },
  default: {
    height: $commonComponentSize.default,
    fontSize: $fontSizes.base
  },
  large: {
    height: $commonComponentSize.large,
    fontSize: $fontSizes.medium
  }
};
export const $textStateColors: Record<string, any> = {};

export function buttonVariant($type: IType) {
  $textStateColors[$type] = {
    default: {
      color: $colors[$type].base
    },
    hover: {
      color:
        $type === 'default'
          ? $colors['primary'].base
          : $colors[$type]['light-3'] // ['color', $type, 'light-3'],
      // content: '',
      // position: 'absolute',
      // left: 0,
      // right: 0,
      // height: 0,
      // bottom: 0,
      // borderBottom: '1px solid ' + ($type === 'default' ? $colors['primary'].base : $colors[$type]['light-3']),
    },
    active: {
      color: $colors[$type]['dark-2'] // ['color', $type, 'dark-2'],
    },
    disabled: {
      color: $colors[$type]['light-5'] // ['color', $type, 'light-5'],
    }
  };
}

for (const $type of [
  'primary',
  'success',
  'warning',
  'info',
  'danger',
  'default'
]) {
  buttonVariant($type as IType);
}
