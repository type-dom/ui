import { IUI, IUIConfig } from '../../../../ui/ui.interface';

export interface ITdAside extends IUI {
  className: 'TdAside';
}

export interface ITdAsideConfig extends IUIConfig {
  width?: string | number;
}
