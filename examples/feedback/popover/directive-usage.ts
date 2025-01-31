import { TypeDiv, Span } from '@type-dom/framework';
import { TdButton, TdPopover, TdTooltip } from '@type-dom/ui';

// 不再推荐
export class PopoverDirectiveUsageExample extends TypeDiv {
  className = 'PopoverDirectiveUsageExample';
  constructor() {
    super();
    let visible = false;
    this.addChildren(
      new TdButton({
        slot: 'Click me',
        events: {
          click: (evt, element) => {
            visible = true;
          }
        }
      }),
      new TdPopover({
        refId: 'popoverRef',
        trigger: 'click',
        title: 'With title',
        // virtualTriggering: true, // 没有这个属性 ？？？
        persistent: true,
        slot: new Span({
          slot: 'Some content',
        }),
      }),
    );
  }
}
