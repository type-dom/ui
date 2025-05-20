import { TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdInputNumber } from '@type-dom/ui';

export class InputNumberStepsExample extends TypeDiv {
  className = 'InputNumberStepsExample';

  constructor() {
    super();

    const num = signal(5)
    this.addChild(
      new TdInputNumber({
        vModel: num,
        step: 2,
      })
    );
  }
}
