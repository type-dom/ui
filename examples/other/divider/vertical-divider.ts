import { TypeDiv, Span } from '@type-dom/framework';
import { TdDivider } from '@type-dom/ui';

export class DividerVerticalExample extends TypeDiv {
  className: 'DividerVerticalExample';
  constructor() {
    super();
    this.className = 'DividerVerticalExample';
    this.addChildren(
        new Span({
          slot: 'Rain'
        }),
        new TdDivider({
          direction: 'vertical'
        }),
        new Span({
          slot: `Home`
        }),
      new TdDivider({
        direction: 'vertical',
        borderStyle: 'dashed'
      }),
      new Span({
        slot: `Grass`
      })
    )
  }
}