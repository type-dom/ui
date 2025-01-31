import { Div, P, TypeDiv } from '@type-dom/framework';
import { TdOption, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SelectMultipleExample extends TypeDiv {
  className: 'SelectMultipleExample';

  constructor() {
    super();
    this.className = 'SelectMultipleExample';

    const value1 = signal([])
    const value2 = signal([])
    const value3 = signal([])
    const value4 = signal([])
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
    this.style.addObj({
      gap: '12px',
    });
    this.addChildren(
      new Div({
        styleObj: {
          gap: '12px',
        },
        slot: [
          new P({
            slot: 'default',
          }),
          new TdSelect({
            vModel: value1,
            multiple: true,
            placeholder: 'Select',
            styleObj: {
              width: 240,
            },
            slot: options.map(opt => new TdOption({
              label: opt.label,
              value: opt.value,
            })),
            // init: (element) => {
            //   for (const opt of options) {
            //     element.addChildren(
            //       new TdOption({
            //         label: opt.label,
            //         value: opt.value,
            //       })
            //     )
            //   }
            // }
          })
        ]
      }),
      new Div({
        styleObj: {
          gap: '12px',
        },
        slot: [
          new P({
            slot: 'use collapse-tags',
          }),
          new TdSelect({
            vModel: value2,
            multiple: true,
            collapseTags: true,
            placeholder: 'Select',
            styleObj: {
              width: 240,
            },
            slot: options.map(opt => new TdOption({
              label: opt.label,
              value: opt.value,
            })),
            // init: (element) => {
            //   for (const opt of options) {
            //     element.addChildren(
            //       new TdOption({
            //         label: opt.label,
            //         value: opt.value,
            //       })
            //     )
            //   }
            // }
          })
        ]
      }),
      new Div({
        styleObj: {
          gap: '12px',
        },
        slot: [
          new P({
            slot: 'use collapse-tags-tooltip',
          }),
          new TdSelect({
            vModel: value3,
            multiple: true,
            collapseTags: true,
            collapseTagsTooltip: true,
            placeholder: 'Select',
            styleObj: {
              width: 240,
            },
            slot: options.map(opt => new TdOption({
              label: opt.label,
              value: opt.value,
            })),
            // init: (element) => {
            //   for (const opt of options) {
            //     element.addChildren(
            //       new TdOption({
            //         label: opt.label,
            //         value: opt.value,
            //       })
            //     )
            //   }
            // }
          })
        ]
      }),
      new Div({
        styleObj: {
          gap: '12px',
        },
        slot: [
          new P({
            slot: 'use max-collapse-tags',
          }),
          new TdSelect({
            vModel: value4,
            multiple: true,
            collapseTags: true,
            collapseTagsTooltip: true,
            maxCollapseTags: 3,
            placeholder: 'Select',
            styleObj: {
              width: 240,
            },
            slot: options.map(opt => new TdOption({
              label: opt.label,
              value: opt.value,
            })),
            // init: (element) => {
            //   for (const opt of options) {
            //     element.addChildren(
            //       new TdOption({
            //         label: opt.label,
            //         value: opt.value,
            //       })
            //     )
            //   }
            // }
          })
        ]
      }),
    );
  }
}
