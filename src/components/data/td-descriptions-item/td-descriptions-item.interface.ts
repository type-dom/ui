import { ITypeFragment, TypeFragmentProps, TypeHtml, } from '@type-dom/framework';

export interface ITdDescriptionsItem extends ITypeFragment {
  className: 'TdDescriptionsItem';
  props: DescriptionsItemProps;
}

export interface DescriptionsItemProps extends TypeFragmentProps {
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
   * @description the number of rows a cell should span
   *  default: 1,
   */
  rowspan?: number;
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
   * @description column label width, if not set, it will be the same as the width of the column. Higher priority than the `label-width` of `Descriptions`
   * default: '',
   */
  labelWidth?: string | number;
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
  className?: string;
  /**
   * @description column label custom class name
   *     default: '',
   */
  labelClassName?: string;

  slots?: {
    label: TypeHtml;
  };
}
