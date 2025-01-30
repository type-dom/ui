import { ITypeUL, TypeULProps } from '@type-dom/framework';

export interface ITdOptionGroup extends ITypeUL {
  className: 'TdOptionGroup';
}

export interface OptionGroupProps extends TypeULProps {
  /**
   * @description name of the group
   */
  label?: string;
  /**
   * @description whether to disable all options in this group
   */
  disabled?: boolean;
}
