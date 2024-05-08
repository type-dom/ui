import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdPopper extends IUI {
  className: 'TdPopper'
}

export interface ITdPopperConfig extends IUIConfig {
  /**
   *
   *     default: 'tooltip',
   */
  role?: 'dialog' | 'grid' | 'group' | 'listbox' | 'menu' | 'navigation' | 'tooltip' | 'tree';
  // role: {
  //   type: String,
  //   values: roleTypes,
  // },
}

export const roleTypes = [
  'dialog',
  'grid',
  'group',
  'listbox',
  'menu',
  'navigation',
  'tooltip',
  'tree',
] as const
