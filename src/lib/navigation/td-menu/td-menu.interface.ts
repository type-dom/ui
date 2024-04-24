import { IUI, IUIConfig } from '../../ui.interface';

export interface ITdMenu extends IUI {
  className: 'TdMenu';
}

export interface ITdMenuConfig extends IUIConfig {
  mode?: 'horizontal' | 'vertical';  //  default: 'vertical',
  defaultActive?: string;  // default: '',
  // defaultOpeneds: {
  //   type: definePropType<string[]>(Array),
  //   default: () => mutable([] as const),
  // },
  uniqueOpened?: boolean;
  router?: boolean;
  menuTrigger?: 'hover' | 'click'; //  default: 'hover'
  collapse?: boolean;
  backgroundColor?: string;
  textColor?: string;
  activeTextColor?: string;
  closeOnClickOutside?: boolean;
  collapseTransition?: boolean; // default: true,
  ellipsis?: boolean; // default: true,
  popperOffset?: number; // default: 6,
  // ellipsisIcon: {
  //   type: iconPropType,
  //   default: () => More,
  // },
  popperEffect?: 'dark' | 'light'; // default: 'dark',
  popperClass?: string,
  showTimeout?: number; // default: 300,
  hideTimeout?: number; //default: 300,
}
