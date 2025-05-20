import { TypeFragment, Div, Span, createStyle } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdColorPicker } from '@type-dom/ui';

export class BasicExample extends TypeFragment {
  className = 'BasicExample';
  override setup() {
    createStyle(`
      .demo-color-block {
        display: flex;
        align-items: center;
        margin-bottom: 16px;
      }
      .demo-color-block .demonstration {
        margin-right: 16px;
      }
    `);
    const color1 = signal('#409EFF')
    const color2 = signal<string>()
    this.addChildren(
      new Div({
        class: 'demo-color-block',
        slot: [
          new Span({
            class: 'demonstration',
            slot: 'With default value'
          }),
          new TdColorPicker({
            vModel: color1,
          })
        ]
      }),
      new Div({
        class: 'demo-color-block',
        slot: [
          new Span({
            class: 'demonstration',
            slot: 'With no default value'
          }),
          new TdColorPicker({
            vModel: color2,
          })
        ]
      }),
    )
  }
}