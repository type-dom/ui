import { ITypeLI, TypeLIProps } from '@type-dom/framework';
import { Computed, Signal } from '@type-dom/signals';

export interface ITdOption extends ITypeLI {
  className: 'TdOption';
}

export interface TdOptionProps extends TypeLIProps {
  /**
   * @description value of option
   *     required: true,
   */
  value?: string | number | boolean | object;

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
  index: Signal<number | undefined>;
  groupDisabled?: Signal<boolean | undefined>;
  visible?: Signal<boolean | undefined>;
  hover: Signal<boolean | undefined>;
  [propName: string]: Signal<number | boolean | undefined> | undefined,
}

export type OptionValue = TdOptionProps['value']
export type OptionBasic = {
  value: OptionValue;
  currentLabel?: Computed<string | number | boolean | undefined>; // OptionPublicInstance['currentLabel']
  isDisabled?: Computed<boolean>; // OptionPublicInstance['isDisabled']
}
