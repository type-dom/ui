import { ITypeLI, TypeLIProps } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';

export interface ITdOption extends ITypeLI {
  className: 'TdOption';
}

export interface TdOptionProps extends TypeLIProps {
  /**
   * @description value of option
   *     required: true,
   */
  value?: MaybeRef<string | number | boolean | object>;

  /**
   * @description label of option, same as `value` if omitted
   */
  label?: string | number;
  created?: boolean;
  /**
   * @description whether option is disabled
   */
  disabled?: boolean;
}

export interface OptionStates {
  index: number,
  groupDisabled?: boolean,
  visible?: boolean,
  hover: boolean,
  [propName: string]: number | boolean | undefined,
}
