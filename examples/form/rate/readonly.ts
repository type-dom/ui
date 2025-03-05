import { TypeDiv } from '@type-dom/framework';
import { TdRate } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class RateReadonly extends TypeDiv {
  className = 'RateReadonly';

  setup() {
    const value = signal(3.7)
    this.addChild(new TdRate({
      vModel: value,
      disabled: true,
      showScore: true,
      textColor: '#ff9900',
      scoreTemplate: value.get() + ' points'
    }))
  }
}
