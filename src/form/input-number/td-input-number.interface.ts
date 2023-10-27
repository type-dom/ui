import { TypeComponent } from 'type-dom.ts';

export interface ITdInputNumber extends TypeComponent {
  className: 'TdInputNumber'
}

export interface ITdInputNumberConfig {
  labelTitle?: string,
  placeholder?: string,
  readonly?: boolean,
}
