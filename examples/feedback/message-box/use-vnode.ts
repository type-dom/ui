import { I, P, Span, TypeDiv } from '@type-dom/framework';
import {
  TdButton,
  TdMessageBox,
  TdSwitch,
  UPDATE_MODEL_EVENT,
} from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class MessageBoxUseVNodeExample extends TypeDiv {
  className = 'MessageBoxUseVNodeExample';

  constructor() {
    super();
    const open = () => {
      TdMessageBox({
        title: 'Message',
        message: new P({
          slot: [
            new Span({ slot: 'Message can be ' }),
            new I({ slot: 'VNode', styleObj: { color: 'teal' } }),
          ],
        }),
      });
    };
    const open1 = () => {
      let checked = signal<boolean | string | number>(false);
      TdMessageBox({
        title: 'Message',
        message: new TdSwitch({
          vModel: checked,
          // 'onUpdate:modelValue': (val: boolean | string | number) => {
          //   checked = val
          // },
          emits: {
            // 'onUpdate:modelValue': (val: boolean | string | number) => {
            //   checked = val
            // }
            [UPDATE_MODEL_EVENT]: (val: boolean | string | number) => {
              console.log('UPDATE_MODEL_EVENT . val is ', val);
              checked.set(val);
            },
          },
        }),
      });
    };
    this.addChildren(
      new TdButton({
        slot: 'Common VNode',
        plain: true,
        events: {
          click: open,
        },
      }),
      new TdButton({
        slot: 'Dynamic props',
        plain: true,
        events: {
          click: open1,
        },
      })
    );
  }
}
