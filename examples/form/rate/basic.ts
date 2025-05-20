import { Div, Span, TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdRate } from '@type-dom/ui';
import './basic.scss';

export class RateBasic extends TypeDiv {
  className = 'RateBasic';

 override  setup() {
    const value1 = signal(0);
    const value2 = signal(0);
    const colors = signal(['#99A9BF', '#F7BA2A', '#FF9900']); // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }

    this.addChildren(
      new Div({
        class: 'demo-rate-block',
        slot: [
          new Span({
            class: 'demonstration',
            slot: 'Default'
          }),
          new TdRate({
            vModel: value1,
          })
        ]
      }),
      new Div({
        class: 'demo-rate-block',
        slot: [
          new Span({
            class: 'demonstration',
            slot: 'Color for different levels'
          }),
          new TdRate({
            vModel: value2,
            colors: colors,
          })
        ]
      })
    )
  }
}
