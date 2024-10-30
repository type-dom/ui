import { IStyle } from '@type-dom/css-type';
import {
  $colors,
  $fontSizes,
  $fontWeightPrimary,
  $textColor,
  IType
} from '../../../styles/var';
import { ITdLinkConfig } from './td-link.interface';

// Link
// css3 var in packages/theme-chalk/src/link.scss
export const $link = {
  // 'font-size': getCssVar('font-size-base'),
  fontSize: $fontSizes.base,
  // 'font-weight': getCssVar('font-weight-primary'),
  fontWeight: $fontWeightPrimary,
  // 'text-color': getCssVar('text-color-regular'),
  textColor: $textColor.regular,
  // 'hover-text-color': getCssVar('color-primary'),
  hoverTextColor: $colors.primary.base,
  // 'disabled-text-color': getCssVar('text-color-placeholder'),
  disabledTextColor: $textColor.placeholder
};

export let $linkTextColor: string;

export function useType(config?: ITdLinkConfig) {
  $link.textColor = $colors[config?.type || 'default'].base;
  $link.hoverTextColor = $colors[config?.type || 'default']['light-3'];
  $link.disabledTextColor = $colors[config?.type || 'default']['light-5'];
  buttonVariant(config?.type || 'default');
}

export const $linkStyle: IStyle = {
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  // verticalAlign: 'middle',
  position: 'relative',
  textDecoration: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: '0',
  // font-size: getCssVar('link', 'font-size'),
  fontSize: $link.fontSize,
  // font-weight: getCssVar('link', 'font-weight'),
  fontWeight: $link.fontWeight,
  // color: getCssVar('link', 'text-color'),
  color: $link.textColor
};

export const $linkInnerStyle: IStyle = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center'
};

export const $linkStateColors = {} as Record<IType, Record<string, IStyle>>;

export function buttonVariant($type: IType) {
  $linkStateColors[$type] = {
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
