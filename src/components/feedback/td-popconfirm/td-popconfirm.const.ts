import { PopconfirmProps } from './td-popconfirm.interface';
import { ElQuestionFilledSvg } from '@type-dom/svgs';

export const popconfirmProps: PopconfirmProps = {
  confirmButtonType: 'primary',
  cancelButtonType: 'text',
  icon: ElQuestionFilledSvg,
  iconColor: '#f90',
  hideIcon: false,
  hideAfter: 200,
  teleported: true,
  width: 150,
}

export const popconfirmEmits = {
  /**
   * @description triggers when click confirm button
   */
  confirm: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * @description triggers when click cancel button
   */
  cancel: (e: MouseEvent) => e instanceof MouseEvent,
}
