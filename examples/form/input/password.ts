import { TypeDiv } from '@type-dom/framework';
import { TdInput } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class FormInputPasswordExample extends TypeDiv {
  className = 'FormPasswordExample';

  constructor() {
    super();
    const input = signal('')
    this.addChild(
      new TdInput({
        vModel: input,
        placeholder: 'Please input password',
        type: 'password',
        showPassword: true,
        styleObj: {
          width: 240,
        }
      })
    );
  }
}
