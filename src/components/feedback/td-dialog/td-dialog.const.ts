import { isBoolean } from '@type-dom/utils';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { DialogProps } from './td-dialog.interface';
// import { dialogContentProps } from '../td-dialog-content/td-dialog-content.const';

export const dialogProps: DialogProps = {
  showClose: true,
  title: '',
  ariaLevel: '2',
  // ...dialogContentProps,
  appendTo: 'body',
  closeOnClickModal: true,
  closeOnPressEscape: true,
  lockScroll: true,
  modal: true,
  openDelay: 0,
  closeDelay: 0,
  headerAriaLevel: '2',
};

export const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value: boolean) => isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true,
};
