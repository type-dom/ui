import { TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdIcon, TdInputNumber, TdSpace } from '@type-dom/ui';
import { ElArrowDownSvg, ElArrowUpSvg, ElMinusSvg, ElPlusSvg } from '@type-dom/svgs';

export class InputNumberCustomExample extends TypeDiv {
  className = 'InputNumberCustomExample';

  constructor() {
    super();

    const num = signal(1)

    this.addChild(
      new TdSpace({
        direction: 'vertical',
        slot: [
          new TdSpace({
            slot: [
              new TdInputNumber({
                vModel: num,
              }),
              new TdInputNumber({
                vModel: num,
                slots: {
                  decreaseIcon: new TdIcon({
                    slot: new ElArrowDownSvg(),
                  }),
                  increaseIcon: new TdIcon({
                    slot: new ElArrowUpSvg(),
                  })
                }
              })
            ]
          }),
          new TdSpace({
            slot: [
              new TdInputNumber({
                vModel: num,
                controlsPosition: 'right',
              }),
              new TdInputNumber({
                vModel: num,
                slots: {
                  decreaseIcon: new TdIcon({
                    slot: new ElMinusSvg(),
                  }),
                  increaseIcon: new TdIcon({
                    slot: new ElPlusSvg(),
                  })
                }
              })
            ]
          })
        ]
      }),
    );
  }
}
