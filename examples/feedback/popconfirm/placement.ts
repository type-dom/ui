import { createClass, Div, TypeDiv } from '@type-dom/framework';
import { TdButton, TdPopconfirm } from '@type-dom/ui';

export class PopconfirmPlacementExample extends TypeDiv {
  className = 'PopconfirmPlacementExample';

  constructor() {
    super();
    this.attr.addClass('popconfirm-base-box');

    createClass('popconfirm-base-box', {
      width: '600px'
    })
    createClass('popconfirm-base-box row', {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    })
    createClass('popconfirm-base-box center', {
      justifyContent: 'center'
    })
    createClass('popconfirm-base-box box-item', {
      width: '110px',
      marginTop: '10px',
    })
    this.addChildren(
      new Div({
        class: 'row center',
        slot: [
          new TdPopconfirm({
            class: 'box-item',
            title: 'Top Left prompts info',
            placement: 'top-start',
            slots: {
              reference: new TdButton({
                slot: 'top-start'
              })
            }
          }),
          new TdPopconfirm({
            class: 'box-item',
            title: 'Top Center prompts info?',
            placement: 'top',
            slots: {
              reference: new TdButton({
                slot: 'top',
              }),
            }
          }),
          new TdPopconfirm({
            class: 'box-item',
            title: 'Top Right prompts info',
            placement: 'top-end',
            slots: {
              reference: new TdButton({
                slot: 'top-end',
              }),
            }
          }),
        ]
      }),
      new Div({
        class: 'row',
        slot: [
          new TdPopconfirm({
            class: 'box-item',
            title: 'Left Top prompts info',
            placement: 'left-start',
            slots: {
              reference: new TdButton({
                slot: 'left-start',
              }),
            }
          }),
          new TdPopconfirm({
            class: 'box-item',
            title: 'Right Top prompts info',
            placement: 'right-start',
            slots: {
              reference: new TdButton({
                slot: 'right-start',
              })
            }
          })
        ]
      }),
      new Div({
        class: 'row',
        slot: [
          new TdPopconfirm({
            class: 'box-item',
            title: 'Left Center prompts info',
            placement: 'left',
            slots: {
              reference: new TdButton({
                class: 'mt-3 mb-3',
                slot: 'left',
              })
            }
          }),
          new TdPopconfirm({
            class: 'box-item',
            title: 'Right Center prompts info',
            placement: 'right',
            slots: {
              reference: new TdButton({
                slot: 'right',
              })
            }
          })
        ]
      }),
      new Div({
        class: 'row',
        slot: [
          new TdPopconfirm({
            class: 'box-item',
            title: 'Left Bottom prompts info',
            placement: 'left-end',
            slots: {
              reference: new TdButton({
                slot: 'left-end',
              })
            }
          }),
          new TdPopconfirm({
            class: 'box-item',
            title: 'Right Bottom prompts info',
            placement: 'right-end',
            slots:{
              reference: new TdButton({
                slot: 'right-end',
              })
            }
          })
        ]
      }),
      new Div({
        class: 'row center',
        slot: [
          new TdPopconfirm({
            class: 'box-item',
            title: 'Bottom Left prompts info',
            placement: 'bottom-start',
            slots: {
              reference: new TdButton({
                slot: 'bottom-start',
              })
            }
          }),
          new TdPopconfirm({
            class: 'box-item',
            title: 'Bottom Center prompts info',
            placement: 'bottom',
            slots: {
             reference: new TdButton({
               slot: 'bottom',
             })
            }
          }),
          new TdPopconfirm({
            class: 'box-item',
            title: 'Bottom Right prompts info',
            placement: 'bottom-end',
            slots: {
              reference: new TdButton({
                slot: 'bottom-end',
              })
            }
          })
        ]
      })
    );
  }
}
