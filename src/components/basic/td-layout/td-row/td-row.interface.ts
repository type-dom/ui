import { IUI, IUIConfig } from '../../../../ui/ui.interface';

export interface ITdRow extends IUI {
  className: 'TdRow',
}

/**
 * gutter: number = 0;
 * justify: string = 'start';
 * align: string = 'top';
 * tag: string = 'div';
 */

export interface ITdRowConfig extends IUIConfig {
  gutter?: number;
  justify?: string;
  align?: string;
  tag?: string;
}

export const RowJustify = [
  'start',
  'center',
  'end',
  'space-around',
  'space-between',
  'space-evenly'
] as const;

export const RowAlign = ['top', 'middle', 'bottom'] as const;
