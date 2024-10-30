import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdCollapseItem extends IUI {
  className: 'TdCollapseItem';
}

export interface ITdCollapseItemConfig extends IUIConfig {
  /**
   * @description title of the panel
   *     default: '',
   */
  title?: string;
  /**
   * @description unique identification of the panel
   *     default: undefined,
   */
  nameId?: string | number;
  //   type: definePropType<CollapseActiveName>([String, Number]),
  // },
  /**
   * @description disable the collapse item
   */
  disabled?: boolean;
}
