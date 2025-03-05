import { Div, Span, StyleAlignItems, TypeDiv } from '@type-dom/framework';
import { ComponentSize, TdButton, TdCard, TdRadio, TdRadioGroup, TdSpace } from '@type-dom/ui';
import { signal } from '@type-dom/signals';
import { genNumArr } from '@type-dom/utils';

export class SpaceSizeExample extends TypeDiv {
  className: 'SpaceSizeExample';

  constructor() {
    super();
    this.className = 'SpaceSizeExample';

    const size = signal<ComponentSize>('default')
    // 控制间距的大小
    this.addChild(
      new TdSpace({
        direction: 'vertical',
        alignment: StyleAlignItems.start,
        size: 30,
        slot: [
          new TdRadioGroup({
            name: 'radio-group',
            vModel: size,
            slot: [
              new TdRadio({
                label: 'Large',
                value: 'large'
              }),
              new TdRadio({
                label: 'Default',
                value: 'default'
              }),
              new TdRadio({
                label: 'Small',
                value: 'small'
              })
            ],
          }),
          new TdSpace({
            wrap: true,
            size: size,
            slot: genNumArr(3).map(i => {
              return new TdCard({
                class: 'box-card',
                styleObj: {
                  width: '250px'
                },
                slot: genNumArr(4).map(o => new Div({
                  class: 'text item',
                  slot: 'List item ' + o
                })),
                slots: {
                  header: new Div({
                    class: 'card-header',
                    slot: [
                      new Span({
                        slot: `Card name`
                      }),
                      new TdButton({
                        class: 'button',
                        text: true,
                        slot: 'Operation button'
                      })
                    ]
                  })
                }
              })
            })
          })
        ]
      })
    );
  }
}
