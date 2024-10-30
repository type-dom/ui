import { IType } from '../../../styles/var';
import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { CHANGE_EVENT } from '../../../constants/event';

export interface ITdCheckTag extends IUI {
  className: 'TdCheckTag';
}

export interface ITdCheckTagConfig extends IUIConfig {
  /**
   * @description is checked
   *     default: false,
   */
  checked?: boolean;
  /**
   * @description type of Tag
   *     default: 'primary',
   */
  type?: IType;

  emits?: {
    'update:checked'?: (value: boolean) => void;
    [CHANGE_EVENT]?: (value: boolean) => void;
  }
}
