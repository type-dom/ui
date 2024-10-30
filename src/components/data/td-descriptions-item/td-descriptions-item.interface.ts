import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { TypeElement, TypeHtml } from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';

export interface ITdDescriptionsItem extends IUI {
  className: 'TdDescriptionsItem';
}

export interface ITdDescriptionsItemConfig extends IUIConfig {
  /**
   * @description label text
   *     default: '',
   */
  label?: string;
  /**
   * @description colspan of column
   *     default: 1,
   */
  span?: number;
  /**
   * @description column width, the width of the same column in different rows is set by the max value (If no `border`, width contains label and content)
   *     default: '',
   */
  width?: string | number;
  /**
   * @description column minimum width, columns with `width` has a fixed width, while columns with `min-width` has a width that is distributed in proportion (If no`border`, width contains label and content)
   *     default: '',
   */
  minWidth?: string | number;
  /**
   * @description column content alignment (If no `border`, effective for both label and content)
   *     default: 'left',
   */
  align?: string;
  /**
   * @description column label alignment, if omitted, the value of the above `align` attribute will be applied (If no `border`, please use `align` attribute)
   *     default: '',
   */
  labelAlign?: string;
  /**
   * @description column content custom class name
   *     default: '',
   */
  // className?: string; // 暂不用
  contentStyle?: IStyle;
  /**
   * @description column label custom class name
   *     default: '',
   */
  // labelClassName?: string; // 暂不用
  labelStyle?: IStyle; // add by me 2024/07/19 框架不使用样式类

  slots?: {
    label: TypeHtml;
  };
}
