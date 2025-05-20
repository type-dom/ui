import { TypeDiv } from '@type-dom/framework';
import { TdMessage, TdOption, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SelectEmptyValueExample extends TypeDiv {
  className: 'SelectEmptyValueExample';

  constructor() {
    super();
    this.className = 'SelectEmptyValueExample';

    const value = signal('')
    const options = [
      {
        value: '',
        label: 'All',
      },
      {
        value: 'Option1',
        label: 'Option1',
      },
      {
        value: 'Option2',
        label: 'Option2',
      },
      {
        value: 'Option3',
        label: 'Option3',
      },
      {
        value: 'Option4',
        label: 'Option4',
      },
      {
        value: 'Option5',
        label: 'Option5',
      },
    ];

    const handleClear = () => {
      TdMessage.info(`The clear value is: ${value}`)
    };

    this.addChildren(
      new TdSelect({
        name: 'first-select',
        vModel: value,
        placeholder: 'Select',
        size: 'large',
        styleObj: {
          width: 240,
        },
        emits: {
          clear: handleClear
        },
        slot: options.map(opt => new TdOption({
          label: opt.label,
          value: opt.value,
        })),
        // init: (element) => {
        //   for (const opt of options) {
        //     element.addChild(new TdOption({
        //       label: opt.label,
        //       value: opt.value,
        //     }));
        //   }
        // }
      }),
    );
  }
}
