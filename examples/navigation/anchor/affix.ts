import { TypeDiv } from '@type-dom/framework';
import { TdAnchor, TdAnchorLink } from '@type-dom/ui';

export class AnchorAffixExample extends TypeDiv {
  className = 'AnchorAffixExample';

  constructor() {
    super();
    this.addChildren(
      new TdAnchor({
        offset: 70,
        slot: [
          new TdAnchorLink({
            href: '',
            slot: '锚点1'
          })
        ]
      })
    );
  }
}
