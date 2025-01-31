import { TypeDiv, Span } from '@type-dom/framework';
import { $textColor, TdOption, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SelectCustomTemplateExample extends TypeDiv {
  className: 'SelectCustomTemplateExample';

  constructor() {
    super();
    this.className = 'SelectCustomTemplateExample';

    const value = signal('')
    const cities = [
      {
        value: 'Beijing',
        label: 'Beijing',
      },
      {
        value: 'Shanghai',
        label: 'Shanghai',
      },
      {
        value: 'Nanjing',
        label: 'Nanjing',
      },
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
    ];
    this.addChildren(
      new TdSelect({
        vModel: value,
        placeholder: 'Select',
        styleObj: {
          width: 240,
        },
        slot: cities.map(item => new TdOption({
          label: item.label,
            value: item.value,
            slot: [
              new Span({
                slot: item.label,
                styleObj: {
                  float: 'left'
                },
              }),
              new Span({
                slot: item.value,
                styleObj: {
                  float: 'right',
                  color: $textColor.secondary,
                  fontSize: '13px'
                }
              })
            ]
        })),
        // init: (element) => {
        //   for (const item of cities) {
        //     element.addChild(new TdOption({
        //       label: item.label,
        //       value: item.value,
        //       slot: [
        //         new Span({
        //           slot: item.label,
        //           styleObj: {
        //             float: 'left'
        //           },
        //         }),
        //         new Span({
        //           slot: item.value,
        //           styleObj: {
        //             float: 'right',
        //             color: $textColor.secondary,
        //             fontSize: '13px'
        //           }
        //         })
        //       ]
        //     }));
        //   }
        // }
      }),
    );
  }
}
