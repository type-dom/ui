import { Div, TypeDiv } from '@type-dom/framework';
import { TdCheckbox } from '@type-dom/ui';
import { signal, watch } from '@type-dom/signals';

export class CheckboxBasicExample extends TypeDiv {
  className: 'CheckboxBasicExample';

  constructor() {
    super();
    this.className = 'CheckboxBasicExample';
    this.attr.addName('checkbox-basic-example');
    const checked1 = signal(true);
    const checked2 = signal(false);
    const checked3 = signal(false);
    const checked4 = signal(false);
    const checked5 = signal(false);
    const checked6 = signal(false);
    this.addChildren(
      new Div({
        slot: [
          new TdCheckbox({
            vModel: checked1,
            label: 'Option 1',
            size: 'large',
          }),
          new TdCheckbox({
            vModel: checked2,
            label: 'Option 2',
            size: 'large',
          }),
        ]
      }),
      new Div({
        slot: [
          new TdCheckbox({
            vModel: checked3,
            label: 'Option 1',
          }),
          new TdCheckbox({
            vModel: checked4,
            label: 'Option 2',
          }),
        ]
      }),
      new Div({
        slot: [
          new TdCheckbox({
            vModel: checked5,
            label: 'Option 1',
            size: 'small',
          }),
          new TdCheckbox({
            vModel: checked6,
            label: 'Option 2',
            size: 'small',
          }),
        ]
      }),
    );
    watch(() => checked1.get(), newVal => {
      console.warn('checked1 newVal is ', newVal);
    })
  }
}
