import { Div, SvgSvg, TypeMenu, TypeProps, onMounted } from '@type-dom/framework';
import { Router, RouteRecordNormalized, RouteRecordRaw, useRoute } from '@type-dom/router';
import { ElCaretBottomSvg, ElCaretLeftSvg } from '@type-dom/svgs';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { Menus } from './menus';

export interface MenuProps extends TypeProps {
  route: RouteRecordNormalized | RouteRecordRaw;
  router?: Router;
  width?: string;
}

export class Menu extends TypeMenu {
  className: 'Menu';
  route?: RouteRecordNormalized | RouteRecordRaw;
  router?: Router;
  override parent?: Menu | Menus = undefined;
  contentItem: Div;
  menuItems: Menu[];
  collapsed?: boolean;
  caret?: TdIcon;

  constructor(params: MenuProps) {
    // console.log('Menu constructor . ');
    super();
    this.className = 'Menu';
    this.route = params.route;
    this.router = params.router;
    this.style.addObj({
      paddingInlineStart: '20px',
      // display: 'flex',
      // flexDirection: 'column',
    });
    const div = new Div({
      parent: this,
      styleObj: {
        display: 'flex',
        alignItems: 'center',
      },
    });
    if (this.route.meta?.svgObj) {
      div.addChild(
        new TdIcon({
          slot: this.route.meta.svgObj as SvgSvg,
          styleObj: {
            paddingRight: '5px',
          },
        })
      );
    }
    div.addChild(
      new Div({
        slot: this.route.name as string,
        attrObj: {
          name: 'route-name',
        },
        styleObj: {
          width: params.width ?? '160px',
        },
      })
    );
    if (this.route.children) {
      const caret = new TdIcon({
        slot: new ElCaretBottomSvg(),
        // size: '30px'
      });
      div.addChild(caret);
      // caret.appendParent(div);
      this.caret = caret;
    }
    // div.appendParent(this);
    this.addChild(div);
    this.contentItem = div;
    this.menuItems = [];
    this.useParams(params);
  }

  get menuRoot(): Menus | undefined {
    return this.parent?.menuRoot;
  }

  override setup() {
    const route = useRoute();
    // console.warn('route.get().fullPath is ', route.get().fullPath);
    if (this.route?.redirect === undefined) {
      // todo addEvent 如何pipe ??
      this.contentItem.addEvents({
        click: (event) => {
          console.log('menu click . ');
          if (this.menuRoot?.selectedMenu === this) {
            return;
          }
          console.error('then push path ', this.route?.path);
          const fullPath = this.router?.resolve(this.route!).fullPath;
          if (fullPath) this.router?.push(fullPath);
          this.menuRoot?.setSelectedMenu(this);
          if (this.route?.path) document.title = this.route.path;
          event?.stopPropagation(); // 防止冒泡
          event?.preventDefault();
        },
      });
    } else {
      //   todo 添加展开、收起的监听
      const leftSvg = new ElCaretLeftSvg();
      // console.log(' leftSvg.resetSize ');
      // leftSvg.resetSize('1.5em', '1.5em');
      // leftSvg.style.setObj({
      //   width: '1.5em',
      //   height: '1.5em'
      // })
      const bottomSvg = new ElCaretBottomSvg();
      // bottomSvg.style.setObj({
      //   width: '1.5em',
      //   height: '1.5em'
      // })
      // bottomSvg.resetSize('1.5em', '1.5em');
      this.contentItem.addEvent('click', (event) => {
        // console.warn('click .');
        if (this.menuRoot?.selectedMenu === this) {
          return;
        }
        if (this.collapsed === undefined || this.collapsed === false) {
          this.collapsed = true;
          this.menuItems.forEach((menu) => {
            menu.style.setObj({
              display: 'none',
            });
          });
          this.caret?.slotChildren(leftSvg);
          // this.caret?.replaceSvg(leftSvg); // 左三角
        } else {
          this.collapsed = false;
          this.menuItems.forEach((menu) => {
            menu.style.setObj({
              display: 'block',
            });
          });
          this.caret?.slotChildren(bottomSvg); // 向下三角
        }
        event?.stopPropagation(); // 防止冒泡
        event?.preventDefault();
      });
    }
    onMounted(() => {
      // console.warn('mounted .  this.route is ', this.route);
      const fullPath = this.router?.resolve(this.route!).fullPath;
      if (route.get().fullPath === fullPath) { // todo
        this.menuRoot?.setSelectedMenu(this);
        if (this.route?.path) document.title = this.route.path;
      }
    })
  }
}
