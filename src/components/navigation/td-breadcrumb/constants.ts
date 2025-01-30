// import type { InjectionKey } from 'vue'
import { InjectionKey } from '@type-dom/framework';
import type { BreadcrumbProps } from './td-breadcrumb.interface';

export const breadcrumbKey: InjectionKey<BreadcrumbProps> =
  Symbol('breadcrumbKey');
