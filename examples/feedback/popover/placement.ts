import { Div, TypeDiv, createStyle } from '@type-dom/framework';
import { TdButton, TdPopover } from '@type-dom/ui';

export class PopoverPlacementExample extends TypeDiv {
  className = 'PopoverPlacementExample';

  constructor() {
    super();
    this.attr.addClass('popover-base-box');

    createStyle(`
      .popover-base-box {
        width: 600px;
      }
      
      .popover-base-box .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .popover-base-box .center {
        justify-content: center;
      }
      
      .popover-base-box .box-item {
        width: 110px;
        margin-top: 10px;
      }
    `)
    this.addChildren(
      new Div({
        class: 'row center',
        slot: [
          new TdPopover({
            class: 'box-item',
            title: 'Title',
            content: 'Top Left prompts info',
            placement: 'top-start',
            slots: {
              reference: new TdButton({
                slot: 'top-start',
              })
            }
          }),
          new TdPopover({
            class: 'box-item',
            title: 'Title',
            content: 'Top Center prompts info',
            placement: 'top',
            slots: {
              reference: new TdButton({
                slot: 'top'
              })
            }
          }),
          new TdPopover({
            class: 'box-item',
            title: 'Title',
            content: 'Top Right prompts info',
            placement: 'top-end',
            slots: {
              reference: new TdButton({
                slot: 'top-end'
              })
            }
          })
        ]
      }),

      new Div({
        class: 'row',
        slot: [
          new TdPopover({
            class: 'box-item',
            title: 'Title',
            content: 'Left Top prompts info',
            placement: 'left-start',
            slots: {
              reference: new TdButton({
                slot: 'left-start'
              })
            }
          }),
          new TdPopover({
            class: 'box-item',
            title: 'Title',
            content: 'Right Top prompts info',
            placement: 'right-start',
            slots: {
              reference: new TdButton({
                slot: 'right-start'
              })
            }
          })
        ]
      }),

      new Div({
        class: 'row',
        slot: [
          new TdPopover({
            class: 'box-item',
            title: 'Title',
            content: 'Left Center prompts info',
            placement: 'left',
            slots: {
              reference: new TdButton({
                class: 'mt-3 mb-3',
                slot: 'left',
              })
            }
          }),
          new TdPopover({
            class: 'box-item',
            title: 'Title',
            content: 'Right Center prompts info',
            placement: 'right',
            slots: {
              reference: new TdButton({
                slot: 'right'
              })
            }
          })
        ]
      }),

      new Div({
        class: 'row',
        slot: [
          new TdPopover({
            class: 'box-item',
            title: 'Title',
            content: 'Left Bottom prompts info',
            placement: 'left-end',
            slots: {
              reference: new TdButton({
                slot: 'left-end'
              })
            }
          }),
          new TdPopover({
            class: 'box-item',
            title: 'Title',
            content: 'Right Bottom prompts info',
            placement: 'right-end',
            slots: {
              reference: new TdButton({
                slot: 'right-end'
              })
            }
          })
        ]
      }),

      new Div({
        class: 'row center',
        slot: [
          new TdPopover({
            class: 'box-item',
            title: 'Title',
            content: 'Bottom Left prompts info',
            placement: 'bottom-start',
            slots: {
              reference: new TdButton({
                slot: 'bottom-start'
              })
            }
          }),
          new TdPopover({
            title: 'Title',
            content: 'Bottom Center prompts info',
            placement: 'bottom',
            slots: {
              reference: new TdButton({
                slot: 'bottom',
              })
            }
          }),
          new TdPopover({
            title: 'Title',
            content: 'Bottom Right prompts info',
            placement: 'bottom-end',
            slots: {
              rereference: new TdButton({
                slot: 'bottom-end',
              })
            }
          })
        ]
      })
    );
  }
}
