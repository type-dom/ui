import { IStyle } from '@type-dom/css-type';
import {
  $borderColor,
  $fillColor,
  $fontSizes,
  $textColor,
} from '../../../styles/var';
import { $inputFontSize } from '../../form/td-input/td-input.style';
import { DescriptionsProps } from './td-descriptions.interface';
import { unref } from '@type-dom/signals';

export const $descriptionsHeaderMarginBottom = {
  large: '20px',
  default: '16px',
  small: '12px',
};

export const $descriptionsTitleFontSize = {
  large: '16px',
  default: '16px',
  small: '14px',
};

export const $descriptionsCellPaddingBottom = {
  large: '16px',
  default: '12px',
  small: '8px',
};

export const $descriptionsBorderedCellPadding = {
  large: '12px 15px',
  default: '8px 11px',
  small: '4px 7px',
};

export const $descriptionsCellFontSize = {
  large: '14px',
  default: '14px',
  small: '12px',
};

// Descriptions
// css3 var in packages/theme-chalk/src/descriptions.scss
export const $descriptions = {
  // tableBorder: 1px solid getCssVar('border-color-lighter'),
  tableBorder: '1px solid ' + $borderColor.lighter,
  // itemBorderedLabelBackground: getCssVar('fill-color', 'light'),
  itemBorderedLabelBackground: $fillColor.light,
};

export const $descriptionsStyle: IStyle = {
  boxSizing: 'border-box',
  // fontSize: getCssVar('font-size', 'base'),
  fontSize: $fontSizes.base,
  // color: getCssVar('text-color', 'primary'),
  color: $textColor.primary,
};

export const $descriptionsHeaderStyle: IStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  // margin-bottom: map.get($descriptions-header-margin-bottom, 'default'),
  marginBottom: $descriptionsHeaderMarginBottom.default,
};
export const $descriptionsHeaderTitleStyle: IStyle = {
  // color: getCssVar('text-color', 'primary'),
  color: $textColor.primary,
  // font-size: map.get($descriptions-title-font-size, 'default'),
  fontSize: $descriptionsTitleFontSize.default,
  fontWeight: 'bold',
};

export const $descriptionsBodyStyle: IStyle = {
  // background-color: getCssVar('fill-color', 'blank')
  backgroundColor: $fillColor.blank,
};
export const $descriptionsBodyTableStyle: IStyle = {
  borderCollapse: 'collapse',
  width: '100%',
};

export const $descriptionsBodyTableCellStyle: IStyle = {
  // display: 'inline-flex', // add by me

  boxSizing: 'border-box',
  textAlign: 'left',
  fontWeight: 'normal',
  lineHeight: '23px',
  // font-size: map.get($descriptions-cell-font-size, 'default'),
  fontSize: $descriptionsCellFontSize.default,
};

export const $descriptionsItemLabelMarginRight = {
  large: '16px',
  default: '16px',
  small: '12px',
};

export function useSize(config?: DescriptionsProps) {
  const size = unref(config?.size) || 'default';
  // if (size !== 'default') {
  $descriptionsStyle.fontSize = $inputFontSize[size];
  $descriptionsHeaderStyle.marginBottom = $descriptionsHeaderMarginBottom[size];
  $descriptionsHeaderTitleStyle.fontSize = $descriptionsTitleFontSize[size];
  $descriptionsBodyTableStyle.fontSize = $descriptionsCellFontSize[size];
  $descriptionsBodyTableCellStyle.fontSize = $descriptionsCellFontSize[size];
  if (config?.border) {
    $descriptionsBodyTableCellStyle.padding =
      $descriptionsBorderedCellPadding[size];
  } else {
    $descriptionsBodyTableCellStyle.paddingBottom =
      $descriptionsCellPaddingBottom[size];
    $descriptionsCellLabelStyle.marginRight =
      $descriptionsItemLabelMarginRight[size];
    $descriptionsCellLabelStyle.paddingBottom =
      $descriptionsItemVerticalLabelPaddingBottom[size];
  }
  // }
}

export const $descriptionsItemVerticalLabelPaddingBottom = {
  large: '8px',
  default: '6px',
  small: '4px',
};

export let $descriptionsCellLabelStyle: IStyle = {};

export const $descriptionsCellContentStyle: IStyle = {
  color: $textColor.regular,
};

export function useBordered(config: DescriptionsProps) {
  const bordered = config?.border;
  if (bordered) {
    $descriptionsCellLabelStyle = {
      fontWeight: 'bold',
      color: $textColor.regular,
      backgroundColor: $descriptions.itemBorderedLabelBackground,
    };
    $descriptionsBodyTableCellStyle.border = $descriptions.tableBorder;
    $descriptionsBodyTableCellStyle.padding =
      $descriptionsBorderedCellPadding.default;
    $descriptionsCellContentStyle.color = $textColor.primary;
  } else {
    $descriptionsBodyTableCellStyle.border = undefined;
    $descriptionsBodyTableCellStyle.padding = undefined;
    $descriptionsBodyTableCellStyle.paddingBottom =
      $descriptionsCellPaddingBottom.default;
    $descriptionsCellLabelStyle = {
      color: $textColor.primary,
      marginRight: $descriptionsItemLabelMarginRight.default,
    };
    if (config.direction === 'vertical') {
      $descriptionsCellLabelStyle.paddingBottom =
        $descriptionsItemVerticalLabelPaddingBottom.default;
    }
  }
}
