import { TypeComponent } from '@type-dom/framework';

export interface ITdInputNumber extends TypeComponent {
  className: 'TdInputNumber'
}

export interface ITdInputNumberConfig {
  labelTitle?: string,
  placeholder?: string,
  readonly?: boolean,
}
