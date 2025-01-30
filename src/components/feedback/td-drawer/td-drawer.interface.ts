import { ITypeElement } from '@type-dom/framework';
import { DialogProps } from '../td-dialog/td-dialog.interface';

export interface ITdDrawer extends ITypeElement {
  className: 'TdDrawer';
}

export interface DrawerProps extends DialogProps {
  direction?: 'ltr' | 'rtl' | 'ttb' | 'btt'; // default: 'rtl',
  size?: string | number; // default: '30%',
  withHeader?: boolean; // default: true,
  modalFade?: boolean; //default: true,
  headerAriaLevel?: string; // default: '2',
}
