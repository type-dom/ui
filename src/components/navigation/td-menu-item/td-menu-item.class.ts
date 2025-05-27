import {
  defineExpose, Div, Fragment,
  getCurrentInstance,
  inject, LI,
  onBeforeUnmount,
  onMounted,
  TypeFragment,
  TypeMenuItem,
} from '@type-dom/framework';
import { throwError } from '@type-dom/utils';
import { computed, signal, unref, Computed } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdTooltip } from '../../feedback/td-tooltip/td-tooltip.class';
import useMenu from '../td-menu/use-menu';
import { TdMenu } from '../td-menu/td-menu.class';
import { TdSubMenu } from '../td-sub-menu/td-sub-menu.class';
import { MenuItemRegistered, MenuProvider, SubMenuProvider } from '../td-menu/types';
import { ITdMenuItem, TdMenuItemProps } from './td-menu-item.interface';
import {menuItemEmits, menuItemProps} from './td-menu-item.const';
import './style';

const COMPONENT_NAME = 'TdMenuItem';
export class TdMenuItem extends TypeFragment implements ITdMenuItem {
  className: typeof COMPONENT_NAME;
  override props: TdMenuItemProps;
  parentMenu?: Computed<TdMenu | TdSubMenu>;
  rootMenu?: MenuProvider;
  active?: Computed<boolean>;
  nsMenu?: ReturnType<typeof useNamespace>;
  nsMenuItem?: ReturnType<typeof useNamespace>;
  handleClick?: () => void;

  constructor(params: TdMenuItemProps = {}) {
    super();
    this.className = COMPONENT_NAME;
    this.addEmits(menuItemEmits);
    this.assignProps(menuItemProps);
    this.props = this.useParams(params);
  }

  override setup() {

    const props = this.props;
    const emit = this.emit;

    const instance = getCurrentInstance()! as TypeMenuItem;
    const rootMenu = inject<MenuProvider>('rootMenu');
    const nsMenu = useNamespace('menu');
    const nsMenuItem = useNamespace('menu-item');
    if (!rootMenu) throwError(COMPONENT_NAME, 'can not inject root menu');

    const { parentMenu, indexPath } = useMenu(instance, signal(props.mIndex!));

    const subMenu = inject<SubMenuProvider>(`subMenu:${parentMenu.get().uid}`);
    if (!subMenu) throwError(COMPONENT_NAME, 'can not inject sub menu');

    console.warn('TdMenuItem props.mIndex is ', props.mIndex, 'rootMenu.activeIndex is ', rootMenu.activeIndex)
    const active = computed(() => props.mIndex === rootMenu.activeIndex?.get());
    const item = {
      index: props.mIndex,
      indexPath: indexPath,
      active: active,
    } as MenuItemRegistered;

    const handleClick = () => {
      console.warn('TdMenuItem handleClick ');
      if (!props.disabled) {
        rootMenu.handleMenuItemClick({
          index: props.mIndex!,
          indexPath: indexPath.get(),
          route: props.route,
        });
        emit('click', item);
      }
    };

    onMounted(() => {
      subMenu.addSubMenu(item);
      rootMenu.addMenuItem(item);
    });

    onBeforeUnmount(() => {
      subMenu.removeSubMenu(item);
      rootMenu.removeMenuItem(item);
    });

    defineExpose({
      parentMenu,
      rootMenu,
      active,
      nsMenu,
      nsMenuItem,
      handleClick,
    });

    this.addChild(new LI({
      class: computed(() => [
        nsMenuItem.b(),
        nsMenuItem.is('active', active.get()), // todo computed
        nsMenuItem.is('disabled', props.disabled),
      ]),
      attrObj: {
        role: 'menuitem',
        tabindex: '-1',
      },
      events: {
        click: handleClick,
      },
      slot: parentMenu.get()?.className === 'TdMenu' &&
        unref(rootMenu.props.collapse?.get()) &&
        props.slots?.title
      ? new TdTooltip({
        effect: rootMenu.props.popperEffect?.get(),
        placement: 'right',
        fallbackPlacements: ['left'],
        persistent: rootMenu.props.persistent?.get(),
        slot: new Div({
          class: nsMenu.be('tooltip', 'trigger'),
          slot: props.slot,
        }),
        slots: {
          content: props.slots?.title,
        }
      })
        : [
          new Fragment({
            slot: props.slot ?? props.slots?.default,
          }),
          new Fragment({
            slot: props.slots?.title,
          })
        ]
    }))
  }
}
