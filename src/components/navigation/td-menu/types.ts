// import type { Ref } from 'vue'
import { Computed, Ref, Signal } from '@type-dom/signals';
// import type { RouteLocationRaw } from 'vue-router'
import { MenuProps } from './td-menu.interface';
import { IRoute } from '@type-dom/framework';

export interface MenuItemRegistered {
  index: string,
  indexPath: string[]; // | Computed<string[]>
  active: boolean; // | Computed<boolean>
}
export interface MenuItemClicked {
  index: string;
  indexPath: string[];
  route?: IRoute; // RouteLocationRaw
}

export interface MenuProvider {
  openedMenus: Signal<string[]>
  items: Record<string, MenuItemRegistered>
  subMenus: Record<string, MenuItemRegistered>
  activeIndex?: string;
  isMenuPopup?: boolean
  props: MenuProps

  addMenuItem: (item: Signal<MenuItemRegistered>) => void
  removeMenuItem: (item: Signal<MenuItemRegistered>) => void
  addSubMenu: (item: Signal<MenuItemRegistered>) => void
  removeSubMenu: (item: Signal<MenuItemRegistered>) => void

  openMenu: (index: string, indexPath: string[]) => void
  closeMenu: (index: string, indexPath: string[]) => void

  handleMenuItemClick: (item: MenuItemClicked) => void
  handleSubMenuClick: (subMenu: MenuItemRegistered) => void
}

export interface SubMenuProvider {
  addSubMenu: (item: Signal<MenuItemRegistered>) => void
  removeSubMenu: (item: Signal<MenuItemRegistered>) => void
  handleMouseleave?: (deepDispatch: boolean) => void
  mouseInChild: Ref<boolean>
  level: number
}
