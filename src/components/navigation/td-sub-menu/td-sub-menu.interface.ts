import { ITypeFragment, TypeFragmentProps, TypeSvgSvg } from '@type-dom/framework';

export interface ITdSubMenu extends ITypeFragment {
  className: 'TdSubMenu';
}

export interface TdSubMenuProps extends TypeFragmentProps {
  /**
   * @description unique identification
   *     required: true,
   */
  sIndex?: string,
  /**
   * @description timeout before showing a sub-menu(inherit `show-timeout` of the menu by default.)
   */
  showTimeout?: number,
  /**
   * @description timeout before hiding a sub-menu(inherit `hide-timeout` of the menu by default.)
   */
  hideTimeout?: number,
  /**
   * @description custom class name for the popup menu
   */
  popperClass?: string,
  /**
   * @description whether the sub-menu is disabled
   */
  disabled?: boolean,
  /**
   * @description whether popup menu is teleported to the body
   *     default: undefined,
   */
  teleported?: boolean,
  /**
   * @description offset of the popper (overrides the `popper` of menu)
   */
  popperOffset?: number,
  /**
   * @description Icon when menu are expanded and submenu are closed, `expand-close-icon` and `expand-open-icon` need to be passed together to take effect
   * type: iconPropType,
   */
  expandCloseIcon?: typeof TypeSvgSvg;

  /**
   * @description Icon when menu are expanded and submenu are opened, `expand-open-icon` and `expand-close-icon` need to be passed together to take effect
   */
  expandOpenIcon?: typeof TypeSvgSvg;
  //   type: iconPropType,
  /**
   * @description Icon when menu are collapsed and submenu are closed, `collapse-close-icon` and `collapse-open-icon` need to be passed together to take effect
   */
  collapseCloseIcon?: typeof TypeSvgSvg;
  //   type: iconPropType,
  /**
   * @description Icon when menu are collapsed and submenu are opened, `collapse-open-icon` and `collapse-close-icon` need to be passed together to take effect
   */
  collapseOpenIcon?: typeof TypeSvgSvg;
  //   type: iconPropType,
}
