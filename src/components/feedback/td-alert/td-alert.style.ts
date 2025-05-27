import { IStyle } from '@type-dom/css-type';
import {
  $borderRadius,
  $colors,
  $colorWhite,
  $transitionDurationFast,
} from '../../../styles/var';
import { AlertProps } from './td-alert.interface';


export const $alert = {
  padding: '8px 16px',
  // 'border-radius-base': getCssVar('border-radius-base'),
  borderRadiusBase: $borderRadius.base,
  titleFontSize: '14px',
  titleWithDescriptionFontSize: '16px',
  descriptionFontSize: '14px',
  closeFontSize: '16px',
  closeCustomedFontSize: '14px',
  iconSize: '16px',
  iconLargeSize: '28px',
};

export const $alertStyle: IStyle = {
  width: '100%',
  // padding: getCssVar('alert', 'padding'),
  padding: $alert.padding,
  margin: 0,
  boxSizing: 'border-box',
  // border-radius: getCssVar('alert', 'border-radius-base'),
  borderRadius: $alert.borderRadiusBase,
  position: 'relative',
  // backgroundColor: getCssVar('color', 'white'),
  backgroundColor: $colorWhite,
  overflow: 'hidden',
  opacity: 1,
  display: 'flex',
  alignItems: 'center',
  // transition: opacity getCssVar('transition-duration', 'fast'),
  transition: 'opacity ' + $transitionDurationFast,
};

export const $alertContentStyle: IStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

export const $alertIconStyle: IStyle = {
  // font-size: getCssVar('alert', 'icon-size'),
  fontSize: $alert.iconSize,
  // width: getCssVar('alert', 'icon-size'),
  width: $alert.iconSize,
  marginRight: '8px',
};

export const $alertTitleStyle: IStyle = {
  // font-size: getCssVar('alert', 'title-font-size'),
  fontSize: $alert.titleFontSize,
  lineHeight: '24px',
};

export const $alertDescriptionStyle: IStyle = {
  // font-size: getCssVar('alert', 'description-font-size');
  fontSize: $alert.descriptionFontSize,
  margin: 0,
};

export const $alertCloseBtnStyle: IStyle = {
  // font-size: getCssVar('alert', 'close-font-size'),
  fontSize: $alert.closeFontSize,
  opacity: 1,
  position: 'absolute',
  top: '12px',
  right: '16px',
  cursor: 'pointer',
};

export function useStyle(config?: AlertProps) {
  useType(config);
  if (config?.center) {
    $alertStyle.justifyContent = 'center';
  } else {
    delete $alertStyle.justifyContent;
  }
  const big = !!config?.description || !!config?.slot;
  if (big) {
    $alertIconStyle.fontSize = $alert.iconLargeSize;
    $alertIconStyle.width = $alert.iconLargeSize;
    $alertIconStyle.marginRight = '12px';
  }
  const withDescription = config?.description || config?.slot;
  if (withDescription) {
    $alertTitleStyle.fontSize = $alert.titleWithDescriptionFontSize;
  }
}

export function useType(config?: AlertProps) {
  const effect = config?.effect || 'light';
  const $alertBgColor = $colors[config?.type || 'info']['light-9'];
  switch (effect) {
    case 'light':
      $alertStyle.backgroundColor = $alertBgColor;
      $alertStyle.color = $colors[config?.type || 'info'].base;
      $alertDescriptionStyle.color = $colors[config?.type || 'info'].base;
      break;
    case 'dark':
      $alertStyle.backgroundColor = $colors[config?.type || 'info'].base;
      $alertStyle.color = $colorWhite;
      break;
  }
  // if (config.)
}
