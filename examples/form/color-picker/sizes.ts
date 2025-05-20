import { TypeFragment, Div, createStyle } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdColorPicker } from '@type-dom/ui';

export class SizesExample extends TypeFragment {
  className = 'SizesExample';
  override setup() {
    const color = signal('409EFF')
    createStyle(`
      .demo-color-sizes .td-color-picker:not(:last-child) {
        margin-right: 16px;
      }
    `)
    this.addChildren(
      new Div({
        class: 'demo-color-sizes',
        slot: [
          new TdColorPicker({
            vModel: color,
            size: 'large'
          }),
          new TdColorPicker({
            vModel: color,
          }),
          new TdColorPicker({
            vModel: color,
            size: 'small'
          }),
        ]
      }),
    )
  }
}