import { TypeComponent } from 'type-dom.ts';

export interface ITdInputItem extends TypeComponent {
  className: 'TdInputItem'
}

export interface ITdInputItemConfig {
  labelTitle?: string,
  placeholder?: string,
  readonly?: boolean,
}
