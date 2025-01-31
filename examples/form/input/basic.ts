import { TypeDiv } from '@type-dom/framework';
import { TdInput } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class FormInputBasicExample extends TypeDiv {
  className: 'FormInputBasicExample';

  constructor() {
    super();
    this.className = 'FormInputBasicExample';

    const input = signal('')
    this.addChild(
      new TdInput({
        vModel: input,
        placeholder: 'Please input',
        styleObj: {
          width: 240,
        }
      })
    );
  }
}
