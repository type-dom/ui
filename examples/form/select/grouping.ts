import { TypeDiv } from '@type-dom/framework';
import { TdOption, TdOptionGroup, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SelectGroupingExample extends TypeDiv {
  className: 'SelectGroupingExample';

  constructor() {
    super();
    this.className = 'SelectGroupingExample';

    const value = signal('')
    const options = [
      {
        label: 'Popular cities',
        options: [
          {
            value: 'Shanghai',
            label: 'Shanghai',
          },
          {
            value: 'Beijing',
            label: 'Beijing',
          },
        ],
      },
      {
        label: 'City name',
        options: [
          {
            value: 'Chengdu',
            label: 'Chengdu',
          },
          {
            value: 'Shenzhen',
            label: 'Shenzhen',
          },
          {
            value: 'Guangzhou',
            label: 'Guangzhou',
          },
          {
            value: 'Dalian',
            label: 'Dalian',
          },
        ],
      },
    ]
    this.addChildren(
      new TdSelect({
        vModel: value,
        placeholder: 'Select',
        size: 'large',
        styleObj: {
          width: 240,
        },
        slot: options.map(opt => new TdOptionGroup({
          label: opt.label,
          slot: opt.options.map(item => new TdOption({
            label: item.label,
            value: item.value,
          }))
        })),
        // init: (element) => {
        //   for (const opt of options) {
        //     element.addChild(new TdOptionGroup({
        //       label: opt.label,
        //       init: (group) => {
        //         for (const item of opt.options) {
        //           group.addChild(new TdOption({
        //             label: item.label,
        //             value: item.value,
        //           }));
        //         }
        //       }
        //     }));
        //   }
        // }
      }),
    );
  }
}
