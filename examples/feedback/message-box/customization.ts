import { P, I, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage, TdMessageBox } from '@type-dom/ui';
import { isRef, signal } from '@type-dom/signals';

export class MessageBoxCustomizationExample extends TypeDiv {
  className = 'MessageBoxCustomizationExample';

  constructor() {
    super();
    const open = () => {
      TdMessageBox({
        title: 'Message',
        message: new P({
          slot: [
            new Span({ slot: 'Message can be ' }),
            new I({
              slot: 'VNode',
              styleObj: {
                color: 'teal',
              },
            }),
          ],
        }),
        showCancelButton: true,
        confirmButtonText: signal('OK'),
        cancelButtonText: signal('Cancel'),
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            if (isRef(instance.confirmButtonText)) {
              instance.confirmButtonText.set('Loading...');
            } else {
              instance.confirmButtonText = 'Loading...';
            }
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        },
      })
        .then((action) => {
          TdMessage({
            type: 'info',
            message: `action: ${action}`,
          });
        })
        .catch(() => {
          TdMessage({
            type: 'info',
            message: 'Cancel',
          });
        });
    };
    this.addChildren(
      new TdButton({
        slot: 'Click to open the Message Box',
        plain: true,
        events: {
          click: open,
        },
      })
    );
  }
}
