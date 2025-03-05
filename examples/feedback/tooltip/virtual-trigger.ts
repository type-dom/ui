import { onMounted, onUnmounted, TypeDiv } from '@type-dom/framework';
import { Measurable, TdButton, TdTooltip } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class TooltipVirtualTriggerExample extends TypeDiv {
  className = 'TooltipVirtualTriggerExample';

  setup() {

    const visible = signal(false)
    const position = signal({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    } as DOMRect)

    const triggerRef = signal<Measurable>({
      getBoundingClientRect: () => position.get()
    })

    const mousemoveHandler = (e) => {
      position.set(DOMRect.fromRect({
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
        visible: visible,
        content: 'Bottom center',
        placement: 'bottom',
        effect: 'light',
        trigger: 'click',
        virtualTriggering: true,
        virtualRef: triggerRef,
        emits: {
          'update:visible': (val) => {
            console.log('update:visible is ', val);
            visible.set(val);
          }
        }
      }),
      new TdButton({
        slot: 'test',
        events: {
          click: () =>  visible.set(!visible.get())
        }
      })
    );
  }
}
