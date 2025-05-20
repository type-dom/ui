import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdIcon, TdRate, TdRow, TdSpace, TdText } from '@type-dom/ui';
import { ElBellSvg, ElElementPlusSvg } from '@type-dom/svgs';

export class Mixed extends TypeDiv {
  className = 'Mixed';

 override  setup() {
    this.addChild(new TdSpace({
      direction: 'vertical',
      slot: [
        new TdText({
          slot: [
            new TdIcon({
              slot: new ElElementPlusSvg()
            }),
            'Element-Plus'
          ]
        }),
        new TdRow({
          slot: [
            new TdText({
              slot: 'Rate'
            }),
            new TdRate({
              styleObj: {
                margin: '10px'
              }
            })
          ]
        }),
        new TdText({
          slot: [
            'This is text mixed icon',
            new TdIcon({
              slot: new ElBellSvg()
            }),
            'and component',
            new TdButton({
              slot: 'Button'
            })
          ]
        })
      ]
    }))
  }
}
