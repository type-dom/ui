// import { Loading } from './src/service'
// import { vLoading } from './src/directive'
//
// import type { App } from 'vue'

// installer and everything in all
import { Loading } from './service';

export const TdLoading = {
  // install(app: App) {
  //   app.directive('loading', vLoading)
  //   app.config.globalProperties.$loading = Loading
  // },
  // directive: vLoading,
  service: Loading,
};

export default TdLoading;
export {
  // vLoading, vLoading as ElLoadingDirective,
  Loading as TdLoadingService,
};

export * from './types';
