import { ITypeSpan, TypeSpanProps } from '@type-dom/framework';
import { Router } from '@type-dom/router';

export interface ITdBreadcrumbItem extends ITypeSpan {
  className: 'TdBreadcrumbItem';
}

export interface BreadcrumbItemProps extends TypeSpanProps {
  /**
   * @description target route of the link, same as `to` of `vue-router`
   *     default: '',
   */
  toPath?: string; // | RouteRecordRaw; // todo teleport to   Route
  //   type: definePropType<RouteLocationRaw>([String, Object]),
  // },
  /**
   * @description if `true`, the navigation will not leave a history record
   *     default: false,
   */
  replace?: boolean;

  router?: Router;
}
