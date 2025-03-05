
import { I, P, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdNotification, TdSwitch } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class NotificationUseVNodeExample extends TypeDiv {
  className = 'NotificationUseVNodeExample';

  constructor() {
    super();

    const open = () => {
    TdNotification({
      title: 'Use Vnode',
      message: new P({
        slot: [
          new Span({
            slot: 'Message can be '
          }),
          new I({
            slot: 'VNode',
            styleObj: {
              color: 'teal'
            }
          })
        ]
      }),
    })
  }

  const open1 = () => {
    const checked = signal<boolean | string | number>(false)
    TdNotification({
      title: 'Use Vnode',
      // Should pass a function if VNode contains dynamic props
      message: new TdSwitch({
        vModel: checked,
        emits: {
          'onUpdate:modelValue': (val: boolean | string | number) => {
            console.log('UPDATE_MODEL_EVENT . val is ', val);
            checked.set(val);
          },
        },
      })
    })
  }
    this.addChildren(
      new TdButton({
        slot: 'Common VNode',
        plain: true,
        events: {
          click: open,
        }
      }),
      new TdButton({
        slot: 'Dynamic props',
        plain: true,
        events: {
          click: open1
        }
      }),
    );
  }
}
