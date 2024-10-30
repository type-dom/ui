import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { Arrayable } from '../../feedback/td-tooltip/utils';

export interface ITdCollapse extends IUI {
  className: 'TdCollapse';
}

export interface ITdCollapseConfig extends IUIConfig {
  /**
   * @description whether to activate accordion mode
   */
  accordion?: boolean;
  /**
   * @description currently active panel, the type is `string` in accordion mode, otherwise it is `array`
   *   default: () => mutable([] as const),
   */
  modelValue?: string | number | ICollapseActiveName[];
  //   type: definePropType<CollapseModelValue>([Array, String, Number]),
  slot?: undefined;
}

export type ICollapseActiveName = string | number;
export type ICollapseModelValue = Arrayable<ICollapseActiveName>;
