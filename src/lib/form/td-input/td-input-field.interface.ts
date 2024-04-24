import { TypeComponent } from '@type-dom/framework';

export interface ITdInputField extends TypeComponent {
  className: 'TdInputField';
}

export interface ITdInputFieldConfig {
  labelTitle?: string,
  labelWidth?: string,
  placeholder?: string,
  readonly?: boolean,
  type?: 'text' | 'password' | 'radio' | 'checkbox' | 'submit' | 'reset' | 'hidden'
    | 'date' | 'time' | 'file' | 'number' | 'email' | 'url' | 'search';
}
