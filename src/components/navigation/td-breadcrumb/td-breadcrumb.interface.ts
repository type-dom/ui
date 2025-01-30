import { ITypeDiv, TypeDivProps, TypeSvgSvg } from '@type-dom/framework';

// import { ITdBreadcrumbItem } from '../td-breadcrumb-item/td-breadcrumb-item.interface';

export interface ITdBreadcrumb extends ITypeDiv {
  className: 'TdBreadcrumb';
  // items?: ITdBreadcrumbItem[];
}

export interface BreadcrumbProps extends TypeDivProps {
  /**
   * @description separator character
   *     default: '/',
   */
  separator?: string;
  /**
   * @description icon component of icon separator
   * 要是类，否则会只有一个对象。
   */
  separatorIcon?: typeof TypeSvgSvg;

  // items?: ITdBreadcrumbItem[];
}
