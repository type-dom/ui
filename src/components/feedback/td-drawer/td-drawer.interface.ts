import { IUI } from '../../../ui/ui.interface';
import { ITdDialogConfig } from '../td-dialog/td-dialog.interface';

export interface ITdDrawer extends IUI {
  className: 'TdDrawer';
}

export interface ITdDrawerConfig extends ITdDialogConfig {
  direction?: 'ltr' | 'rtl' | 'ttb' | 'btt'; // default: 'rtl',
  size?: string | number; // default: '30%',
  withHeader?: boolean; // default: true,
  modalFade?: boolean; //default: true,
  headerAriaLevel?: string; // default: '2',
}
