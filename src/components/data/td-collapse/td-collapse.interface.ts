import { ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { Arrayable } from '@type-dom/utils';
import { TdCollapseItem } from '../td-collapse-item/td-collapse-item.class';

export type CollapseActiveName = string | number;
export type CollapseModelValue = Arrayable<CollapseActiveName>;

export interface ITdCollapse extends ITypeDiv {
  className: 'TdCollapse';
}

export interface CollapseProps extends TypeDivProps {
  /**
   * @description whether to activate accordion mode
   */
  accordion?: boolean;
  /**
   * @description currently active panel, the type is `string` in accordion mode, otherwise it is `array`
   *   default: () => mutable([] as const),
   */
  modelValue?: CollapseModelValue;
  //   type: definePropType<CollapseModelValue>([Array, String, Number]),
  slot?: TdCollapseItem[];
}
