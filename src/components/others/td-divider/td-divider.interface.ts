import { ITypeDiv, TypeDivProps } from '@type-dom/framework';

export interface ITdDivider extends ITypeDiv {
  className: 'TdDivider';
}

export interface DividerProps extends TypeDivProps {
  /**
   * @description Set divider's direction
   */
  direction?: 'horizontal' | 'vertical'; // default: 'horizontal',
  /**
   * @description Set the style of divider
   */
  contentPosition?: 'left' | 'center' | 'right'; // default: 'center',
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
