import { TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdInputNumber } from '@type-dom/ui';

export class InputNumberStepStrictlyExample extends TypeDiv {
  className = 'InputNumberStepStrictlyExample';

  constructor() {
    super();

    const num = signal(2)
    this.addChild(
      new TdInputNumber({
        vModel: num,
        step: 2,
        stepStrictly: true,
      })
    );
  }
}
