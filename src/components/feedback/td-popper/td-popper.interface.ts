import {
  ITypeFragment,
  TypeFragmentProps,
  TypeNode,
} from '@type-dom/framework';
import { Computed, Signal } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { Instance } from '@type-dom/popper';

export interface ITdPopper extends ITypeFragment {
  className: 'TdPopper';
}

export type RoleTypes =
  | 'dialog'
  | 'grid'
  | 'group'
  | 'listbox'
  | 'menu'
  | 'navigation'
  | 'tooltip'
  | 'tree';

export interface PopperProps extends TypeFragmentProps {
  /**
   *    default: 'tooltip',
   */
  role?: RoleTypes;
}

// const effects = ['light', 'dark'];
export type ITdPopperEffect = 'dark' | 'light';
// const triggers = ['click', 'contextmenu', 'hover', 'focus'];
export type ITdPopperTrigger = 'click' | 'hover' | 'focus' | 'context-menu';

export type Measurable = {
  getBoundingClientRect: () => DOMRect;
};

/**
 * triggerRef indicates the element that triggers popper
 * contentRef indicates the element of popper content
 * referenceRef indicates the element that popper content relative with
 */
export type TdPopperInjectionContext = {
  triggerRef: Signal<Measurable | undefined>;
  contentRef: Signal<HTMLElement | undefined>;
  popperInstanceRef: Signal<Instance | undefined>;
  referenceRef: Signal<Measurable | undefined>;
  role: Computed<RoleTypes | undefined>;
};

export type TdPopperContentInjectionContext = {
  arrowRef?: Signal<HTMLElement | undefined>;
  arrowOffset?: Signal<number | undefined>;
  arrowStyle: Computed<IStyle>;
};
