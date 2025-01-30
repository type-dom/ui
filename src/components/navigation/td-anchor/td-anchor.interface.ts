import { ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { Ref } from '@type-dom/signals';
import { UseNamespaceReturn } from '../../../hooks/use-namespace';

export interface ITdAnchor extends ITypeDiv {
  className: 'TdAnchor';
}

export interface AnchorProps extends TypeDivProps {
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
  /**
   * @description Scroll whether link is selected at the top
   *     default: false,
   */
  scrollTop?: boolean;
}

export interface AnchorLinkState {
  el: HTMLElement;
  href: string;
}

export interface AnchorLinkState {
  el: HTMLElement;
  href: string;
}

export interface AnchorContext {
  ns: UseNamespaceReturn;
  direction: string;
  currentAnchor: Ref<string>;

  addLink(state: AnchorLinkState): void;

  removeLink(href: string): void;

  handleClick(e: MouseEvent, href?: string): void;
}
