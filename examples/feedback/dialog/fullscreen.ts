import { Div, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdDialog } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class DialogFullScreenExample extends TypeDiv {
  className = 'DialogFullScreenExample';

  constructor() {
    super();

    const dialogVisible = signal(false)
    this.addChildren(
      new TdButton({
        plain: true,
        slot: 'Open the fullscreen Dialog',
        events: {
          click: () => dialogVisible.set(true),
        }
      }),
      new TdDialog({
        vModel: dialogVisible,
        fullscreen: true,
        top: '40vh',
        width: '70%',
        draggable: true,
        slot: new Span({
          slot: 'It\'s a fullscreen Dialog'
        }),
        slots: {
          footer: new Div({
            class: "dialog-footer",
            slot: [
              new TdButton({
                slot: 'Cancel',
                events: {
                  click: () => dialogVisible.set(false)
                }
              }),
              new TdButton({
                type: 'primary',
                slot: 'Confirm',
                events: {
                  click: () => dialogVisible.set(false)
                }
              })
            ]
          })
        }
      }),
    );
  }
}
