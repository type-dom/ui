import { ITypeDiv, TypeDivProps, TypeHtml } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';

export interface ITdAffix extends ITypeDiv {
  className: 'TdAffix';
}

export interface AffixProps extends TypeDivProps {
  /**
   * @description affix element zIndex value
   *     default: 100,
   * */
  zIndex?: number | string;
  /**
   * @description target container. (CSS selector)
   *     default: '',
   */
  target?: string;
  /**
   * @description offset distance
   *     default: 0,
   * */
  offset?: number;
  /**
   * @description position of affix
   *     default: 'top',
   * */
  position?: 'top' | 'bottom';
}
