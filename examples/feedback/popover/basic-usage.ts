import { createClass, TypeDiv } from '@type-dom/framework';
import { TdButton, TdPopover } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class PopoverBasicUsageExample extends TypeDiv {
  className = 'PopoverBasicUsageExample';

  constructor() {
    super();

    createClass('td-button + td-button', {
      marginLeft: '8px',
    });

    const visible = signal(false);
    this.addChildren(
      new TdPopover({
        placement: 'top-start',
        title: 'Title',
        width: 200,
        trigger: 'hover',
        content: 'this is content, this is content, this is content',
        slots: {
          reference: new TdButton({
            class: 'm-2',
            slot: 'Hover to activate',
            // styleObj: {
            //   marginLeft: '20px'
            // }
          })
        }
      }),
      new TdPopover({
        placement: 'bottom',
        title: 'Title',
        width: 200,
        trigger: 'click',
        content: 'this is content, this is content, this is content',
        slots: {
          reference: new TdButton({
            class: 'm-2',
            slot: 'Click to activate',
            // styleObj: {
            //   marginLeft: '20px'
            // }
          })
        }
      }),
      new TdPopover({
        placement: 'right',
        title: 'Title',
        width: 200,
        trigger: 'focus',
        content: 'this is content, this is content, this is content',
        slots: {
          reference: new TdButton({
            class: 'm-2',
            slot: 'Focus to activate',
            // styleObj: {
            //   marginLeft: '20px'
            // }
          })
        }
      }),
      new TdPopover({
        title: 'Title',
        width: 200,
        trigger: 'contextmenu',
        content: 'this is content, this is content, this is content',
        slots: {
          reference: new TdButton({
            class: 'm-2',
            slot: 'contextmenu to activate',
            // styleObj: {
            //   marginLeft: '20px'
            // }
          })
        }
      }),
      new TdPopover({
        visible: visible,
        placement: 'bottom',
        title: 'Title',
        width: 200,
        trigger: 'focus',
        content: 'this is content, this is content, this is content',
        slots: {
          reference: new TdButton({
            class: 'm-2',
            slot: 'Manual to activate',
            // styleObj: {
            //   marginLeft: '20px'
            // },
            events: {
              click: () => {
                console.warn('click');
                visible.set(!visible.get());
              }
            }
          })
        }
      }),
    );
  }
}
