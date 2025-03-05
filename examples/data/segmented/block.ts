import { Div, TypeDiv } from '@type-dom/framework';
import { TdSegmented } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SegmentedBlockExample extends TypeDiv {
  className = 'SegmentedBlockExample';

  constructor() {
    super();
    const value = signal('Mon')
    const options = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday long long long long long long long'];
    this.addChild(new Div({
      slot: [
        new TdSegmented({
          vModel: value,
          options: options,
          block: true,
        }),
      ]
    }))
  }
}
