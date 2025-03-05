import { TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdInputNumber } from '@type-dom/ui';

export class InputNumberDisabledExample extends TypeDiv {
  className = 'InputNumberDisabledExample';

  constructor() {
    super();
    const num = signal(1)
    this.addChild(
      new TdInputNumber({
        vModel: num,
        disabled: true,
      })
    );
  }
}
