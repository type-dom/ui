import { Div, TypeDiv } from '@type-dom/framework';
import { TdSegmented } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SegmentedBasicExample extends TypeDiv {
  className = 'SegmentedBasicExample';

  constructor() {
    super();
    const value = signal('Mon')
    const options = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.addChild(new Div({
      styleObj: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '1rem',
      },
      slot: [
        new TdSegmented({
          vModel: value,
          size: 'large',
          options: options,
        }),
        new TdSegmented({
          vModel: value,
          options: options,
        }),
        new TdSegmented({
          vModel: value,
          size: 'small',
          options: options,
        }),
      ]
    }))
  }
}
