// 基于router创建的菜单
import { TypeProps, TypeDiv } from '@type-dom/framework';
import { Router, RouteRecordRaw } from '@type-dom/router';
import { Menu } from './menu';

export interface MenusProps extends TypeProps {
  router?: Router;
}

export class Menus extends TypeDiv {
  className: 'Menus';
  selectedMenu?: Menu;
  private router?: Router;

  constructor(params: MenusProps = {}) {
    super();
    this.className = 'Menus';
    this.attr.addName('menus');
    // 默认样式
    this.style.addObj({
      userSelect: 'none',
      // overflow: 'auto',
      boxSizing: 'border-box',
      flexShrink: 0,
      maxHeight: 'calc(100vh - 60px)',
      paddingBottom: '40px',
    });
    this.useParams(params);
    this.router = params.router;
    // console.log('ui-doc routerUI.routes is ', this.router);
    if (this.router) {
      // console.error('this.router.getRoutes() is ', this.router.getRoutes());
      // 递归过滤函数
      const filterRoutes = (routes?: RouteRecordRaw[]) => {
        return routes?.filter(route => !route.meta?.isHidden)  // 隐藏标记优先
          // 过滤当前层级
          .map(route => {
              route.children = filterRoutes(route.children);
              return route;
            }
          )
      };
      const routes = filterRoutes(this.router.routes as RouteRecordRaw[]);
      this.createMenus(this, routes, this.router);
    }
    // console.log('menus is ', this);
  }

  get menuRoot(): Menus {
    return this;
  }

  // /home '' '/' 首页菜单要单独处理
  createMenus(parent: Menus | Menu, routes?: readonly RouteRecordRaw[], router?: Router) {
    // console.log('createMenus . routes is ', routes);
    routes?.forEach((route) => {
      if (route.meta?.isHidden) {
        return;
      }
      if (route?.path === '/' && route.redirect) {
        // route = route.children!.find((item) => item.path === route.redirect)!;
        //   todo 没有的话，要报错的。
      }
      // 创建菜单项
      const menuItem = new Menu({
        parent,
        route,
        router,
        width: this.style.get('width'),
        events: {
          mouseenter: (evt) => {
            if (
              evt?.target instanceof HTMLElement ||
              evt?.target instanceof SVGElement
            ) {
              evt?.target.style.setProperty('cursor', 'auto');
            }
          },
        },
      });
      if (parent instanceof Menu) {
        parent.menuItems.push(menuItem);
      }
      menuItem.appendParent(parent);
      if (route.children) {
        this.createMenus(menuItem, route.children, router);
      }
    });
  }

  setSelectedMenu(menu: Menu) {
    if (menu !== this.selectedMenu) {
      if (this.selectedMenu) {
        this.selectedMenu.style.setObj({
          backgroundColor: '',
        });
      }
      this.selectedMenu = menu;
      if (menu.route?.redirect === undefined) {
        menu.style.setObj({
          backgroundColor: '#ccc',
        });
      }
    }
  }
}
