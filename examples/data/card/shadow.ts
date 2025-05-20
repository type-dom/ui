import { TypeDiv } from '@type-dom/framework';
import { TdCard } from '@type-dom/ui';

export class CardShadowExample extends TypeDiv {
  className = 'CardShadowExample';

  constructor() {
    super();
    this.style.addObj({
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
    });
    this.addChildren(
      new TdCard({
        shadow: 'always',
        styleObj: {
          width: '480px'
        },
        slot: 'Always'
      }),
      new TdCard({
        shadow: 'hover',
        styleObj: {
          width: '480px'
        },
        slot: 'Hover'
      }),
      new TdCard({
        shadow: 'never',
        styleObj: {
          width: '480px'
        },
        slot: 'Never'
      })
    );
  }
}
