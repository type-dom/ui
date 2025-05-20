import { TypeDiv } from '@type-dom/framework';
import { TdRate } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class RateText extends TypeDiv {
  className = 'RateText';

 override  setup() {
    const value = signal<number>()
    this.addChild(new TdRate({
      vModel: value,
      texts: ['oops', 'disappointed', 'normal', 'good', 'great'],
      showText: true,
    }))
  }
}
