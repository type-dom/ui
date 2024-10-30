import { IUI, IUIConfig } from '../../../../ui/ui.interface';

export interface ITdScrollbarThumb extends IUI {
  className: 'TdScrollbarThumb';
}

export interface ITdScrollbarThumbConfig extends IUIConfig {
  vertical?: boolean;
  size?: string;
  move?: number;
  ratio?: number; // required: true,
  always?: boolean;
}
