import { InjectionKey } from '@type-dom/framework';
import { IRoleTypes } from './td-popper.interface';


/**
 * triggerRef indicates the element that triggers popper
 * contentRef indicates the element of popper content
 * referenceRef indicates the element that popper content relative with
 */
export type TdPopperInjectionContext = {
  triggerRef:any;
  contentRef: any;
  popperInstanceRef: any;
  referenceRef: any;
  role: IRoleTypes;
}

export const POPPER_INJECTION_KEY: InjectionKey<TdPopperInjectionContext> = Symbol('popper');


export type TdPopperContentInjectionContext = {
  arrowRef: any;
  arrowOffset: any;
  arrowStyle: any;
}

export const POPPER_CONTENT_INJECTION_KEY: InjectionKey<TdPopperContentInjectionContext> = Symbol('popperContent')
