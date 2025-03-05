import { Div, TypeDiv } from '@type-dom/framework';
import { TdMenu, TdMenuItem, TdSubMenu } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class MenuPopperOffsetExample extends TypeDiv {
  className = 'MenuPopperOffsetExample';

  constructor() {
    super();
    const activeIndex = signal('1');
    const activeIndex2 = signal('1');
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    this.addChildren(
      new TdMenu({
        defaultActive: activeIndex,
        class: 'td-menu-demo',
        mode: 'horizontal',
        emits: {
          select: handleSelect
        },
        slot: [
          new TdMenuItem({
            mIndex: '1',
            slot: 'Processing Center',
          }),
          new TdSubMenu({
            sIndex: '2',
            slot: [
              new TdMenuItem({
                mIndex: '2-1',
                slot: 'item one',
              }),
              new TdMenuItem({
                mIndex: '2-2',
                slot: 'item two',
              }),
              new TdMenuItem({
                mIndex: '2-3',
                slot: 'item three',
              }),
              new TdSubMenu({
                sIndex: '2-4',
                slot: [
                  new TdMenuItem({
                    mIndex: '2-4-1',
                    slot: 'item one',
                  }),
                  new TdMenuItem({
                    mIndex: '2-4-2',
                    slot: 'item two',
                  }),
                  new TdMenuItem({
                    mIndex: '2-4-3',
                    slot: 'item three',
                  }),
                ]
              }),
            ],
            slots: {
              title: 'item four',
            }
          }),
          new TdMenuItem({
            mIndex: '3',
            disabled: true,
            slot: 'item Info',
          }),
          new TdMenuItem({
            mIndex: '4',
            slot: 'Orders',
          })
        ]
      }),
      new Div({
        class: 'h-6'
      }),
      new TdMenu({
        defaultActive: activeIndex2,
        class: 'td-menu-demo',
        mode: 'horizontal',
        backgroundColor: '#545c64',
        textColor: '#fff',
        activeTextColor: '#ffd04b',
        emits: {
          select: handleSelect
        },
        slot: [
          new TdMenuItem({
            mIndex: '1',
            slot: 'Processing Center',
          }),
          new TdSubMenu({
            sIndex: '2',
            slot: [
              new TdMenuItem({
                mIndex: '2-1',
                slot: 'item one',
              }),
              new TdMenuItem({
                mIndex: '2-2',
                slot: 'item two',
              }),
              new TdMenuItem({
                mIndex: '2-3',
                slot: 'item three',
              }),
              new TdSubMenu({
                sIndex: '2-4',
                slot: [
                  new TdMenuItem({
                    mIndex: '2-4-1',
                    slot: 'item one',
                  }),
                  new TdMenuItem({
                    mIndex: '2-4-2',
                    slot: 'item two',
                  }),
                  new TdMenuItem({
                    mIndex: '2-4-3',
                    slot: 'item three',
                  })
                ],
                slots: {
                  title: 'item four'
                }
              }),
            ]
          }),
          new TdMenuItem({
            mIndex: '3',
            disabled: true,
            slot: 'Info',
          }),
          new TdMenuItem({
            mIndex: '4',
            slot: 'Orders',
          })
        ]
      })
    );
  }
}
