import { TypeDiv } from '@type-dom/framework';
import { TdOption, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SelectBasicUsageExample extends TypeDiv {
  className: 'SelectBasicUsageExample';

  constructor() {
    super();
    this.className = 'SelectBasicUsageExample';

    const value = signal('');
    const options = [
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
    // this.style.addObj({
    //   display: 'flex',
    //   alignItems: 'center',
    //   flexWrap: 'wrap',
    //   gap: '1rem'
    // })
    this.attr.addClass('flex flex-wrap gap-4 items-center');
    this.addChildren(
      new TdSelect({
        name: 'first-select',
        vModel: value,
        placeholder: 'Select',
        size: 'large',
        styleObj: {
          width: 240,
        },
        slot: options.map(opt => new TdOption({
          label: opt.label,
          value: opt.value,
        })),
      }),
      // new TdSelect({
      //   name: 'second-select',
      //   vModel: value,
      //   placeholder: 'Select',
      //   styleObj: {
      //     width: 240,
      //     marginLeft: '6px'
      //   },
      //   slot: options.map(opt => new TdOption({
      //     label: opt.label,
      //     value: opt.value,
      //   })),
      // }),
      // new TdSelect({
      //   name: 'third-select',
      //   vModel: value,
      //   placeholder: 'Select',
      //   size: 'small',
      //   styleObj: {
      //     width: 240,
      //     marginLeft: '6px'
      //   },
      //   slot: options.map(opt => new TdOption({
      //     label: opt.label,
      //     value: opt.value,
      //   })),
      // })
    );
  }
}
