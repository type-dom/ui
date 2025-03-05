import {
  Div,
  TypeMenu,
  type IRoute,
  Router,
  TypeProps,
} from '@type-dom/framework';
import { ElCaretBottomSvg, ElCaretLeftSvg } from '@type-dom/svgs';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { Menus } from './menus';

export interface IMenuConfig extends TypeProps {
  route: IRoute;
  router?: Router;
  width?: string;
}

export class Menu extends TypeMenu {
  className: 'Menu';
  route?: IRoute;
  router?: Router;
  override parent?: Menu | Menus;
  contentItem: Div;
  menuItems: Menu[];
  collapsed?: boolean;
  caret?: TdIcon;

  constructor(params: IMenuConfig) {
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
    if (this.route.svgObj) {
      div.addChild(
        new TdIcon({
          slot: this.route.svgObj,
          styleObj: {
            paddingRight: '5px',
          },
        })
      );
    }
    div.addChild(
      new Div({
        slot: this.route.name,
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
      caret.appendParent(div);
      this.caret = caret;
    }
    div.appendParent(this);
    this.contentItem = div;
    this.menuItems = [];
    this.useParams(params);
  }

  get menuRoot(): Menus | undefined {
    return this.parent?.menuRoot;
  }

  override setup() {
    if (this.route?.redirect === undefined) {
      // todo addEvent 如何pipe ??
      this.contentItem.addEvents({
        click: (event) => {
          // console.log('click . ');
          if (this.menuRoot?.selectedMenu === this) {
            return;
          }
          this.router?.push(this.route!.path);
          this.menuRoot?.setSelectedMenu(this);
          document.title = 'UI - ' + this.route?.name;
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
        // console.log('click .');
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
          this.caret?.replaceSvg(leftSvg); // 左三角
        } else {
          this.collapsed = false;
          this.menuItems.forEach((menu) => {
            menu.style.setObj({
              display: 'block',
            });
          });
          this.caret?.replaceSvg(bottomSvg); // 向下三角
        }
        event?.stopPropagation(); // 防止冒泡
        event?.preventDefault();
      });
    }
  }
}
