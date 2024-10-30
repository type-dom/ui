import { TypeSvgSvg } from '@type-dom/framework';
import { IUI, IUIConfig } from '../../../ui/ui.interface';

// import { ITdBreadcrumbItem } from '../td-breadcrumb-item/td-breadcrumb-item.interface';

export interface ITdBreadcrumb extends IUI {
  className: 'TdBreadcrumb';
  // items?: ITdBreadcrumbItem[];
}

export interface ITdBreadcrumbConfig extends IUIConfig {
  /**
   * @description separator character
   *     default: '/',
   */
  separator?: string;
  /**
   * @description icon component of icon separator
   */
  separatorIcon?: TypeSvgSvg;

  // items?: ITdBreadcrumbItem[];
}
