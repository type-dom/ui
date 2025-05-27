import { TypeProps } from '@type-dom/framework';

export interface AriaProp extends TypeProps {
  /**
   * @description native `aria-label` attribute
   */
  ariaLabel?: string;
  /**
   * @description native `aria-orientation` attribute
   */
  ariaOrientation?: 'horizontal' | 'vertical' | 'undefined';
  /**
   * @description native `aria-controls` attribute
   */
  ariaControls?: string;

  ariaDescribedby?: string;
  ariaExpanded?: string;
  ariaHaspopup?: string;
}

export const EVENT_CODE = {
  tab: 'Tab',
  enter: 'Enter',
  space: 'Space',
  left: 'ArrowLeft', // 37
  up: 'ArrowUp', // 38
  right: 'ArrowRight', // 39
  down: 'ArrowDown', // 40
  esc: 'Escape',
  delete: 'Delete',
  backspace: 'Backspace',
  numpadEnter: 'NumpadEnter',
  pageUp: 'PageUp',
  pageDown: 'PageDown',
  home: 'Home',
  end: 'End',
};
