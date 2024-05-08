import { IUI, IUIConfig } from '../../../../ui/ui.interface';
import { TypeElement } from '@type-dom/framework';

export interface ITdSelectDropdown extends IUI {
  className: 'TdSelectDropdown';
}

export interface ITdSelectDropdownConfig extends IUIConfig {
  header?: TypeElement;
  footer?: TypeElement;
}
