import { IStyle } from '@type-dom/css-type';
import {
  $border,
  $button, $buttonBorderWidth,
  $colorPrimary,
  $colors,
  $colorWhite,
  $disabled, $fontSizes
} from '../../../styles/var';
import { $transition } from '../../../styles/transition';
import { ITdCheckboxConfig } from '../td-checkbox/td-checkbox.interface';
import { $checkbox } from '../td-checkbox/td-checkbox.style';
import { $buttonPaddingHorizontal, $buttonPaddingVertical, buttonSize } from '../../basic/td-button/td-button.style';

export const $checkboxButton = {
  // 'checked-bg-color': getCssVar('color-primary'),
  checkedBgColor: $colorPrimary,
  // 'checked-text-color': getCssVar('color-white'),
  checkedTextColor: $colorWhite,
  // 'checked-border-color': getCssVar('color-primary'),
  checkedBorderColor: $colorPrimary,
};

export const $checkboxButtonStyle: IStyle = {
  position: 'relative',
  display: 'inline-block',
};

export let $checkboxButtonInnerStyle: IStyle = {
  display: 'inline-block',
  lineHeight: 1,
  // font-weight: getCssVar('checkbox-font-weight'),
  fontWeight: $checkbox.fontWeight,
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  cursor: 'pointer',
  // background: var
  //   #{getCssVarName('button-bg-color')},
  //   map.get($button, 'bg-color',
  // ),
  background: $button.bgColor,
  // border: getCssVar('border'),
  border: $border,
  borderLeftColor: 'transparent',
  // color: var
  //   #{getCssVarName('button-text-color')},
  //   map.get($button, 'text-color',
  // ),
  color: $button.textColor,
  '-webkit-appearance': 'none',
  textAlign: 'center',
  boxSizing: 'border-box',
  outline: 'none',
  margin: 0,
  position: 'relative',
  // transition: getCssVar('transition-all'),
  transition: $transition.all,
  userSelect: 'none',
};

export const $checkboxButtonInnerHoverStyle: IStyle = {
  color: $colorPrimary,
};

export const $checkboxButtonOriginalStyle: IStyle = {
  opacity: 0,
  outline: 'none',
  position: 'absolute',
  margin: 0,
  zIndex: -1,
};

export function useCheckboxButtonStyle(params: ITdCheckboxConfig) {
  useCheckedStyle(params);
  useDisabledStyle(params);
  useSize(params);

  // const paddingVertical = parseInt($buttonPaddingVertical.default) - parseInt($buttonBorderWidth) + 'px';
  // const paddingHorizontal = parseInt($buttonPaddingHorizontal.default) - parseInt($buttonBorderWidth) + 'px';
  // const fontSize = $fontSizes.default;
  // $checkboxButtonInnerStyle = Object.assign($checkboxButtonInnerStyle, buttonSize(paddingVertical, paddingHorizontal, fontSize, 0))
}
export function useCheckedStyle(params: ITdCheckboxConfig) {
  const checked = params.checked;
  if (checked) {
    $checkboxButtonInnerStyle.color = $checkboxButton.checkedTextColor;
    $checkboxButtonInnerStyle.backgroundColor = $checkboxButton.checkedBgColor;
    $checkboxButtonInnerStyle.borderColor = $checkboxButton.checkedBorderColor;
    $checkboxButtonInnerStyle.boxShadow = '-1px 0 0 0 ' + $colors.primary['light-7'];
  //   todo 如果是第一个子节点 则添加 border-left-color: getCssVar('checkbox-button-checked-border-color');
  //   $checkboxButtonInnerStyle.borderLeftColor = $checkboxButton.checkedBorderColor;
  } else {
    $checkboxButtonInnerStyle.color = $button.textColor;
    $checkboxButtonInnerStyle.backgroundColor = $button.bgColor;
    $checkboxButtonInnerStyle.borderColor = $button.borderColor;
    $checkboxButtonInnerStyle.boxShadow = undefined;
  }
}

export function useDisabledStyle(params: ITdCheckboxConfig) {
  const disabled = params.disabled;
  if (disabled) {
    $checkboxButtonInnerStyle.color = $disabled.textColor;
    $checkboxButtonInnerStyle.cursor = 'not-allowed';
    $checkboxButtonInnerStyle.backgroundImage = 'none';
    $checkboxButtonInnerStyle.backgroundColor = $button.disabled.bgColor;
    $checkboxButtonInnerStyle.borderColor = $button.disabled.borderColor;
    $checkboxButtonInnerStyle.boxShadow = 'none';
  } else {
    $checkboxButtonInnerStyle.color = $button.textColor;
    $checkboxButtonInnerStyle.cursor = 'pointer';
    $checkboxButtonInnerStyle.backgroundImage = undefined;
    $checkboxButtonInnerStyle.background = $button.bgColor;
    $checkboxButtonInnerStyle.border = $border;
    $checkboxButtonInnerStyle.boxShadow = undefined;
  }
}

export function useFocusStyle(params: ITdCheckboxConfig) {
  const focus = false;
  if (focus) {
    $checkboxButtonInnerStyle.borderColor = $checkboxButton.checkedBorderColor;
  } else {
    $checkboxButtonInnerStyle.boxShadow = undefined;
  }
}

export function useSize(params: ITdCheckboxConfig) {
  const size = params.size || 'default';
  //         @include button-size(
  //           map.get($button-padding-vertical, $size) - $button-border-width,
  //           map.get($button-padding-horizontal, $size) - $button-border-width,
  //           map.get($button-font-size, $size),
  //           0
  //         );
  const paddingVertical = $buttonPaddingVertical[size];
  const paddingHorizontal = $buttonPaddingHorizontal[size];
  const sizeStyle = buttonSize(paddingVertical, paddingHorizontal, $fontSizes[size], 0);
  $checkboxButtonInnerStyle = Object.assign($checkboxButtonInnerStyle, sizeStyle);
}
