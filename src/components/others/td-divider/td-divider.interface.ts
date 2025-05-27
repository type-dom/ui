import { ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';

export interface ITdDivider extends ITypeDiv {
  className: 'TdDivider';
}

export interface DividerProps extends TypeDivProps {
  /**
   * @description Set divider's direction
   *  default: 'horizontal',
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @description Set the style of divider
   *  default: 'center',
   */
  contentPosition?: 'left' | 'center' | 'right';
  /**
   * @description the position of the customized content on the divider line
   *  default: 'solid',
   */
  borderStyle?:
    | 'solid'
    | 'dashed'
    | 'dotted'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset';
}

export type BorderStyle = IStyle['borderStyle'];