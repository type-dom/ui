import { Div, Span, TypeDiv } from '@type-dom/framework';
import { $dialogFooterStyle, TdButton, TdDialog } from '@type-dom/ui';

export class LoadingFullscreenExample extends TypeDiv {
  className = 'LoadingFullscreenExample';

  constructor() {
    super();
    this.addChildren(
      new TdButton({
        slot: 'Open the outer Dialog',
        // styleObj: $item,
      }),
      new TdDialog({
        title: 'Outer Dialog',
        modelValue: false,
        width: 800,
        slot: [
          new Span({
            slot: 'This is a message'
          }),
          new TdDialog({
            refId: 'innerDialogRef',
            title: 'Inner Dialog',
            modelValue: false,
            width: 500,
            appendToBody: true,
            slot: new Span({
              slot: 'This is the inner Dialog'
            }),
          })
        ],
        slots: {
          footer: new Div({
            styleObj: $dialogFooterStyle,
            slot: [
              new TdButton({
                slot: 'Cancel',
              }),
              new TdButton({
                type: 'primary',
                slot: ' Open the inner Dialog',
                styleObj: {
                  marginLeft: '12px'
                },
              })
            ]
          })
        }
      }),
    );
  }
}
