import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdPopper extends IUI {
  className: 'TdPopper';
}

export type IRoleTypes = 'dialog' | 'grid' | 'group' | 'listbox' | 'menu' | 'navigation' | 'tooltip' | 'tree';

export interface ITdPopperConfig extends IUIConfig {
  /**
   *     default: 'tooltip',
   */
  role?: IRoleTypes;
  // role: {
  //   type: String,
  //   values: roleTypes,
  //   default: 'tooltip',
  // },
}
