import { Div, TypeDiv } from '@type-dom/framework';
import { TdSegmented } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SegmentedDisabledExample extends TypeDiv {
  className = 'SegmentedDisabledExample';

  constructor() {
    super();
    const value = signal('Mon')
    const options = [
      {
        label: 'Mon',
        value: 'Mon',
        disabled: true,
      },
      {
        label: 'Tue',
        value: 'Tue',
      },
      {
        label: 'Wed',
        value: 'Wed',
        disabled: true,
      },
      {
        label: 'Thu',
        value: 'Thu',
      },
      {
        label: 'Fri',
        value: 'Fri',
        disabled: true,
      },
      {
        label: 'Sat',
        value: 'Sat',
      },
      {
        label: 'Sun',
        value: 'Sun',
      },
    ];

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
          options: options,
          disabled: true,
        }),
        new TdSegmented({
          vModel: value,
          options: options,
        }),
      ]
    }))
  }
}
