import { Ref, Signal, Computed, ToRefs } from '@type-dom/signals';
import { RouteRecordRaw } from '@type-dom/router';
import { MenuProps } from './td-menu.interface';

export interface MenuItemRegistered {
  index: string,
  indexPath: Computed<string[]>
  active: Computed<boolean>
}
export interface MenuItemClicked {
  index: string;
  indexPath: string[];
  route?: RouteRecordRaw; // RouteLocationRaw
}

export interface MenuProvider {
  openedMenus: Signal<string[]>;
  items: Signal<Record<string, MenuItemRegistered>>;
  subMenus: Signal<Record<string, MenuItemRegistered>>;
  activeIndex?: Signal<string>;
  isMenuPopup?: Computed<boolean>
  props: ToRefs<MenuProps>

  addMenuItem: (item: MenuItemRegistered) => void
  removeMenuItem: (item: MenuItemRegistered) => void
  addSubMenu: (item: MenuItemRegistered) => void
  removeSubMenu: (item: MenuItemRegistered) => void

  openMenu: (index: string, indexPath: string[]) => void
  closeMenu: (index: string, indexPath: string[]) => void

  handleMenuItemClick: (item: MenuItemClicked) => void
  handleSubMenuClick: (subMenu: MenuItemRegistered) => void
}

export interface SubMenuProvider {
  addSubMenu: (item: MenuItemRegistered) => void
  removeSubMenu: (item: MenuItemRegistered) => void
  handleMouseleave?: (deepDispatch: boolean) => void
  mouseInChild: Ref<boolean>
  level: number
}
