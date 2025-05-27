import { TypeSvgSvg, ITypeFragment, TypeFragmentProps } from '@type-dom/framework';
import { PopperEffect } from '../../feedback/td-popper/td-popper.const';
import { MaybeRef } from '@type-dom/signals';

export interface ITdMenu extends ITypeFragment {
  className: 'TdMenu';
}

export interface MenuProps extends TypeFragmentProps {
  /**
   * @description menu display mode
   */
  mode?: 'horizontal' | 'vertical';
  //   type: String,
  //   values: ['horizontal', 'vertical'],
  //   default: 'vertical',
  // },
  /**
   * @description index of active menu on page load
   *     default: '',
   */
  defaultActive?: MaybeRef<string>;
  /**
   * @description array that contains indexes of currently active sub-menus
   */
  defaultOpeneds?: string[];
  //   type: definePropType<string[]>(Array),
  //   default: () => mutable([] as const),
  // },
  /**
   * @description whether only one sub-menu can be active
   */
  uniqueOpened?: boolean,
  /**
   * @description whether `vue-router` mode is activated. If true, index will be used as 'path' to activate the route action. Use with `default-active` to set the active item on load.
   */
  router?: boolean,
  /**
   * @description how sub-menus are triggered, only works when `mode` is 'horizontal'
   */
  menuTrigger?: 'hover' | 'click';
  //   type: String,
  //   values: ['hover', 'click'],
  //   default: 'hover',
  // },
  /**
   * @description whether the menu is collapsed (available only in vertical mode)
   */
  collapse?: MaybeRef<boolean>,
  /**
   * @description background color of Menu (hex format) (deprecated, use `--bg-color` instead)
   * @deprecated use `--bg-color` instead
   */
  backgroundColor?: string,
  /**
   * @description text color of Menu (hex format) (deprecated, use `--text-color` instead)
   * @deprecated use `--text-color` instead
   */
  textColor?: string,
  /**
   * @description text color of currently active menu item (hex format) (deprecated, use `--active-color` instead)
   * @deprecated use `--active-color` instead
   */
  activeTextColor?: string,
  /**
   * @description optional, whether menu is collapsed when clicking outside
   */
  closeOnClickOutside?: boolean,
  /**
   * @description whether to enable the collapse transition
   *     default: true,
   */
  collapseTransition?: boolean;
  /**
   * @description whether the menu is ellipsis (available only in horizontal mode)
   *     default: true,
   */
  ellipsis?: boolean,
  /**
   * @description offset of the popper (effective for all submenus)
   *     default: 6,
   */
  popperOffset?: number,
  /**
   * @description custom ellipsis icon (available only in horizontal mode and ellipsis is true)
   *     type: iconPropType,
   *     default: () => ElMoreSvg,
   *   },
   */
  ellipsisIcon?: typeof TypeSvgSvg;
  /**
   * @description Tooltip theme, built-in theme: `dark` / `light` when menu is collapsed
   *     default: 'dark',
   */
  popperEffect?: PopperEffect;
  /**
   * @description custom class name for all popup menus
   */
  popperClass?: string,
  /**
   * @description control timeout for all menus before showing
   *     default: 300,
   */
  showTimeout?: number,
  /**
   * @description control timeout for all menus before hiding
   *     default: 300,
   */
  hideTimeout?: number,
  /**
   * @description when menu inactive and `persistent` is `false` , dropdown menu will be destroyed
   *     default: true,
   */
  persistent?: boolean,
}
