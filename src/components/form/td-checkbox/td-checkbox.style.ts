import { IStyle } from '@type-dom/css-type';
import { ISize } from '../../../styles/size';
import {
  $bgColor,
  $border,
  $borderColor,
  $borderRadius, $borderWidth,
  $colorPrimary,
  $colorWhite,
  $commonComponentSize, $disabled,
  $fillColor, $fontSizes,
  $fontWeightPrimary,
  $textColor, $zIndex
} from '../../../styles/var';
import { ITdCheckboxConfig } from './td-checkbox.interface';
// import { $input } from '../td-input/td-input.style';

export const $checkbox = {
  fontSize: '14px',
  // 'font-weight': getCssVar('font-weight-primary'),
  fontWeight: $fontWeightPrimary,
  // 'text-color': getCssVar('text-color-regular'),
  textColor: $textColor.regular,
  inputHeight: '14px',
  inputWidth: '14px',
  // 'border-radius': getCssVar('border-radius-small'),
  borderRadius: $borderRadius.small,
  // 'bg-color': getCssVar('fill-color', 'blank'),
  bgColor: $fillColor.blank,
  // 'input-border': getCssVar('border'),
  inputBorder: $border,
  // 'disabled-border-color': getCssVar('border-color'),
  disabledBorderColor: $borderColor.base,
  // 'disabled-input-fill': getCssVar('fill-color', 'light'),
  disabledInputFill: $fillColor.light,
  // 'disabled-icon-color': getCssVar('text-color-placeholder'),
  disabledIconColor: $textColor.placeholder,
  // 'disabled-checked-input-fill': getCssVar('border-color-extra-light'),
  disabledCheckedInputFill: $borderColor.extraLight,
  // 'disabled-checked-input-border-color': getCssVar('border-color'),
  disabledCheckedInputBorderColor: $borderColor.base,
  // 'disabled-checked-icon-color': getCssVar('text-color-placeholder'),
  disabledCheckedIconColor: $textColor.placeholder,
  // 'checked-text-color': getCssVar('color-primary'),
  checkedTextColor: $colorPrimary,
  // 'checked-input-border-color': getCssVar('color-primary'),
  checkedInputBorderColor: $colorPrimary,
  // 'checked-bg-color': getCssVar('color-primary'),
  checkedBgColor: $colorPrimary,
  // 'checked-icon-color': getCssVar('color', 'white'),
  checkedIconColor: $colorWhite,
  // 'input-border-color-hover': getCssVar('color-primary'),
  inputBorderColorHover: $colorPrimary,
};

export const $checkboxBorderedPaddingLeft = {
  'large': '12px',
  'default': '10px',
  'small': '8px',
};

export const $checkboxBorderedPaddingRight = {
  'large': '20px',
  'default': '16px',
  'small': '12px',
};

export const $checkboxHeight = $commonComponentSize;

export const $checkboxBorderedInputHeight = {
  large: '14px',
  default: '12px',
  small: '12px'
};

export const $checkboxFontSize = {
  large: '14px',
  default: '14px',
  small: '12px'
};

export const $checkboxBorderedInputWidth = {
  $checkboxBorderedInputHeight,
  // $checkboxBorderedInputWidth
};

export const $checkboxStyle: IStyle = {
  // color: getCssVar('checkbox-text-color');
  color: $checkbox.textColor,
  // font-weight: getCssVar('checkbox-font-weight');
  fontWeight: $checkbox.fontWeight,
  // font-size: getCssVar('font-size', 'base');
  fontSize: $fontSizes.base,
  position: 'relative',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  marginRight: '30px',
  // height: getCssVarWithDefault(
  //   'checkbox-height',
  //   map.get($checkbox-height, 'default')
  // );
  height: $checkboxHeight.default,
};

export const $checkboxInputStyle: IStyle = {
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  outline: 'none',
  display: 'inline-flex',
  position: 'relative',
};

export const $checkboxInnerStyle: IStyle = {
  display: 'inline-block',
  position: 'relative',
  // border: getCssVar('checkbox-input-border'),
  border: $checkbox.inputBorder,
  // borderRadius: getCssVar('checkbox-border-radius'),
  borderRadius: $checkbox.borderRadius,
  boxSizing: 'border-box',
  // width: getCssVar('checkbox-input-width'),
  width: $checkbox.inputWidth,
  // height: getCssVar('checkbox-input-height'),
  height: $checkbox.inputHeight,
  // background-color: getCssVar('checkbox-bg-color'),
  backgroundColor: $checkbox.bgColor,
  // z-index: getCssVar('index-normal'),
  zIndex: $zIndex.normal,
  transition: `border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
      background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
      outline 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46)`
};

export const $checkboxInnerAfterStyle: IStyle = {
  boxSizing: 'content-box',
  // content: '',
  border: '1px solid transparent',
  borderLeft: 0,
  borderTop: 0,
  height: '7px',
  left: '4px',
  position: 'absolute',
  top: '1px',
  transform: 'rotate(45deg) scaleY(0)', //  scaleY(1)
  width: '3px',
  transition: 'transform 0.15s ease-in 0.05s',
  transformOrigin: 'center',
// border-color: var(--el-checkbox-checked-icon-color),
//   borderColor: $checkbox.checkedIconColor,
};

export const $checkboxInnerBeforeStyle: IStyle = {
  // content: '',
  position: 'absolute',
  display: 'block',
  // backgroundColor: getCssVar('checkbox-checked-icon-color'),
  backgroundColor: $checkbox.checkedIconColor,
  height: '2px',
  transform: 'scale(0.5)',
  left: 0,
  right: 0,
  top: '5px',
};

export const $checkboxOriginalStyle: IStyle = {
  opacity: 0,
  outline: 'none',
  position: 'absolute',
  margin: 0,
  width: 0,
  height: 0,
  zIndex: -1,
};

export const $checkboxLabelStyle: IStyle = {
  display: 'inline-block',
  paddingLeft: '8px',
  lineHeight: 1,
  // fontSize: getCssVar('checkbox-font-size'),
  fontSize: $checkbox.fontSize,
};

export const $checkboxGroupStyle: IStyle = {
  fontSize: 0,
  lineHeight: 0,
};

export function useCheckboxStyle(params: ITdCheckboxConfig) {
  useSize(params);
  useBordered(params);
  useIndeterminate(params);
  useDisabled(params);
  useChecked(params);
}

export function useSize(params: ITdCheckboxConfig) {
  const size = params.size || 'default';
  $checkboxStyle.height = $checkboxHeight[size];
  $checkboxLabelStyle.fontSize = $checkboxFontSize[size];
  $checkboxInnerStyle.width = $checkboxFontSize[size];
  $checkboxInnerStyle.height = $checkboxFontSize[size];
  if (size === 'small') {
    $checkboxInnerAfterStyle.width = '2px';
    $checkboxInnerAfterStyle.height = '6px';
  } else {
    $checkboxInnerAfterStyle.width = '3px';
    $checkboxInnerAfterStyle.height = '7px';
  }
}

export function useBordered(params: ITdCheckboxConfig) {
  const bordered = params.border || false;
  const checked = params.checked || params.modelValue || false;
  const disabled = params.disabled || false;
  if (bordered) {
    $checkboxStyle.padding = '0 ' + (parseInt($checkboxBorderedPaddingRight.default) - parseInt($borderWidth)) + 'px'
      + ' 0 ' + (parseInt($checkboxBorderedPaddingLeft.default) - parseInt($borderWidth)) + 'px';
    $checkboxStyle.borderRadius = $borderRadius.base;
    $checkboxStyle.border = $border;
    $checkboxStyle.boxSizing = 'border-box';
    if (checked) {
      $checkboxStyle.borderColor = $colorPrimary;
    } else {
      $checkboxStyle.border = $border;
    }
    if (disabled) {
      $checkboxStyle.borderColor = $borderColor.lighter;
    } else {
      $checkboxStyle.border = $border;
    }
  }
}

export function useDisabled(params: ITdCheckboxConfig) {
  const disabled = params.disabled || false;
  const checked = params.checked || false;
  const indeterminate = params.indeterminate || false;
  if (disabled) {
    $checkboxStyle.cursor = 'not-allowed';
    $checkboxInnerStyle.cursor = 'not-allowed';
    if (checked) {
      $checkboxInnerStyle.backgroundColor = $checkbox.disabledCheckedInputFill;
      $checkboxInnerStyle.borderColor = $checkbox.disabledCheckedInputBorderColor;
      $checkboxInnerAfterStyle.borderColor = $checkbox.disabledCheckedIconColor;
    }
    if (indeterminate) {
      $checkboxInnerStyle.backgroundColor = $checkbox.disabledCheckedInputFill;
      $checkboxInnerStyle.borderColor = $checkbox.disabledCheckedInputBorderColor;
      $checkboxInnerAfterStyle.borderColor = $checkbox.disabledCheckedIconColor;
    }
    $checkboxLabelStyle.cursor = 'not-allowed';
    $checkboxLabelStyle.color = $disabled.textColor;
  } else {
    $checkboxStyle.cursor = 'pointer';
    $checkboxInnerStyle.cursor = 'pointer';
    $checkboxLabelStyle.cursor = 'pointer';
    $checkboxLabelStyle.color = $checkbox.textColor;
  }
}

export function useChecked(params: ITdCheckboxConfig) {
  let checked = params.checked || params.modelValue || false;
  const indeterminate = params.indeterminate || false;
  const bordered = params.border || false;
  if (params.modelValue !== undefined) { // todo checkbox 的值没有选中
    checked = !!params.modelValue;
  }
  if (checked) {
    $checkboxStyle.color = $checkbox.checkedTextColor;
    $checkboxInnerStyle.backgroundColor = $checkbox.checkedBgColor;
    $checkboxInnerStyle.borderColor = $checkbox.checkedInputBorderColor;
    $checkboxInnerAfterStyle.transform = 'rotate(45deg) scaleY(1)';
    $checkboxInnerAfterStyle.borderColor = $checkbox.checkedIconColor;
    $checkboxLabelStyle.color = $checkbox.checkedTextColor;
    if (indeterminate) {
      return;
    } else {
      $checkboxInnerBeforeStyle.display = 'none';
    }
    if (bordered) {
      $checkboxStyle.borderColor = $colorPrimary;
    } else {
      $checkboxStyle.border = $border;
    }
  } else {
    $checkboxInnerAfterStyle.transform = 'rotate(45deg) scaleY(0)';
    $checkboxStyle.color = $checkbox.textColor;
    if (indeterminate) {
      return;
    } else {
      $checkboxInnerBeforeStyle.display = 'none';
    }
    if (bordered) {
      $checkboxStyle.borderColor = $borderColor.lighter;
    } else {
      $checkboxStyle.border = undefined;
    }
    $checkboxInnerStyle.backgroundColor = $checkbox.bgColor;
    $checkboxInnerStyle.borderColor = $borderColor.base;
    // $checkboxInnerAfterStyle.borderColor = $checkbox.iconColor;
    // $checkboxLabelStyle.color = $checkbox.textColor;
  }

}

export function useIndeterminate(params: ITdCheckboxConfig) {
  const indeterminate = params.indeterminate || false;
  if (indeterminate) {
    $checkboxInnerStyle.backgroundColor = $checkbox.checkedBgColor;
    $checkboxInnerStyle.borderColor = $checkbox.checkedInputBorderColor;
    $checkboxInnerBeforeStyle.display = 'block';
    $checkboxInnerAfterStyle.display = 'none';
  } else {
    $checkboxInnerBeforeStyle.display = 'none';
    $checkboxInnerAfterStyle.display = 'block';
  }
}
