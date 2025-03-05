import { ITypeFragment, TypeFragmentProps, TypeSvg, TypeSvgSvg } from '@type-dom/framework';
import { IButtonType } from '../../basic/td-button/td-button.interface';

export interface ITdPopconfirm extends ITypeFragment {
  className: 'TdPopconfirm'
}

export interface PopconfirmProps extends TypeFragmentProps {
  /**
   * @description Title
   */
  title?: string,
  /**
   * @description Confirm button text
   */
  confirmButtonText?: string,
  /**
   * @description Cancel button text
   */
  cancelButtonText?: string,
  /**
   * @description Confirm button type
   *     default: 'primary',
   */
  confirmButtonType?: IButtonType,
  /**
   * @description Cancel button type
   *     default: 'text',
   */
  cancelButtonType?: IButtonType,
  /**
   * @description Icon Component
   *     default: () => QuestionFilled,
   */
  icon?: typeof TypeSvgSvg; // iconPropType,
  /**
   * @description Icon color
   *     default: '#f90',
   */
  iconColor?: string,
  /**
   * @description is hide Icon
   *     default: false,
   */
  hideIcon?: boolean,
  /**
   * @description delay of disappear, in millisecond
   *     default: 200,
   */
  hideAfter?: number,
  /**
   * @description whether popconfirm is teleported to the body
   */
  teleported?: boolean,
  /**
   * @description when popconfirm inactive and `persistent` is `false` , popconfirm will be destroyed
   */
  persistent?: boolean,
  /**
   * @description popconfirm width, min width 150px
   *     default: 150,
   */
  width?: string | number,
}
