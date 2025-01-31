import { Div, TypeDiv } from '@type-dom/framework';
import { TdButton, TdTooltip } from '@type-dom/ui';
import './basic.scss';

export class TooltipBasicExample extends TypeDiv {
  className = 'TooltipBasicExample';

  constructor() {
    super();
    this.attr.addClass("tooltip-base-box");
    this.addChildren(
      new Div({
        class: "row center",
        slot: [
          new TdTooltip({
            class: 'box-item',
            effect: 'dark',
            placement: 'top-start',
            content: 'Top Left prompts info',
            slot: new TdButton({
              slot: 'top-start',
            })
          }),
          new TdTooltip({
            class: 'box-item',
            effect: 'dark',
            content: 'Top Center prompts info',
            placement: 'top',
            slot: new TdButton({
              slot: 'top',
            })
          }),
          new TdTooltip({
            class: 'box-item',
            effect: 'dark',
            content: 'Top Right prompts info',
            placement: 'top-end',
            slot: new TdButton({
              slot: 'top-end',
            })
          })
        ]
      }),

      new Div({
        class: 'row',
        slot: [
          new TdTooltip({
            class: 'box-item',
            effect: 'dark',
            content: 'Left Top prompts info',
            placement: 'left-start',
            slot: new TdButton({
              slot: 'left-start'
            })
          }),
          new TdTooltip({
            class: 'box-item',
            effect: 'dark',
            content: 'Right Top prompts info',
            placement: 'right-start',
            slot: new TdButton({
              slot: 'right-start'
            })
          })
        ]
      }),

      new Div({
        class: 'row',
        slot: [
          new TdTooltip({
            class: 'box-item',
            effect: 'dark',
            content: 'Left Center prompts info',
            placement: 'left',
            slot: new TdButton({
              class: 'mt-3 mb-3',
              slot: 'left',
            })
          }),
          new TdTooltip({
            class: 'box-item',
            effect: 'dark',
            content: 'Right Center prompts info',
            placement: 'right',
            slot: new TdButton({
              slot: 'right'
            })
          })
        ]
      }),

      new Div({
        class: 'row',
        slot: [
          new TdTooltip({
            class: 'box-item',
            effect: 'dark',
            content: 'Left Bottom prompts info',
            placement: 'left-end',
            slot: new TdButton({
              slot: 'left-end'
            })
          }),
          new TdTooltip({
            class: 'box-item',
            effect: 'dark',
            content: 'Right Bottom prompts info',
            placement: 'right-end',
            slot: new TdButton({
              slot: 'right-end'
            })
          })
        ]
      }),

      new Div({
        class: 'row center',
        slot: [
          new TdTooltip({
            class: 'box-item',
            effect: 'dark',
            content: 'Bottom Left prompts info',
            placement: 'bottom-start',
            slot: new TdButton({
              slot: 'bottom-start'
            })
          }),
          new TdTooltip({
            effect: 'dark',
            content: 'Bottom Center prompts info',
            placement: 'bottom',
            slot: new TdButton({
              slot: 'bottom',
            })
          }),
          new TdTooltip({
            effect: 'dark',
            content: 'Bottom Right prompts info',
            placement: 'bottom-end',
            slot: new TdButton({
              slot: 'bottom-end',
            })
          })
        ]
      })
    );
  }
}
