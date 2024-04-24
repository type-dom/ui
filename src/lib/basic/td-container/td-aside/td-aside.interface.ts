import { ITypeConfig } from '@type-dom/framework';
import { IUI, IUIConfig } from '../../../ui.interface';

export interface ITdAside extends IUI {
  className: 'TdAside';
}

export interface ITdAsideConfig extends IUIConfig {
  width?: string | number;
}
