import { MessageBoxProps } from '@type-dom/ui';

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
