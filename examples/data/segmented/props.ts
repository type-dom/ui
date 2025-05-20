import { TypeDiv } from '@type-dom/framework';
import { TdSegmented } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SegmentedPropsExample extends TypeDiv {
  className = 'SegmentedPropsExample';

  constructor() {
    super();
    const value = signal('Mon')
    const props = {
      label: 'myLabel',
      value: 'myValue',
      disabled: 'myDisabled',
    }
    const options = [
      {
        myLabel: 'Mon',
        myValue: 'Mon',
        myDisabled: true,
      },
      {
        myLabel: 'Tue',
        myValue: 'Tue',
      },
      {
        myLabel: 'Wed',
        myValue: 'Wed',
        myDisabled: true,
      },
      {
        myLabel: 'Thu',
        myValue: 'Thu',
      },
      {
        myLabel: 'Fri',
        myValue: 'Fri',
        myDisabled: true,
      },
      {
        myLabel: 'Sat',
        myValue: 'Sat',
      },
      {
        myLabel: 'Sun',
        myValue: 'Sun',
      },
    ]

    this.addChild(new TdSegmented({
      vModel: value,
      options: options,
      props
    }))
  }
}
