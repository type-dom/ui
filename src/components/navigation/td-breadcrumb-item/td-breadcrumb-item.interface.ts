import { IRoute, ITypeSpan, Router, TypeSpanProps } from '@type-dom/framework';

export interface ITdBreadcrumbItem extends ITypeSpan {
  className: 'TdBreadcrumbItem';
}

export interface BreadcrumbItemProps extends TypeSpanProps {
  /**
   * @description target route of the link, same as `to` of `vue-router`
   *     default: '',
   */
  toPath?: string; // | IRoute; // todo teleport to   Route
  //   type: definePropType<RouteLocationRaw>([String, Object]),
  // },
  /**
   * @description if `true`, the navigation will not leave a history record
   *     default: false,
   */
  replace?: boolean;

  router?: Router;
}
