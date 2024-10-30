// 基于router创建的菜单
import { IRoute, ITypeConfig, Router, TypeDiv } from '@type-dom/framework';
import { Menu } from './menu';

export interface IMenusConfig extends ITypeConfig {
  router?: Router;
}

export class Menus extends TypeDiv {
  className: 'Menus';
  selectedMenu?: Menu;
  private router?: Router;

  constructor(params: IMenusConfig = {}) {
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
      paddingBottom: '40px'
    });
    this.useParams(params);
    this.router = params.router;
    console.log('ui-doc routerUI.routes is ', this.router);
    if (this.router) {
      this.createMenus(this, this.router.routes, this.router);
    }
    console.log('menus is ', this);
  }

  get menuRoot(): Menus {
    return this;
  }

  override mounted() {
    console.warn('menus mounted . ');
    // hash路由和history路由要分别判断
    let path;
    if (this.router?.mode === 'hash') {
      path = window.location.hash.slice(1);
    } else if (this.router?.mode === 'history') {
      path = window.location.pathname;
    }
    if (path === '/') {
      path = '/home';
    }
    const menuItem = this.down('route.path', path) as Menu;
    // 当前路由与菜单绑定路由一致，则选中状态
    this.setSelectedMenu(menuItem);
  }

  // /home '' '/' 首页菜单要单独处理
  createMenus(parent: Menus | Menu, routes: IRoute[], router: Router) {
    console.log('createMenus . ');
    routes.forEach((route) => {
      if (route.hidden) {
        return;
      }
      if (route?.path === '/' && route.redirect) {
        route = route.children!.find((item) => item.path === route.redirect)!;
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
            if (evt?.target instanceof HTMLElement || evt?.target instanceof SVGElement) {
              evt?.target.style.setProperty('cursor', 'auto');
            }
          }
        }
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
          backgroundColor: ''
        });
      }
      this.selectedMenu = menu;
      if (menu.route?.redirect === undefined) {
        menu.style.setObj({
          backgroundColor: '#ccc'
        });
      }
    }
  }
}
