import { onMounted, onUnmounted, TypeDiv, TypeHtml } from '@type-dom/framework';
import { Measurable, TdButton, TdTooltip } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

// todo
export class TooltipVirtualTriggerExample extends TypeDiv {
  className = 'TooltipVirtualTriggerExample';

  constructor() {
    super();

    const visible = signal(false)
    const triggerRef = signal<Measurable>({
      getBoundingClientRect() {
        return position.get()
      },
    })

    const position = signal({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    } as DOMRect)

    const mousemoveHandler = (e) => {
      position.set(DOMRect.fromRect({
        width: 0,
        height: 0,
        x: e.clientX,
        y: e.clientY
      }));
      // console.log('position is ', position);
    };
    onMounted(() => {
      document.addEventListener('mousemove', mousemoveHandler);
    });

    onUnmounted(() => {
      document.removeEventListener('mousemove', mousemoveHandler);
    });
    this.addChildren(
      new TdTooltip({
        vModel: visible,
        content: 'Bottom center',
        placement: 'bottom',
        effect: 'light',
        trigger: 'click',
        virtualTriggering: true,
        virtualRef: triggerRef
      }),
      new TdButton({
        slot: 'test',
        events: {
          click: (evt, element) =>  visible.set(!visible.get())
        }
      })
    );
  }
}
