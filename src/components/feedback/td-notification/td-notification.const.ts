import { NotificationProps } from './td-notification.interface';

export const notificationTypes = [
  'success',
  'info',
  'warning',
  'error',
] as const;

export const notificationProps: NotificationProps = {
  customClass: '',
  duration: 4500,
  id: '',
  message: '',
  offset: 0,
  onClick: () => undefined,
  position: 'top-right',
  showClose: true,
  title: '',
  type: '',
};

export const notificationEmits = {
  destroy: () => true,
};
