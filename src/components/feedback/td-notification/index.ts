import Notify from './notify';

// export const ElNotification = withInstallFunction(Notify, '$notify')
export const TdNotification = Notify;
export default TdNotification;

export type * from './td-notification.interface';
