import { ITypeDiv, TypeDivProps, TypeElement } from '@type-dom/framework';

export interface ITdSelectDropdown extends ITypeDiv {
  className: 'TdSelectDropdown';
  // config?: ITdSelectDropdownConfig
}

export interface SelectDropdownProps extends TypeDivProps {
  header?: TypeElement;
  footer?: TypeElement;
}
