import { TdInput } from '@type-dom/ui';
import { TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';

export class FormInputTextareaExample extends TypeDiv {
  className = 'FormInputTextareaExample';

  constructor() {
    super();
    const textarea = signal('')
    this.addChildren(
      new TdInput({
        vModel: textarea,
        type: 'textarea',
        autosize: true,
        rows: 2,
        placeholder: 'Please input',
        styleObj: {
          width: 240,
        }
      })
    );
  }
}
