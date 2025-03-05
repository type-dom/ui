import { TypeDiv } from '@type-dom/framework';
import { TdRate } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class RateClearable extends TypeDiv {
  className = 'RateClearable';

  setup() {
    const value = signal(3)
    this.addChild(new TdRate({
      vModel: value,
      clearable: true,
    }))
  }
}
