import { TypeDiv, onMounted, createStyle } from '@type-dom/framework';
import { TdButton, TdTooltip } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class TooltipAppendToExample extends TypeDiv {
  className = 'TooltipAppendToExample';
  override setup() {
    const targetElement = signal('')

    onMounted(() => {
      targetElement.set('.target');
    })
    createStyle(`
      .target {
        position: relative;
      }
    `)
    this.addChildren(
      new TdTooltip({
        appendTo: targetElement,
        trigger: 'click',
        content: 'Append to .target',
        placement: 'top',
        slot: new TdButton({
          class: 'target',
          slot: 'Click to open tooltip',
        })
      }),
    );
  }
}
