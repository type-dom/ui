import { Br, TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdRate } from '@type-dom/ui';

export class RateSizes extends TypeDiv {
  className = 'RateSizes';

  setup() {
    const value = signal(0);
    this.addChildren(
      new TdRate({
        vModel: value,
        size: 'large',
      }),
      new Br(),
      new TdRate({
        vModel: value,
      }),
      new Br(),
      new TdRate({
        vModel: value,
        size: 'small',
      })
    )
  }
}
