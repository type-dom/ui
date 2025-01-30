import { ITypeDiv, TypeDivProps, TypeSvgSvg } from '@type-dom/framework';

export interface ITdCollapseItem extends ITypeDiv {
  className: 'TdCollapseItem';
}

export interface CollapseItemProps extends TypeDivProps {
  /**
   * @description title of the panel
   *     default: '',
   */
  title?: string;
  /**
   * @description unique identification of the panel
   *     default: undefined,
   */
  name?: string | number;
  //   type: definePropType<CollapseActiveName>([String, Number]),
  // },

  /**
   * @description icon of the collapse item
   */
  icon?: typeof TypeSvgSvg;
  //   type: iconPropType,
  //   default: ArrowRight,
  // },
  /**
   * @description disable the collapse item
   */
  disabled?: boolean;
}
