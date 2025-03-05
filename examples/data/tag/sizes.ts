import { Div, TypeDiv } from '@type-dom/framework';
import { TdBadge, TdButton, TdTag } from '@type-dom/ui';

export class TagSizesExample extends TypeDiv {
  className = 'TagSizesExample';

  constructor() {
    super();
    this.addChild(new Div({
      name: 'basic',
      styleObj: {
        display: 'flex',
        gap: '1rem'
      },
      slot: [
        new TdTag({
          size: 'large',
          slot: 'Large'
        }),
        new TdTag({
          slot: 'Default'
        }),
        new TdTag({
          size: 'small',
          slot: 'Small'
        }),
      ]
    }));
  }
}
