import type { TransitionProps, ITypeElement } from '@type-dom/framework';

export interface ITdBackTop extends ITypeElement {
  className: 'TdBackTop';
}

export interface BacktopProps extends TransitionProps {
  /**
   * @description the button will not show until the scroll height reaches this value.
   *     default: 200,
   */
  visibilityHeight?: number;
  /**
   * @description the target to trigger scroll.
   *     default: '',
   */
  target?: string;
  /**
   * @description right distance.
   *     default: 40,
   */
  right?: number;
  /**
   * @description bottom distance.
   *     default: 40,
   */
  bottom?: number;

  // slot?: TypeElement;

  emits?: {
    click: (event: MouseEvent) => void;
  };
}
