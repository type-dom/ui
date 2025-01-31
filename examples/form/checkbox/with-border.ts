import { Div, TypeDiv } from '@type-dom/framework';
import { TdCheckbox, TdCheckboxGroup } from '@type-dom/ui';
import { IStyle } from '@type-dom/css-type';
import { signal } from '@type-dom/signals';

export class CheckboxWithBorderExample extends TypeDiv {
  className: 'CheckboxWithBorderExample';

  constructor() {
    super();
    this.className = 'CheckboxWithBorderExample';
    this.attr.addName('checkbox-basic-example');
    const groupStyle: IStyle = {
      marginTop: '24px'
    };
    const checked1 = signal(true);
    const checked2 = signal(false);
    const checked3 = signal(false);
    const checked4 = signal(true);
    const checkboxGroup1 = signal(['Value1']);
    this.addChildren(
      new Div({
        slot: [
          new TdCheckbox({
            vModel: checked1,
            label: 'Option 1',
            size: 'large',
            border: true
          }),
          new TdCheckbox({
            vModel: checked2,
            label: 'Option 2',
            size: 'large',
            border: true
          }),
        ]
      }),
      new Div({
        styleObj: groupStyle,
        slot: [
          new TdCheckbox({
            vModel: checked3,
            label: 'Option 1',
            border: true
          }),
          new TdCheckbox({
            vModel: checked4,
            label: 'Option 2',
            border: true,
          }),
        ]
      }),
      new Div({
        styleObj: groupStyle,
        slot: new TdCheckboxGroup({
            vModel: checkboxGroup1,
            size: 'small',
            slot: [
              new TdCheckbox({
                label: 'Option 1',
                value: 'Value1',
                border: true,
              }),
              new TdCheckbox({
                label: 'Option 2',
                value: 'Value2',
                border: true,
              }),
            ]
          }),
      }),
      new Div({
        styleObj: groupStyle,
        slot: [
          new TdCheckboxGroup({
            vModel: checkboxGroup1,
            size: 'small',
            slot: [
              new TdCheckbox({
                label: 'Option 1',
                value: 'Value1',
                border: true,
                disabled: true
              }),
              new TdCheckbox({
                label: 'Option 2',
                value: 'Value2',
                border: true,
                disabled: true
              }),
            ]
          })
        ]
      }),
    );
  }
}
