import { TypeFragment, } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdColorPicker } from '@type-dom/ui';
export class AlphaExample extends TypeFragment {
  className = 'AlphaExample';
  override setup() {
    const color = signal('rgba(19, 206, 102, 0.8)')
    this.addChild(new TdColorPicker({
      vModel: color,
      showAlpha: true,
    }))
  }
}