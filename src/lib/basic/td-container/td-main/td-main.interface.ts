import { IUI, IUIConfig } from '../../../ui.interface';

export interface ITdMain extends IUI {
  className: 'TdMain',
}

export interface ITdMainConfig extends IUIConfig {
  tag?: 'main',
}
