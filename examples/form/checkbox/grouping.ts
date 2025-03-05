import { TypeDiv } from '@type-dom/framework';
import { TdCheckboxGroup, TdCheckbox } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class CheckboxGroupingExample extends TypeDiv {
  className: 'CheckboxGroupingExample';

  constructor() {
    super();
    this.className = 'CheckboxGroupingExample';
    this.attr.addName('checkbox-grouping-example');
    this.style.addObj({
      padding: '1em 0'
    });

    const checkList = signal(['Value selected and disabled', 'Value A']);
    this.addChildren(
      new TdCheckboxGroup({
        name: 'checkbox-group',
        vModel: checkList,
        styleObj: {
          marginBottom: '10px'
        },
        slot: [
          new TdCheckbox({
            label: 'Option A',
            value: 'Value A',
          }),
          new TdCheckbox( {
            label: 'Option B',
            value: 'Value B'
          }),
          new TdCheckbox({
            label: 'Option C',
            value: 'Value C'
          }),
          new TdCheckbox({
            label: 'disabled',
            value: 'Value disabled',
            disabled: true
          }),
          new TdCheckbox({
            label: 'selected and disabled',
            value: 'Value selected and disabled',
            disabled: true
          })
        ]
      })
    );
  }
}
