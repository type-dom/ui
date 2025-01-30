import { isClient } from '@type-dom/utils';
import { MessageProps } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export const messageDefaults: MessageProps = {
  // customClass: '',
  center: false,
  dangerouslyUseHTMLString: false,
  duration: 3000,
  // icon: undefined,
  // id: '',
  // message: '',
  // onClose: undefined,
  showClose: false,
  type: 'info',
  plain: false,
  offset: 16,
  zIndex: 0,
  grouping: false,
  repeatNum: signal(1),
  appendTo: isClient ? document.body : (undefined as never),
} as const;

export const messageEmits = {
  destroy: () => true,
};

export const messageTypes = ['success', 'info', 'warning', 'error'] as const;
