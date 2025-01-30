import { IStyle } from '@type-dom/css-type';
import {
  $borderRadius,
  $colors,
  $fontSizes,
  $types,
  IType,
} from '../../../styles/var';
import { $transition } from '../../../styles/transition';

export const $checkTagStyle: IStyle = {
  // background-color: getCssVar('color', 'info', 'light-9'),
  backgroundColor: $colors.info['light-9'],
  // border-radius: getCssVar('border-radius', 'base'),
  borderRadius: $borderRadius.base,
  // color: getCssVar('color', 'info'),
  color: $colors.info.base,
  cursor: 'pointer',
  display: 'inline-block',
  // font-size: getCssVar('font-size', 'base'),
  fontSize: $fontSizes.base,
  // line-height: getCssVar('font-size', 'base'),
  lineHeight: $fontSizes.base,
  padding: '7px 15px',
  // transition: getCssVar('transition', 'all'),
  transition: $transition.all,
  fontWeight: 'bold',

  userSelect: 'none', // 禁止用户选中文本
};
export const $checkTagHoverStyle: IStyle = {
  backgroundColor: $colors.info['light-7'],
};
export const $checkTagChecked = {} as Record<IType, IStyle>;
export const $checkTagCheckedHover = {} as Record<IType, string>;

export function useType() {
  for (const type of $types) {
    $checkTagChecked[type] = {
      backgroundColor: $colors[type]['light-8'],
      color: $colors[type].base,
    };
    $checkTagCheckedHover[type] = $colors[type]['light-7'];
  }
}
