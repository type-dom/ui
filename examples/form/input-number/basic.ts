import { TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdInputNumber } from '@type-dom/ui';

export class InputNumberBasicExample extends TypeDiv {
  className = 'InputNumberBasicExample';

 override  setup() {
    const num = signal(1)
    const handleChange = (value: number | undefined) => {
      console.log(value)
    }
    this.addChild(
      new TdInputNumber({
        vModel: num,
        min: 1,
        max:10,
        emits: {
          change: handleChange
        }
      })
    );
  }
}
