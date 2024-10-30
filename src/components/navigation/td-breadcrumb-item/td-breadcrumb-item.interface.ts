import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { Router } from '@type-dom/framework';

export interface ITdBreadcrumbItem extends IUI {
  className: 'TdBreadcrumbItem';
}

export interface ITdBreadcrumbItemConfig extends IUIConfig {
  /**
   * @description target route of the link, same as `to` of `vue-router`
   *     default: '',
   */
  toPath?: string;
  //   type: definePropType<RouteLocationRaw>([String, Object]),
  // },
  /**
   * @description if `true`, the navigation will not leave a history record
   *     default: false,
   */
  replace?: boolean;

  router?: Router;
}
