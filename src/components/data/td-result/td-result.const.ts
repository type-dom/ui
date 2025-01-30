import { TypeSvgSvg } from '@type-dom/framework';
import {
  ElCircleCheckFilledSvg,
  ElCircleCloseFilledSvg,
  ElInfoFilledSvg,
  ElWarningFilledSvg,
} from '@type-dom/svgs';
import { ResultProps } from './td-result.interface';

export const IconMap = {
  success: 'icon-success',
  warning: 'icon-warning',
  error: 'icon-error',
  info: 'icon-info',
} as const;

export const IconComponentMap: Record<
  (typeof IconMap)[keyof typeof IconMap],
  typeof TypeSvgSvg
> = {
  [IconMap.success]: ElCircleCheckFilledSvg,
  [IconMap.warning]: ElWarningFilledSvg,
  [IconMap.error]: ElCircleCloseFilledSvg,
  [IconMap.info]: ElInfoFilledSvg,
};

export const resultProps: ResultProps = {
  /**
   * @description title of result
   */
  title: '',
  subTitle: '',
  icon: 'info',
};
