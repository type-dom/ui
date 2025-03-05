import { Div, TypeDiv } from '@type-dom/framework';
import { TdCheckbox } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class CheckboxDisabledExample extends TypeDiv {
  className: 'CheckboxDisabledExample';

  constructor() {
    super();
    this.className = 'CheckboxDisabledExample';
    this.attr.addName('checkbox-basic-example');
    const checked1 = signal(false)
    const checked2 = signal(true)
    this.addChildren(
      new Div({
        slot: [
          new TdCheckbox({
            vModel: checked1,
            label: 'Disabled',
            disabled: true,
          }),
          new TdCheckbox({
            vModel: checked2,
            label: 'Not disabled',
          }),
        ]
      }),
    );
  }
}
