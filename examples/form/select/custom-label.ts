import { Span, TypeDiv, TypeElement } from '@type-dom/framework';
import { CheckboxValueType, TdButton, TdCheckbox, TdInput, TdOption, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SelectCustomLabelExample extends TypeDiv {
  className: 'SelectCustomLabelExample';

  constructor() {
    super();
    this.className = 'SelectCustomLabelExample';

    const value1 = signal<string>('Option1')
    const value2 = signal<string[]>(['Option1'])
    const options = [
      {
        value: 'Option1',
        label: 'Label1',
      },
      {
        value: 'Option2',
        label: 'Label2',
      },
      {
        value: 'Option3',
        label: 'Label3',
      },
      {
        value: 'Option4',
        label: 'Label4',
      },
      {
        value: 'Option5',
        label: 'Label5',
      },
    ];
    this.style.addObj({
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      alignItems: 'center',
    });
    this.addChildren(
      new TdSelect({
        vModel: value1,
        placeholder: 'Select',
        clearable: true,
        styleObj: {
          width: 240,
        },
        // slot: options.map((opt) => {
        //   const slot = [
        //     new Span({
        //         slot: 'Custom Label',
        //       }),
        //       new Span({
        //         slot: opt.value,
        //       }),
        //       new TdOption({
        //         label: opt.label,
        //         value: opt.value,
        //       })
        //   ]
        //   return slot
        // }),
        init: (element) => {
          const slot: TypeElement[] = [];
          for (const opt of options) {
            slot.push(
              new Span({
                slot: 'Custom Label',
              }),
              new Span({
                slot: opt.value,
              }),
              new TdOption({
                label: opt.label,
                value: opt.value,
              })
            );
          }
          element.params.slot = slot;
        },
      }),
      new TdSelect({
        vModel: value2,
        placeholder: 'Select',
        clearable: true,
        multiple: true,
        styleObj: {
          width: 240,
        },
        init: (element) => {
          const slot: TypeElement[] = [];
          for (const opt of options) {
            slot.push(
              new Span({
                slot: 'Custom Label',
              }),
              new Span({
                slot: opt.value,
              }),
              new TdOption({
                label: opt.label,
                value: opt.value,
              })
            );
          }
        },
      })
    );
  }
}
