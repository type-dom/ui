import { ITypeConfig } from '@type-dom/framework';
import { IUI, IUIConfig } from '../../../../ui/ui.interface';

export interface ITdHeader extends IUI {
  className: 'TdHeader';
}

export interface ITdHeaderConfig extends IUIConfig {
  height?: string | number; // default 60px
  backgroundColor?: string; // default #fff
}
