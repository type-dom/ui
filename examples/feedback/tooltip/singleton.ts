import { createClass, For, TypeDiv } from '@type-dom/framework';
import { TdButton, TdTooltip, Measurable } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

// todo 没有弹出框
export class TooltipSingletonExample extends TypeDiv {
  className = 'TooltipSingletonExample';
  constructor() {
    super();

    const buttonRef = signal<Measurable>()
    const tooltipRef = signal<TdTooltip>()
    const visible = signal(false)

    createClass('singleton-tooltip', {
      transition: 'transform 0.3s var(--td-transition-function-fast-bezier)'
    })
    this.addChildren(
      new For({
        data: [1, 2, 3],
        getter: (item, index) => new TdButton({
          slot: `Click to open tooltip`,
          events: {
            mouseover: (evt) => {
              buttonRef.set(evt.currentTarget as unknown as Measurable);
            },
            click: () => visible.set(!visible.get()),
          }
        }),
      }),
      new TdTooltip({
        refEl: tooltipRef,
        visible: visible,
        popperOptions: {
          middleware: [
            // {
            //   name: 'computeStyles',
            //   options: {
            //     adaptive: false,
            //     enabled: false,
            //   },
            // },
          ],
        },
        virtualRef: buttonRef,
        virtualTriggering: true,
        popperClass: 'singleton-tooltip',
        slots: {
          content: '<span> Some content </span>',
        }
      }),
    );
  }
}
