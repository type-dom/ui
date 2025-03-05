import { TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdInputNumber } from '@type-dom/ui';

export class InputNumberSizeExample extends TypeDiv {
  className = 'InputNumberSizeExample';

  constructor() {
    super();

    const num1 = signal(1)
    const num2 = signal(2)
    const num3 = signal(3)
    this.addChildren(
      new TdInputNumber({
        vModel: num1,
        size: 'large',
      }),
      new TdInputNumber({
        vModel: num2,
        class: 'mx-4',
      }),
      new TdInputNumber({
        vModel: num3,
        size: 'small',
      })
    );
  }
}
