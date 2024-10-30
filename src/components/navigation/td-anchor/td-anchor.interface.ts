import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { TypeElement } from '@type-dom/framework';

export interface ITdAnchor extends IUI {
  className: 'TdAnchor';
}

export interface ITdAnchorConfig extends IUIConfig {
  /**
   * @description scroll container
   */
  container?: string | HTMLElement | Window;
  /**
   * @description Set the offset of the anchor scroll
   *     default: 0,
   */
  offset?: number;
  /**
   * @description The offset of the element starting to trigger the anchor
   *     default: 15,
   */
  bound?: number;
  /**
   * @description Set the scroll duration of the container when the anchor is clicked, in milliseconds
   *     default: 300,
   */
  duration?: number;
  /**
   * @description Whether to show the marker
   *     default: true,
   */
  marker?: boolean;
  /**
   * @description Set Anchor type
   *     default: 'default',
   */
  type?: 'default' | 'underline';
  /**
   * @description Set Anchor direction
   *     default: 'vertical',
   */
  direction?: 'vertical' | 'horizontal';
}

export interface AnchorLinkState {
  el: HTMLElement;
  href: string;
}
