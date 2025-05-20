import { TypeDiv } from '@type-dom/framework';
import { TdRate } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class RateAllowHalf extends TypeDiv {
  className = 'RateAllowHalf';

 override  setup() {
    const value = signal<number>()
    this.addChildren(
    new TdRate({
      vModel: value,
      allowHalf: true,
    }))
  }
}
