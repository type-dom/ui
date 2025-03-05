import { Span, TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdInputNumber, TdSpace } from '@type-dom/ui';

export class InputNumberWithPrefixSuffixExample extends TypeDiv {
  className = 'InputNumberWithPrefixSuffixExample';

  constructor() {
    super();
    const num = signal(1)
    this.addChild(
      new TdSpace({
        slot:[
          new TdInputNumber({
            vModel: num,
            min: 1,
            max:10,
            slots: {
              prefix: new Span({
                slot: '￥'
              })
            }
          }),
          new TdInputNumber({
            vModel: num,
            min: 1,
            max:10,
            slots: {
              suffix: new Span({
                slot: 'RMB'
              })
            }
          })
        ]
      })
    );
  }
}
