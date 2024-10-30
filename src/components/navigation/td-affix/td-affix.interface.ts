import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { IJsonData, XProxy } from '@type-dom/framework';

export interface ITdAffix extends IUI {
  className: 'TdAffix';
}

export interface ITdAffixConfig extends IUIConfig {
  /**
   * @description affix element zIndex value
   *     default: 100,
   * */
  zIndex?: number | string;
  /**
   * @description target container. (CSS selector)
   *     default: '',
   */
  target?: XProxy<IJsonData>;
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
