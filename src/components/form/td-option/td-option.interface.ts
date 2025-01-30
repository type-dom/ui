import { ITypeLI, TypeLIProps } from '@type-dom/framework';

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
