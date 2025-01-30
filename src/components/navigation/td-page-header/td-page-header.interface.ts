import { ITypeDiv, TypeDivProps, TypeSvgSvg } from '@type-dom/framework';

export interface ITdPageHeader extends ITypeDiv {
  className: 'PageHeader';
}

export interface PageHeaderProps extends TypeDivProps {
  /**
   * @description icon component of page header
   */
  icon?: typeof TypeSvgSvg;
  /**
   * @description main title of page header
   */
  title?: string;
  /**
   * @description content of page header
   */
  content?: string;
}

export const pageHeaderEmits = {
  back: () => true,
};
