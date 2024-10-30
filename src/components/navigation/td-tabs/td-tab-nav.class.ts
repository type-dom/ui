import { capitalize, EVENT_CODE } from '@type-dom/utils';
import {
  Div,
  Span,
  nextTick,
  TextNode,
  TypeElement, U
} from '@type-dom/framework';
import { ElArrowLeftSvg, ElArrowRightSvg, ElCloseSvg } from '@type-dom/svgs';
import { UI } from '../../../ui/ui.abstract';
import { $colors, $textColor } from '../../../styles/var';
import {
  $tabsItemStyle, $tabsNavScrollStyle,
  $tabsNavStyle, $tabsNavWrapAfterStyle,
  $tabsNavWrapStyle
} from './td-tabs.style';
import {
  IScrollable,
  ITdTabNav,
  ITdTabNavConfig,
} from './td-tab-nav.interface';
import { TdTabBar } from './td-tab-bar.class';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { TdTabs } from './td-tabs.class';

export class TdTabNav extends UI implements ITdTabNav {
  className: 'TdTabNav';
  override props: ITdTabNavConfig
  scrollBtn?: Span[];
  nav: Div;
  scrollable: IScrollable | false;
  private navScroll?: Div;
  private navOffset?: number;
  private sizeName: 'width' | 'height';
  // private el$?: Div; // this
  private rootTabs?: TdTabs;
  private focusable?: boolean;
  private isFocus: boolean;
  private tabBar?: TdTabBar;
  tabs: Div[] = [];

  constructor(params: ITdTabNavConfig = {}) {
    super();
    this.className = 'TdTabNav';
    this.attr.addName('td-tab-nav-wrap');
    this.style.addObj($tabsNavWrapStyle);
    this.addChild(
      new U({
        name: 'underline',
        styleObj: $tabsNavWrapAfterStyle,
      })
    );
    this.scrollable = false;
    this.navOffset = 0;
    this.isFocus = false;
    this.focusable = true;
    this.rootTabs = params?.rootTabs;
    this.sizeName = ['top', 'bottom'].includes(
      this.rootTabs?.props.tabPosition || 'top'
    )
      ? 'width'
      : 'height';
    if (this.scrollable) {
      this.scrollBtn = [
        new Span({
          name: 'nav-prev',
          // ns.is('disabled', !scrollable.value.prev),
          styleObj: { ...$tabsNavScrollStyle, left: 0 },
          events: {
            click: (evt) => {
              this.scrollPrev();
            },
          },
          childNodes: [
            new TdIcon({
              svgObj: new ElArrowLeftSvg(),
            }),
          ],
        }),
        new Span({
          name: 'nav-next',
          //  ns.is('disabled', !scrollable.value.next),
          styleObj: { ...$tabsNavScrollStyle, right: 0 },
          events: {
            click: (evt) => {
              this.scrollNext();
            },
          },
          childNodes: [
            new TdIcon({
              svgObj: new ElArrowRightSvg(),
            }),
          ],
        }),
      ];
      this.slotChild(this.scrollBtn);
    }
    // <div class={ns.e('nav-scroll')} ref={navScroll$}>
    this.navScroll = new Div({
      name: 'nav-scroll',
    });
    this.addChild(this.navScroll);
    this.nav = new Div({
      name: 'td-tab-nav-wrap-inner',
      attrObj: {
        role: 'tablist',
      },
      //  ns.is(rootTabs.props.tabPosition),
      //  ns.is(
      //    'stretch',
      //    props.stretch &&
      //      ['top', 'bottom'].includes(rootTabs.props.tabPosition)
      //  ),
      styleObj: $tabsNavStyle,
      events: {
        keydown: (evt) => {
          this.changeTab(evt as KeyboardEvent);
        },
      },
    });
    this.navScroll.addChild(this.nav);
    if (!params.type) {
      this.tabBar = new TdTabBar({
        rootTabs: params?.rootTabs,
        tabs: params?.panes || [],
      });
      this.nav.addChild(this.tabBar);
    }
    this.tabs =
      params.panes?.map((pane, index) => {
        // const uid = pane.uid
        const disabled = pane.disabled;
        const active = this.rootTabs?.currentName === (pane.name ?? index);
        const tabindex = !disabled && active ? 0 : -1
        const tabName = pane.name ?? (index + 1);
        console.log('tabName is ', tabName);
        const item = new Div({
          name: 'tab-nav-item',
          //      ns.is(rootTabs.props.tabPosition),
          //         ns.is('active', pane.active),
          //         ns.is('disabled', disabled),
          //         ns.is('closable', closable),
          //         ns.is('focus', isFocus.value),
          attrObj: {
            tabName: tabName,
            //   aria-controls={`pane-${tabName}`}
            role: 'tab',
            ariaSelected: active,
            tabindex: tabindex
          },
          styleObj: $tabsItemStyle,
          events: {
            focus: () => {
              this.setFocus();
            },
            blur: () => {
              this.removeFocus();
            },
            click: (evt, ele) => {
              console.log('tab-nav-item click . ');
              this.removeFocus();
              // this.rootTabs.currentName = tabName;
              params.emits?.tabClick?.(pane, tabName, evt as MouseEvent);
              // tabClick是上级 tabs 的事件监听器，不是tabNav的；
              // this.emit('tabClick', pane, tabName, evt);
              nextTick(() => {
                this.selectTab(ele);
              });
            },
            keydown: (ev) => {
              if (
                closable &&
                (ev?.code === EVENT_CODE.delete || ev?.code === EVENT_CODE.backspace)
              ) {
                // emit('tabRemove', pane, ev);
                params.emits?.tabRemove?.(pane, ev);
              }
            },
          },
        });
        if (tabName === this.rootTabs?.currentName) {
          item.style.addObj({
            color: $colors.primary.base,
          });
        } else {
          item.style.addObj({
            color: $textColor.regular,
          });
        }
        // const tabLabelContent = pane.slots?.label || pane?.label;
        if (pane.slots?.label) {
          item.slotChild(pane.slots.label);
        } else if (pane.label) {
          item.addChild(new TextNode(pane.label));
        }

        const closable =
          !disabled &&
          (pane.closable || this.rootTabs?.props.closable || params.editable);
        // pane.index = `${index}`

        if (closable) {
          const btnClose = new TdIcon({
            name: 'is-icon-close',
            svgObj: new ElCloseSvg(),
            events: {
              click: (evt) => {
                console.log('btnClose click . ');
                params.emits?.tabRemove?.(pane, evt as Event);
              },
            },
          });
          item.addChild(btnClose);
        }
        return item;
      }) || [];
    console.log('this.tabs is ', this.tabs);
    this.nav.addChildren(...this.tabs);
    this.nav.style.addObj(this.navStyle);
    this.props = this.useParams(params);
  }

  override mounted() {
    setTimeout(() => this.scrollToActiveTab(), 0);
    nextTick().then(() => {
      this.tabBar?.change();
    });
  }

  get navStyle() {
    const dir = this.sizeName === 'width' ? 'X' : 'Y';
    return {
      transform: `translate${dir}(-${this.navOffset}px)`,
    };
  }

  scrollPrev() {
    if (!this.navScroll) return;

    const containerSize =
      this.navScroll?.dom[
        `offset${capitalize(this.sizeName)}` as 'offsetWidth' | 'offsetHeight'
      ];
    const currentOffset = this.navOffset;

    if (!currentOffset) return;

    const newOffset =
      currentOffset > containerSize ? currentOffset - containerSize : 0;

    this.navOffset = newOffset;
  }

  scrollNext() {
    if (!this.navScroll || !this.nav) return;

    const navSize =
      this.nav?.dom[
        `offset${capitalize(this.sizeName)}` as 'offsetWidth' | 'offsetHeight'
      ];
    const containerSize =
      this.navScroll?.dom[
        `offset${capitalize(this.sizeName)}` as 'offsetWidth' | 'offsetHeight'
      ];
    const currentOffset = this.navOffset || 0;

    if (navSize - currentOffset <= containerSize) return;

    const newOffset =
      navSize - currentOffset > containerSize * 2
        ? currentOffset + containerSize
        : navSize - containerSize;

    this.navOffset = newOffset;
  }

  async scrollToActiveTab() {
    const nav = this.nav?.dom;
    if (!this.scrollable || !this.navScroll || !nav) return;

    await nextTick();

    const activeTab = this.dom.querySelector('.is-active');
    if (!activeTab) return;

    const navScroll = this.navScroll?.dom;
    const isHorizontal = ['top', 'bottom'].includes(
      this.rootTabs?.props.tabPosition || 'top'
    );
    const activeTabBounding = activeTab.getBoundingClientRect();
    const navScrollBounding = navScroll?.getBoundingClientRect();
    const maxOffset = isHorizontal
      ? nav.offsetWidth - navScrollBounding.width
      : nav.offsetHeight - navScrollBounding.height;
    const currentOffset = this.navOffset || 0;
    let newOffset = currentOffset;

    if (isHorizontal) {
      if (activeTabBounding.left < navScrollBounding.left) {
        newOffset =
          currentOffset - (navScrollBounding.left - activeTabBounding.left);
      }
      if (activeTabBounding.right > navScrollBounding.right) {
        newOffset =
          currentOffset + activeTabBounding.right - navScrollBounding.right;
      }
    } else {
      if (activeTabBounding.top < navScrollBounding.top) {
        newOffset =
          currentOffset - (navScrollBounding.top - activeTabBounding.top);
      }
      if (activeTabBounding.bottom > navScrollBounding.bottom) {
        newOffset =
          currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom);
      }
    }
    newOffset = Math.max(newOffset, 0);
    this.navOffset = Math.min(newOffset, maxOffset);
  }

  change() {
    if (!this.nav || !this.navScroll) return;

    this.props.stretch && this.tabBar?.change();

    const navSize =
      this.nav?.dom[
        `offset${capitalize(this.sizeName)}` as 'offsetWidth' | 'offsetHeight'
      ];
    const containerSize =
      this.navScroll?.dom[
        `offset${capitalize(this.sizeName)}` as 'offsetWidth' | 'offsetHeight'
      ];
    const currentOffset = this.navOffset || 0;

    if (containerSize < navSize) {
      this.scrollable = this.scrollable || {};
      this.scrollable.prev = currentOffset;
      this.scrollable.next = currentOffset + containerSize < navSize;
      if (navSize - currentOffset < containerSize) {
        this.navOffset = navSize - containerSize;
      }
    } else {
      this.scrollable = false;
      if (currentOffset > 0) {
        this.navOffset = 0;
      }
    }
  }

  selectTab(item: TypeElement | undefined) {
    console.log('selectTab is ', item);
    this.tabBar?.change();
    this.tabs.forEach((tab) => {
      if (item === tab) {
        tab.style.setObj({
          color: $colors.primary.base,
        });
      } else {
        tab.style.setObj({
          color: $textColor.regular,
        });
      }
    });
  }

  changeTab(e: KeyboardEvent) {
    const code = e.code;

    const { up, down, left, right } = EVENT_CODE;
    if (![up, down, left, right].includes(code)) return;

    // 左右上下键更换tab
    const tabList = Array.from(
      (e.currentTarget as HTMLDivElement).querySelectorAll<HTMLDivElement>(
        '[role=tab]:not(.is-disabled)'
      )
    );
    const currentIndex = tabList.indexOf(e.target as HTMLDivElement);

    let nextIndex: number;
    if (code === left || code === up) {
      // left
      if (currentIndex === 0) {
        // first
        nextIndex = tabList.length - 1;
      } else {
        nextIndex = currentIndex - 1;
      }
    } else {
      // right
      if (currentIndex < tabList.length - 1) {
        // not last
        nextIndex = currentIndex + 1;
      } else {
        nextIndex = 0;
      }
    }
    tabList[nextIndex].focus({ preventScroll: true }); // 改变焦点元素
    tabList[nextIndex].click(); // 选中下一个tab
    this.setFocus();
  }

  setFocus() {
    if (this.focusable) this.isFocus = true;
  }

  removeFocus() {
    this.isFocus = false;
  }
}
