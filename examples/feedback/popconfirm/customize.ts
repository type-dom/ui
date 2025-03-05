import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdPopconfirm } from '@type-dom/ui';
import { ElInfoFilledSvg } from '@type-dom/svgs';
import { signal } from '@type-dom/signals';

export class PopconfirmCustomizeExample extends TypeDiv {
  className = 'PopconfirmCustomizeExample';

  constructor() {
    super();

    const clicked = signal(true)
    function onCancel() {
      console.warn('onCancel . ');
      clicked.set(!clicked.get())
    }
    this.addChildren(
      new TdPopconfirm({
        width: 220,
        icon: ElInfoFilledSvg,
        iconColor: '#626AEF',
        title: 'Are you sure to delete this?',
        emits: {
          cancel: onCancel,
        },
        slots: {
          reference: new TdButton({
            slot: 'Delete',
          }),
          actions: (confirm, cancel) => {
            return [
              new TdButton({
                slot: 'No!',
                size: 'small',
                events: {
                  click: cancel
                }
              }),
              new TdButton({
                type: 'danger',
                size: 'small',
                slot: 'Yes?',
                disabled: clicked,
                events: {
                  click: confirm
                }
              })
            ]
          }
        }
      }),
    );
  }
}
