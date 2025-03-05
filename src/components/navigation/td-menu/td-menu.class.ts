import {
  flattedChildren,
  getCurrentInstance,
  nextTick,
  onMounted,
  provide,
  useResizeObserver,
  SvgSvg,
  TypeNode,
  TypeUL,
  UL, UseResizeObserverReturn, defineExpose, TypeFragment
} from '@type-dom/framework';
import { computed, effect, signal, unref, watch } from '@type-dom/signals';
import { ensureArray, isNil } from '@type-dom/utils';
import { useNamespace } from '../../../hooks/use-namespace/index';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { Menu as Menubar } from './utils/menu-bar';
import { TdSubMenu } from './td-sub-menu/td-sub-menu.class';
import { TdMenuCollapseTransition } from './td-menu-collapse-transition/td-menu-collapse-transition.class';
import { ITdMenu, MenuProps } from './td-menu.interface';
import { menuEmits, menuProps } from './td-menu.const';
import { useMenuCssVar } from './use-menu-css-var';
import { MenuProvider, SubMenuProvider } from './types';
import './style/index';

export class TdMenu extends TypeFragment implements ITdMenu {
  className: 'TdMenu';
  override props: MenuProps;

  constructor(params = {} as MenuProps) {
    super();
    // this.useTag('ul');
    this.className = 'TdMenu';

    this.addEmits(menuEmits);
    this.assignProps(menuProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;
    const instance = getCurrentInstance()! as TdMenu;
    // const router = instance?.root?.props.globalProperties.$router as Router
    const menu = signal<HTMLUListElement>()
    const nsMenu = useNamespace('menu')
    const nsSubMenu = useNamespace('sub-menu')

    // data
    const sliceIndex = signal(-1)

    const openedMenus = signal<string[]>(
      props.defaultOpeneds && !unref(props.collapse)
        ? props.defaultOpeneds.slice(0)
        : []
    )
    const activeIndex = signal<MenuProvider['activeIndex']>(unref(props.defaultActive))
    const items = signal<MenuProvider['items']>({})
    const subMenus = signal<MenuProvider['subMenus']>({})

    // computed
    const isMenuPopup = computed<MenuProvider['isMenuPopup']>(
      () =>
        props.mode === 'horizontal' ||
        (props.mode === 'vertical' && unref(props.collapse))
    )

    // methods
    const initMenu = () => {
      const activeItem = activeIndex.get() && items.get()[activeIndex.get()!]
      if (!activeItem || props.mode === 'horizontal' || props.collapse) return

      const indexPath = unref(activeItem.indexPath)

      // 展开该菜单项的路径上所有子菜单
      // expand all subMenus of the menu item
      indexPath.forEach((index) => {
        const subMenu = subMenus.get()[index!]
        subMenu && openMenu(index!, unref(subMenu.indexPath))
      })
    }

    const openMenu: MenuProvider['openMenu'] = (index, indexPath) => {
      if (openedMenus.get().includes(index)) return
      // 将不在该菜单路径下的其余菜单收起
      // collapse all menu that are not under current menu item
      if (props.uniqueOpened) {
        openedMenus.set(openedMenus.get().filter((index) =>
          indexPath.includes(index)
        ))
      }
      openedMenus.get().push(index)
      emit('open', index, indexPath)
    }

    const close = (index: string) => {
      const i = openedMenus.get().indexOf(index)
      if (i !== -1) {
        openedMenus.get().splice(i, 1)
      }
    }

    const closeMenu: MenuProvider['closeMenu'] = (index, indexPath) => {
      close(index)
      emit('close', index, indexPath)
    }

    const handleSubMenuClick: MenuProvider['handleSubMenuClick'] = ({ index, indexPath }) => {
      console.warn('handleSubMenuClick . ');
      const isOpened = openedMenus.get().includes(index)

      isOpened ? closeMenu(index, unref(indexPath)) : openMenu(index, unref(indexPath))
    }

    const handleMenuItemClick: MenuProvider['handleMenuItemClick'] = (
      menuItem
    ) => {
      console.warn('handleMenuItemClick . ');
      if (props.mode === 'horizontal' || unref(props.collapse)) {
        openedMenus.set([]);
      }
      const { index, indexPath } = menuItem
      if (isNil(index) || isNil(indexPath)) return

      // if (props.router && router) {
      //   const route = menuItem.route || index
      //   const routerResult = router.push(route).then((res: any) => {
      //     if (!res) activeIndex.set(index)
      //     return res
      //   })
      //   emit(
      //     'select',
      //     index,
      //     indexPath,
      //     { index, indexPath, route },
      //     routerResult
      //   )
      // } else {
      console.warn('index is ', index);
        activeIndex.set(index);
        emit('select', index, indexPath, { index, indexPath })
      // }
    }

    const updateActiveIndex = (val: string) => {
      const itemsInData = items.get()
      const item =
        itemsInData[val] ||
        (activeIndex.get() && itemsInData[activeIndex.get()!]) ||
        itemsInData[unref(props.defaultActive)!]

      activeIndex.set(item?.index ?? val)
    }

    const calcMenuItemWidth = (menuItem: HTMLElement) => {
      const computedStyle = getComputedStyle(menuItem)
      const marginLeft = Number.parseInt(computedStyle.marginLeft, 10)
      const marginRight = Number.parseInt(computedStyle.marginRight, 10)
      return menuItem.offsetWidth + marginLeft + marginRight || 0
    }

    const calcSliceIndex = () => {
      if (!menu.get()) return -1
      const items = Array.from(menu.get()?.childNodes ?? []).filter(
        (item) => item.nodeName !== '#text' || item.nodeValue
      ) as HTMLElement[]
      const moreItemWidth = 64
      const computedMenuStyle = getComputedStyle(menu.get()!)
      const paddingLeft = Number.parseInt(computedMenuStyle.paddingLeft, 10)
      const paddingRight = Number.parseInt(computedMenuStyle.paddingRight, 10)
      const menuWidth = menu.get()!.clientWidth - paddingLeft - paddingRight
      let calcWidth = 0
      let sliceIndex = 0
      items.forEach((item, index) => {
        if (item.nodeName === '#comment') return
        calcWidth += calcMenuItemWidth(item)
        if (calcWidth <= menuWidth - moreItemWidth) {
          sliceIndex = index + 1
        }
      })
      return sliceIndex === items.length ? -1 : sliceIndex
    }

    const getIndexPath = (index: string) => subMenus.get()[index].indexPath

    // Common computer monitor FPS is 60Hz, which means 60 redraws per second. Calculation formula: 1000ms/60 ≈ 16.67ms, In order to avoid a certain chance of repeated triggering when `resize`, set wait to 16.67 * 2 = 33.34
    const debounce = (fn: () => void, wait = 33.34) => {
      let timmer: ReturnType<typeof setTimeout> | null
      return () => {
        timmer && clearTimeout(timmer)
        timmer = setTimeout(() => {
          fn()
        }, wait)
      }
    }

    let isFirstTimeRender = true
    const handleResize = () => {
      if (sliceIndex.get() === calcSliceIndex()) return
      const callback = () => {
        sliceIndex.set(-1);
        nextTick(() => {
          sliceIndex.set(calcSliceIndex());
        })
      }
      // execute callback directly when first time resize to avoid shaking
      isFirstTimeRender ? callback() : debounce(callback)()
      isFirstTimeRender = false
    }

    watch(
      () => unref(props.defaultActive)!,
      (currentActive: string) => {
        if (!items.get()[currentActive!]) {
          activeIndex.set('');
        }
        updateActiveIndex(currentActive!)
      }
    )

    watch(
      () => unref(props.collapse),
      (value) => {
        if (value) openedMenus.set([]);
      }
    )

    watch(items, initMenu)

    let resizeStopper: UseResizeObserverReturn['stop']
    effect(() => {
      if (props.mode === 'horizontal' && props.ellipsis)
        resizeStopper = useResizeObserver(menu, handleResize).stop
      else resizeStopper?.()
    })

    const mouseInChild = signal(false)

    // provide
    // {
      const addSubMenu: MenuProvider['addSubMenu'] = (item) => {
        (subMenus.get() as any)[item.get().index] = item
      }

      const removeSubMenu: MenuProvider['removeSubMenu'] = (item) => {
        delete subMenus.get()[item.get().index]
      }

      const addMenuItem: MenuProvider['addMenuItem'] = (item) => {
        (items.get() as any)[item.get().index] = item
      }

      const removeMenuItem: MenuProvider['removeMenuItem'] = (item) => {
        delete items.get()[item.get().index]
      }
      provide<MenuProvider>('rootMenu', {
        props,
        openedMenus: openedMenus,
        items: items.get(),
        subMenus: subMenus.get(),
        activeIndex: activeIndex.get(),
        isMenuPopup: isMenuPopup.get(),

        addMenuItem,
        removeMenuItem,
        addSubMenu,
        removeSubMenu,
        openMenu,
        closeMenu,
        handleMenuItemClick,
        handleSubMenuClick,
      })
      provide<SubMenuProvider>(`subMenu:${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        mouseInChild,
        level: 0,
      })
    // }

    // lifecycle
    onMounted(() => {
      if (props.mode === 'horizontal') {
        new Menubar(instance.dom!, nsMenu.namespace.get())
      }
    })

    // {
      const open = (index: string) => {
        const { indexPath } = subMenus.get()[index]
        unref(indexPath).forEach((i) => openMenu(i!, unref(indexPath)))
      }

      defineExpose({
        open,
        close,
        handleResize,
      })
    // }

    const ulStyle = useMenuCssVar(props, 0)
    // this.slotChildren(props.slot);
    let slot = ensureArray(props.slot) as TypeNode[];
    const vShowMore: TdSubMenu[] = []

    if (props.mode === 'horizontal' && menu.get()) {
      const originalSlot = flattedChildren(slot)
      const slotDefault =
        sliceIndex.get() === -1
          ? originalSlot
          : originalSlot.slice(0, sliceIndex.get())

      const slotMore =
        sliceIndex.get() === -1 ? [] : originalSlot.slice(sliceIndex.get())

      if (slotMore?.length && props.ellipsis) {
        slot = slotDefault
        vShowMore.push(
          new TdSubMenu(  {
            sIndex: 'sub-menu-more',
            class: nsSubMenu.e('hide-arrow'),
            popperOffset: props.popperOffset,
            slots: {
              title: () =>
                new TdIcon({
                  class: nsSubMenu.e('icon-more'),
                  slot: new (props.ellipsisIcon as typeof SvgSvg)(),
                }),
              default: slotMore,
            }
          })
        )
      }
    }

    // todo clickoutside
    // const directives: DirectiveArguments = props.closeOnClickOutside
    //   ? [
    //     [
    //       vClickoutside,
    //       () => {
    //         if (!openedMenus.value.length) return
    //
    //         if (!mouseInChild.value) {
    //           openedMenus.value.forEach((openedMenu) =>
    //             emit('close', openedMenu, getIndexPath(openedMenu))
    //           )
    //
    //           openedMenus.value = []
    //         }
    //       },
    //     ],
    //   ]
    //   : []

    const vMenu = new UL({
      // key: String(props.collapse),
      refDom: menu,
      attrObj: {
        role: 'menubar',
        class: props.class,
      },
      styleObj: ulStyle.get(),
      class: {
        [nsMenu.b()]: true,
        [nsMenu.m(props.mode)]: true,
        [nsMenu.m('collapse')]: props.collapse,
      },
      slot: [...slot, ...vShowMore],
      // directives
    })
    console.log('vMenu is ', vMenu);
    if (props.collapseTransition && props.mode === 'vertical') {
      this.addChild(new TdMenuCollapseTransition({
        slot: vMenu
      }))
    } else {
      this.addChild(vMenu)
    }
  }
}
