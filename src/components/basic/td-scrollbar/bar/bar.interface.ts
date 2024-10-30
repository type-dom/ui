import { IUI, IUIConfig } from '../../../../ui/ui.interface';

export interface ITdScrollbarBar extends IUI {
  className: 'TdScrollbarBar';
}

export interface ITdScrollbarBarConfig extends IUIConfig {
  always?: boolean; // default: true,
  minSize?: number; // required: true, 默认 20
}
