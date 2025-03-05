import { MessageBoxProps } from './td-message-box.interface';

export const messageBoxProps: MessageBoxProps = {
  modal: true,
  lockScroll: true,
  showClose: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  closeOnHashChange: true,
  roundButton: false,
  container: 'body',
  boxType: '',
};

export const emits = ['vanish', 'action'];
