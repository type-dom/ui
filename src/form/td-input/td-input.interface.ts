import { TypeComponent } from '@type-dom/framework';

export interface ITdInput extends TypeComponent {
  className: 'TdInput'
}

export interface ITdInputConfig {
  labelTitle?: string,
  labelWidth?: string,
  placeholder?: string,
  readonly?: boolean,
  type?: 'text' | 'password' | 'radio' | 'checkbox' | 'submit' | 'reset' | 'hidden'
    | 'date' | 'time' | 'file' | 'number' | 'email' | 'url' | 'search';
}
