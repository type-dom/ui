import { MenuProps } from './td-menu.interface';
import { ElMoreSvg } from '@type-dom/svgs';
import { isArray, isObject, isString } from '@type-dom/utils';
import { MenuItemClicked } from './types';

export const menuProps: MenuProps = {
  mode: 'vertical',
  defaultActive: '',
  defaultOpeneds: [],
  menuTrigger: 'hover',
  collapseTransition: true,
  ellipsis:true,
  popperOffset: 6,
  ellipsisIcon: ElMoreSvg,
  popperEffect: 'dark',
  showTimeout: 300,
  hideTimeout: 300,
  persistent: true,
}

const checkIndexPath = (indexPath: unknown): indexPath is string[] =>
  isArray(indexPath) && indexPath.every((path) => isString(path))

export const menuEmits = {
  close: (index: string, indexPath: string[]) =>
    isString(index) && checkIndexPath(indexPath),

  open: (index: string, indexPath: string[]) =>
    isString(index) && checkIndexPath(indexPath),

  select: (
    index: string,
    indexPath: string[],
    item: MenuItemClicked,
    routerResult?: Promise<void> // | NavigationFailure>
  ) =>
    isString(index) &&
    checkIndexPath(indexPath) &&
    isObject(item) &&
    (routerResult === undefined || routerResult instanceof Promise),
}
