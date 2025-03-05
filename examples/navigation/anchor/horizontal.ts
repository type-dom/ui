import { TypeDiv } from '@type-dom/framework';
import { TdAnchor, TdAnchorLink } from '@type-dom/ui';

export class AnchorHorizontalExample extends TypeDiv {
  className = 'AnchorHorizontalExample';

  constructor() {
    super();
    this.addChild(
      new TdAnchor({
        offset: 20,
        slot: new TdAnchorLink({
          title: 'Offset bottom 20px',
        })
      })
    );
  }
}
