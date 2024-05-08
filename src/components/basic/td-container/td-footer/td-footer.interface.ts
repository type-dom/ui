import { ITypeConfig } from '@type-dom/framework';
import { IUI, IUIConfig } from '../../../../ui/ui.interface';

export interface ITdFooter extends IUI {
  className: 'TdFooter',
}

export interface ITdFooterConfig extends IUIConfig {
  height?: string | number;
  backgroundColor?: string;
}
