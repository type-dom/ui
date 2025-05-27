import {
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  useTimeoutFn,
  defineExpose,
  TypeFragment,
  Fragment,
  Div,
  UL,
  LI,
  SvgSvg
} from '@type-dom/framework';
import { throwError } from '@type-dom/utils';
import { Placement } from '@type-dom/popper';
import { Computed, computed, signal, unref, watch } from '@type-dom/signals';
import { ElArrowDownSvg, ElArrowRightSvg } from '@type-dom/svgs';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdTooltip } from '../../feedback/td-tooltip/td-tooltip.class';
import { TdCollapseTransition } from '../../data/td-collapse-transition/td-collapse-transition.class';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import useMenu from '../td-menu/use-menu';
import { MenuItemRegistered, MenuProvider, SubMenuProvider } from '../td-menu/types';
import { useMenuCssVar } from '../td-menu/use-menu-css-var';
import { ITdSubMenu, TdSubMenuProps } from './td-sub-menu.interface';
import './style/index';

const COMPONENT_NAME = 'TdSubMenu'

export class TdSubMenu extends TypeFragment implements ITdSubMenu {
  className: 'TdSubMenu';
  override props: TdSubMenuProps;
  opened?: Computed<boolean>

  constructor(params: TdSubMenuProps = {}) {
    super();
    this.className = 'TdSubMenu';
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const instance = getCurrentInstance()! as TdSubMenu;
    const { indexPath, parentMenu } = useMenu(
      instance,
      computed(() => unref(props.sIndex))
    );
    const nsMenu = useNamespace('menu');
    const nsSubMenu = useNamespace('sub-menu');

    // inject
    const rootMenu = inject<MenuProvider>('rootMenu');
    if (!rootMenu) throwError(COMPONENT_NAME, 'can not inject root menu');

    const subMenu = inject<SubMenuProvider>(`subMenu:${parentMenu.get().uid}`);
    if (!subMenu) throwError(COMPONENT_NAME, 'can not inject sub menu');

    const items = signal({}) as MenuProvider['items'];
    const subMenus = signal({}) as MenuProvider['subMenus'];

    let timeout: (() => void) | undefined;
    const mouseInChild = signal(false);
    const verticalTitleRef = signal<HTMLDivElement>();
    const vPopper = signal<TdTooltip>();

    // computed
    const currentPlacement = computed<Placement>(() =>
      mode.get() === 'horizontal' && isFirstLevel.get()
        ? 'bottom-start'
        : 'right-start'
    );
    const subMenuTitleIcon = computed(() => {
      return (mode.get() === 'horizontal' && isFirstLevel.get()) ||
        (mode.get() === 'vertical' && !unref(rootMenu.props.collapse))
        ? props.expandCloseIcon && props.expandOpenIcon
          ? opened.get()
            ? props.expandOpenIcon
            : props.expandCloseIcon
          : ElArrowDownSvg
        : props.collapseCloseIcon && props.collapseOpenIcon
        ? opened.get()
          ? props.collapseOpenIcon
          : props.collapseCloseIcon
        : ElArrowRightSvg;
    });
    const isFirstLevel = computed(() => subMenu.level === 0);
    const appendToBody = computed(() => {
      const value = props.teleported;
      return value === undefined ? isFirstLevel.get() : value;
    });
    const menuTransitionName = computed(() =>
      unref(rootMenu.props.collapse)
        ? `${nsMenu.namespace.get()}-zoom-in-left`
        : `${nsMenu.namespace.get()}-zoom-in-top`
    );
    const fallbackPlacements = computed<Placement[]>(() =>
      mode.get() === 'horizontal' && isFirstLevel.get()
        ? [
            'bottom-start',
            'bottom-end',
            'top-start',
            'top-end',
            'right-start',
            'left-start',
          ]
        : [
            'right-start',
            'right',
            'right-end',
            'left-start',
            'bottom-start',
            'bottom-end',
            'top-start',
            'top-end',
          ]
    );
    const opened = computed(() => rootMenu.openedMenus.get().includes(unref(props.sIndex!)));
    const active = computed(() => {
      console.warn('items is ', items, 'subMenus is ', subMenus);
      return [...Object.values(items.get()), ...Object.values(subMenus.get())].some(
        ({ active }) => active.get()
      )
    });

    const mode = computed(() => rootMenu.props.mode?.get());
    const persistent = computed(() => rootMenu.props.persistent?.get());
    const item: MenuItemRegistered = { //  reactive({
      index: props.sIndex!,
      indexPath: indexPath,
      active: active,
    };

    const ulStyle = useMenuCssVar(rootMenu.props, subMenu.level + 1);

    const subMenuPopperOffset = computed(
      () => props.popperOffset ?? rootMenu.props.popperOffset?.get()
    );

    const subMenuPopperClass = computed(
      () => props.popperClass ?? rootMenu.props.popperClass?.get()
    );

    const subMenuShowTimeout = computed(
      () => props.showTimeout ?? rootMenu.props.showTimeout?.get()
    );

    const subMenuHideTimeout = computed(
      () => props.hideTimeout ?? rootMenu.props.hideTimeout?.get()
    );

    // methods
    const doDestroy = () =>
      vPopper.get()?.popperRef?.get()?.popperInstanceRef?.get()?.destroy();

    const handleCollapseToggle = (value: boolean) => {
      if (!value) {
        doDestroy();
      }
    };

    const handleClick = () => {
      console.warn('handleClick . ');
      if (
        (rootMenu.props.menuTrigger?.get() === 'hover' &&
          rootMenu.props.mode?.get() === 'horizontal') ||
        (rootMenu.props.collapse?.get() && rootMenu.props.mode?.get() === 'vertical') ||
        props.disabled
      )
        return;

      rootMenu.handleSubMenuClick({
        index: unref(props.sIndex!) ,
        indexPath: indexPath,
        active: active,
      });
    };

    const handleMouseenter = (
      event?: MouseEvent | FocusEvent,
      showTimeout = subMenuShowTimeout.get()
    ) => {
      console.warn('handleMouseenter');
      if (event?.type === 'focus') return;

      if (
        (rootMenu.props.menuTrigger?.get() === 'click' &&
          rootMenu.props.mode?.get() === 'horizontal') ||
        (!rootMenu.props.collapse?.get() && rootMenu.props.mode?.get() === 'vertical') ||
        props.disabled
      ) {
        subMenu.mouseInChild.set(true);
        return;
      }
      subMenu.mouseInChild.set(true);

      timeout?.();
      ({ stop: timeout } = useTimeoutFn(() => {
        rootMenu.openMenu(unref(props.sIndex!), indexPath.get());
      }, showTimeout!));

      if (appendToBody.get()) {
        console.warn('appendToBody.get() is true,  parentMenu?.get() is ', parentMenu?.get());
        // todo TdSubMenu TdMenu is a Fragment;
        parentMenu?.get().childNodes[0]?.dom?.dispatchEvent(new MouseEvent('mouseenter'));
      }
    };

    const handleMouseleave = (deepDispatch = false) => {
      if (
        (rootMenu.props.menuTrigger?.get() === 'click' &&
          rootMenu.props.mode?.get() === 'horizontal') ||
        (!unref(rootMenu.props.collapse) && rootMenu.props.mode?.get() === 'vertical')
      ) {
        subMenu.mouseInChild.set(false);
        return;
      }
      timeout?.();
      subMenu.mouseInChild.set(false);
      ({ stop: timeout } = useTimeoutFn(
        () =>
          !mouseInChild.get() &&
          rootMenu.closeMenu(unref(props.sIndex!), indexPath.get()),
        subMenuHideTimeout.get()!
      ));

      if (appendToBody.get() && deepDispatch) {
        subMenu.handleMouseleave?.(true);
      }
    };

    watch(
      () => unref(rootMenu.props.collapse),
      (value) => handleCollapseToggle(Boolean(value))
    );

    // provide
    // {
      const addSubMenu: SubMenuProvider['addSubMenu'] = (item) => {
        console.warn('addSubMenu . ');
        (subMenus.get() as any)[item.index] = item;
        subMenus.notify();
      };
      const removeSubMenu: SubMenuProvider['removeSubMenu'] = (item) => {
        console.warn('removeSubMenu . ');
        delete subMenus.get()[item.index];
        subMenus.notify();
      };
      provide<SubMenuProvider>(`subMenu:${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        handleMouseleave,
        mouseInChild,
        level: subMenu.level + 1,
      });
    // }

    // expose
    defineExpose({
      opened,
    })

    // lifecycle
    onMounted(() => {
      rootMenu.addSubMenu(item);
      subMenu.addSubMenu(item);
    });

    onBeforeUnmount(() => {
      subMenu.removeSubMenu(item);
      rootMenu.removeSubMenu(item);
    });

    const titleTag = [
      new Fragment({
        slot: props.slots?.title,
      }),
      new TdIcon({
        class: nsSubMenu.e('icon-arrow'),
        styleObj: {
          transform: computed(() => opened.get()
            ? (props.expandCloseIcon && props.expandOpenIcon) ||
            (props.collapseCloseIcon &&
              props.collapseOpenIcon &&
              unref(rootMenu.props.collapse))
              ? 'none'
              : 'rotateZ(180deg)'
            : 'none'),
        },
        // slot: isString(subMenuTitleIcon.get())
        //     ? h(instance.appContext.components[subMenuTitleIcon.get()])
        //     : h(subMenuTitleIcon.get()),
        slot:  new (subMenuTitleIcon.get() as typeof SvgSvg)(),
      }),
    ]

    // this render function is only used for bypass `Vue`'s compiler caused patching issue.
    const child = rootMenu.isMenuPopup
      ? new TdTooltip(
        {
          refEl: vPopper,
          visible: opened.get(),
          effect: 'light',
          pure: true,
          offset: subMenuPopperOffset.get(),
          showArrow: false,
          persistent: persistent.get(),
          popperClass: subMenuPopperClass.get(),
          placement: currentPlacement.get(),
          teleported: appendToBody.get(),
          fallbackPlacements: fallbackPlacements.get(),
          transition: menuTransitionName.get(),
          gpuAcceleration: false,
          slots: {
            content: new Div({
              class: [
                nsMenu.m(mode.get()),
                nsMenu.m('popup-container'),
                subMenuPopperClass.get(),
              ],
              events: {
                mouseenter: (evt?: MouseEvent) =>
                  handleMouseenter(evt, 100),
                mouseleave: () => handleMouseleave(true),
                focus: (evt?: FocusEvent) => handleMouseenter(evt, 100),
              },
              slot: new UL({
                class: [
                  nsMenu.b(),
                  nsMenu.m('popup'),
                  nsMenu.m(`popup-${currentPlacement.get()}`),
                ],
                styleObj: ulStyle.get(),
                slot: props.slot ?? props.slots?.default
              })
            }),
          },
          slot: new Div({
            class: nsSubMenu.e('title'),
            events: {
              click: handleClick,
            },
            slot: titleTag
          })
        },
      )
      : new Fragment({
        slot: [
          new Div({
              class: nsSubMenu.e('title'),
              refDom: verticalTitleRef,
            events: {
              click: handleClick,
            },
            slot: titleTag,
            },
          ),
          new TdCollapseTransition({
            slot: new UL({
                vShow: opened,
                class: [nsMenu.b(), nsMenu.m('inline')],
                attrObj: {
                  role: 'menu',
                },
                styleObj: ulStyle.get(),
                slot: props.slot ?? props.slots?.default
              })
          }),
        ]
      })

    this.addChild(new LI({
      class: computed(() => [
        nsSubMenu.b(),
        nsSubMenu.is('active', active.get()),
        nsSubMenu.is('opened', opened.get()),
        nsSubMenu.is('disabled', props.disabled),
      ]),
      attrObj: {
        role: 'menuitem',
        ariaHaspopup: true,
        ariaExpanded: opened.get()
      },
      events: {
        mouseenter: (evt) => handleMouseenter(evt),
        mouseleave: () => handleMouseleave(),
        focus: (evt) => handleMouseenter(evt),
      },
      slot: child,
    }))
  }
}
