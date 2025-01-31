import { TypeDiv } from '@type-dom/framework';
import { TdInput } from '@type-dom/ui';

export class FormInputDisabledExample extends TypeDiv {
  className: 'FormInputDisabledExample';

  constructor() {
    super();
    this.className = 'FormInputDisabledExample';
    this.addChild(
      new TdInput({
        placeholder: 'Please input',
        disabled: true,
        styleObj: {
          width: 240,
        }
      })
    );
  }
}
