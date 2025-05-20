import { Span, TypeDiv } from '@type-dom/framework';
import { TdIcon, TdMenu, TdMenuItemGroup, TdRadioButton, TdRadioGroup, TdSubMenu } from '@type-dom/ui';
import { signal } from '@type-dom/signals';
import { ElLocationSvg } from '@type-dom/svgs';

export class MenuCollapseExample extends TypeDiv {
  className = 'MenuCollapseExample';

  constructor() {
    super();

    const isCollapse = signal(true)
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    this.addChildren(
      new TdRadioGroup({
        vModel: isCollapse,
        styleObj: {
          marginTop: '20px'
        },
        slot: [
          new TdRadioButton({
            value: false,
            slot: 'expand'
          }),
          new TdRadioButton({
            value: true,
            slot: 'collapse'
          })
        ]
      }),
      new TdMenu({
        defaultActive: '2',
        class: 'td-menu-demo',
        collapse: isCollapse,
        emits: {
          open: handleOpen,
          close: handleClose,
        },
        slot: [
          new TdSubMenu({
            sIndex: '1',
            slots: {
              title: [
                new TdIcon({
                  slot: new ElLocationSvg()
                }),
                new Span({
                  slot: 'Navigator One'
                })
              ]
            },
            slot: [
              new TdMenuItemGroup({

              }),

            ],
          }),
        ]
      }),
    );
  }
}
