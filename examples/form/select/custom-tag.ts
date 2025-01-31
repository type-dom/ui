import { Div, Span, TypeDiv } from '@type-dom/framework';
import { TdOption, TdSelect, TdTag } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SelectCustomTagExample extends TypeDiv {
  className: 'SelectCustomTagExample';

  constructor() {
    super();
    this.className = 'SelectCustomTagExample';

    const value = signal<string[]>([])
    const colors = [
      {
        value: '#E63415',
        label: 'red',
      },
      {
        value: '#FF6600',
        label: 'orange',
      },
      {
        value: '#FFDE0A',
        label: 'yellow',
      },
      {
        value: '#1EC79D',
        label: 'green',
      },
      {
        value: '#14CCCC',
        label: 'cyan',
      },
      {
        value: '#4167F0',
        label: 'blue',
      },
      {
        value: '#6222C9',
        label: 'purple',
      },
    ]
    colors.forEach((color) => {
      value.get().push(color.value)
    });

    this.addChildren(
      new TdSelect({
        vModel: value,
        multiple: true,
        placeholder: 'Select',
        styleObj: {
          width: 240,
        },
        slots: {
          tag: value.get().map(color => new TdTag({
            color,
            size: 'small'
          }))
        },
        slot: colors.map(item => new TdOption({
          label: item.label,
          value: item.value,
          slot: new Div({
            styleObj: {
              display: 'inline-block',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: item.value,
              marginRight: '8px',
            },
            slot: [
              new TdTag({
                color: item.value,
                styleObj: {
                  marginRight: '8px',
                },
                size: 'small'
              }),
              new Span({
                styleObj: {
                  color: item.value,
                },
                slot: item.label
              })
            ]
          })
        })),
        // init: (element) => {
        //   for (const item of colors) {
        //     element.addChild(new TdOption({
        //       label: item.label,
        //       value: item.value,
        //       slot: new Div({
        //         styleObj: {
        //           display: 'inline-block',
        //           width: '24px',
        //           height: '24px',
        //           borderRadius: '50%',
        //           background: item.value,
        //           marginRight: '8px',
        //         },
        //         slot: [
        //           new TdTag({
        //             color: item.value,
        //             styleObj: {
        //               marginRight: '8px',
        //             },
        //             size: 'small'
        //           }),
        //           new Span({
        //             styleObj: {
        //               color: item.value,
        //             },
        //             slot: item.label
        //           })
        //         ]
        //       })
        //     }));
        //   }
        //   // const tags: TdTag[] = [];
        //   // for (const color of value) {
        //   //   tags.push(new TdTag({
        //   //     color,
        //   //     size: 'small'
        //   //   }));
        //   // }
        //   // if (!element.params.slots) {
        //   //   element.params.slots = {};
        //   // }
        //   // element.params.slots.tag = tags;
        // }
      })
    );
  }
}
