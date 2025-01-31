import { TypeDiv } from '@type-dom/framework';
import { TdInput } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class FormInputClearableExample extends TypeDiv {
  className = 'FormInputClearableExample';

  constructor() {
    super();
    const input = signal('');
    this.addChild(
      new TdInput({
        vModel: input,
        placeholder: 'Please input',
        clearable: true,
        styleObj: {
          width: 240,
        }
      })
    );
  }
}
