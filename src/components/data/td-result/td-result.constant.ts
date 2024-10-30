import { TypeSvgSvg } from '@type-dom/framework';
import {
  ElCircleCheckFilledSvg,
  ElCircleCloseFilledSvg,
  ElInfoFilledSvg,
  ElWarningFilledSvg
} from '@type-dom/svgs';
import { $icon, $result } from './td-result.style';

export const IconMap = {
  success: 'icon-success',
  warning: 'icon-warning',
  error: 'icon-error',
  info: 'icon-info'
} as const;

export const IconComponentMap: Record<
  (typeof IconMap)[keyof typeof IconMap],
  TypeSvgSvg
> = {
  [IconMap.success]: new ElCircleCheckFilledSvg({
    styleObj: $icon['success'],
    attrObj: {
      width: $result.iconFontSize,
      height: $result.iconFontSize
    }
  }),
  [IconMap.warning]: new ElWarningFilledSvg({
    styleObj: $icon['warning'],
    attrObj: {
      width: $result.iconFontSize,
      height: $result.iconFontSize
    }
  }),
  [IconMap.error]: new ElCircleCloseFilledSvg({
    styleObj: $icon['error'],
    attrObj: {
      width: $result.iconFontSize,
      height: $result.iconFontSize
    }
  }),
  [IconMap.info]: new ElInfoFilledSvg({
    styleObj: $icon['info'],
    attrObj: {
      width: $result.iconFontSize,
      height: $result.iconFontSize
    }
  })
};
