import { ITypeSpan, TypeSpanProps } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';
import { IType } from '../../../styles/var';
import { CHANGE_EVENT } from '../../../constants/event';

export interface ITdCheckTag extends ITypeSpan {
  className: 'TdCheckTag';
  props: CheckTagProps;
}

export interface CheckTagProps extends TypeSpanProps {
  /**
   * @description is checked
   *     default: false,
   */
  checked?: MaybeRef<boolean>;
  /**
   * @description type of Tag
   *     default: 'primary',
   */
  type?: IType;

  emits?: {
    'update:checked'?: (value: boolean) => void;
    [CHANGE_EVENT]?: (value: boolean) => void;
  };
}
