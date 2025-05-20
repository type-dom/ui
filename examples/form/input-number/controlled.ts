import { TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdInputNumber } from '@type-dom/ui';

export class InputNumberControlledExample extends TypeDiv {
  className = 'InputNumberControlledExample';

  constructor() {
    super();

    const num = signal(1)
    const handleChange = (value: number | undefined) => {
      console.log(value)
    }
    this.addChildren(
      new TdInputNumber({
        vModel: num,
        min: 1,
        max:10,
        controlsPosition: 'right',
        size: 'large',
        emits: {
          change: handleChange
        }
      }),
      new TdInputNumber({
        vModel: num,
        class: 'mx-4',
        min: 1,
        max:10,
        controlsPosition: 'right',
        emits: {
          change: handleChange
        }
      }),
      new TdInputNumber({
        vModel: num,
        min: 1,
        max:10,
        controlsPosition: 'right',
        size: 'small',
        emits: {
          change: handleChange
        }
      })
    );
  }
}
