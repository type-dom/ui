import { TypeDiv } from '@type-dom/framework';
import { TdResult, TdCol, TdRow, TdButton } from '@type-dom/ui';

export class ResultBasicExample extends TypeDiv {
  className = 'ResultBasicExample';
  constructor() {
    super();
    this.addChild(
      new TdRow({
        slot: [
          new TdCol({
            sm: 12,
            lg: 6,
            slot: [new TdResult({
              icon: 'success',
              title: 'Success Tip',
              subTitle: 'Please follow the instructions',
              slots: {
                extra: new TdButton({
                  type: 'primary',
                  slot: 'Back',
                })
              }
            })]
          }),
          new TdCol({
            sm: 12,
            lg: 6,
            slot: [new TdResult({
              icon: 'warning',
              title: 'Warning Tip',
              subTitle: 'Please follow the instructions',
              slots: {
                extra: new TdButton({
                  type: 'primary',
                  slot: 'Back',
                })
              }
            })]
          }),
          new TdCol({
            sm: 12,
            lg: 6,
            slot: [new TdResult({
              icon: 'error',
              title: 'Error Tip',
              subTitle: 'Please follow the instructions',
              slots: {
                extra: new TdButton({
                  type: 'primary',
                  slot: 'Back',
                })
              }
            })]
          }),
          new TdCol({
            sm: 12,
            lg: 6,
            slot: [new TdResult({
              icon: 'info',
              title: 'Info Tip',
              subTitle: 'Please follow the instructions',
              slots: {
                extra: new TdButton({
                  type: 'primary',
                  slot: 'Back',
                })
              }
            })]
          })
        ],
      })
    );
  }
}
