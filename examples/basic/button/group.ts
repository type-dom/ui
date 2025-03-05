import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdButtonGroup } from '@type-dom/ui';
import {
  ElArrowLeftSvg,
  ElArrowRightSvg,
  ElDeleteSvg,
  ElEditSvg,
  ElShareSvg
} from '@type-dom/svgs';

export class ButtonGroupExample extends TypeDiv {
  className = 'ButtonGroupExample';

  constructor() {
    super();
    this.addChildren(...this.createButtonGroup());
  }

  createButtonGroup() {
    return [
      new TdButtonGroup({
        slot: [
          new TdButton({
            type: 'primary',
            slot: 'Previous Page',
            icon: new ElArrowLeftSvg()
          }),
          new TdButton({
            type: 'primary',
            slot: [
              'Next Page',
              new ElArrowRightSvg({
                styleObj: {
                  width: '1em',
                  height: '1em',
                  marginLeft: '5px'
                }
              })
            ],
            // iconPosition: 'right',
          })
        ]
      }),
      new TdButtonGroup({
        styleObj: {
          marginLeft: '1em'
        },
        slot: [
          new TdButton({
            type: 'primary',
            icon: new ElEditSvg()
          }),
          new TdButton({
            type: 'primary',
            icon: new ElShareSvg()
          }),
          new TdButton({
            type: 'primary',
            icon: new ElDeleteSvg()
          })
        ]
      })
    ];
  }
}
