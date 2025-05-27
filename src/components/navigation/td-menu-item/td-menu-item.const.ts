import { isArray, isString } from '@type-dom/utils';
import { MenuItemRegistered } from '../td-menu/types';
import { TdMenuItemProps } from './td-menu-item.interface';

export const menuItemProps: TdMenuItemProps = {
  mIndex: null,
}

export const menuItemEmits = {
  click: (item: MenuItemRegistered) =>
    isString(item.index) && isArray(item.indexPath.get()),
}
