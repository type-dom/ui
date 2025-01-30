import { DialogContentProps } from './td-dialog-content.interface';

export const dialogContentProps: DialogContentProps = {
  showClose: true,
  title: '',
  ariaLevel: '2',
};

export const dialogContentEmits = {
  close: () => true,
};
