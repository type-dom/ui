import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdPopconfirm } from '@type-dom/ui';
import { ElInfoFilledSvg } from '@type-dom/svgs';

export class PopconfirmTriggerEventExample extends TypeDiv {
  className = 'PopconfirmTriggerEventExample';

  constructor() {
    super();

    const confirmEvent = () => {
      console.log('confirm!');
    };
    const cancelEvent = () => {
      console.log('cancel!');
    };
    this.addChildren(
      new TdPopconfirm({
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        icon: ElInfoFilledSvg,
        iconColor: '#626AEF',
        title: 'Are you sure to delete this?',
        emits: {
          confirm: confirmEvent,
          cancel: cancelEvent,
        },
        slots: {
          reference: new TdButton({
            slot: 'Delete',
          }),
        },
      })
    );
  }
}
