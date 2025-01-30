import { InjectionKey, TypeElement, TypeHtml } from '@type-dom/framework';
import {
  TdPopperContentInjectionContext,
  TdPopperInjectionContext,
} from './td-popper.interface';

export const POPPER_INJECTION_KEY: InjectionKey<TdPopperInjectionContext> =
  Symbol('popper');

export const POPPER_CONTENT_INJECTION_KEY: InjectionKey<TdPopperContentInjectionContext> =
  Symbol('popperContent');
