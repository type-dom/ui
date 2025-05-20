import { TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdInputNumber } from '@type-dom/ui';

export class InputNumberPrecisionExample extends TypeDiv {
  className = 'InputNumberPrecisionExample';

  constructor() {
    super();
    const num = signal(1)
    this.addChild(
      new TdInputNumber({
        vModel: num,
        precision: 2,
        step: 0.1,
        max: 10,
      })
    );
  }
}
