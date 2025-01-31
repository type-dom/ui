import { TextNode, TypeDiv } from '@type-dom/framework';
import { TdBackTop } from '@type-dom/ui';

export class BackTopBasicExample extends TypeDiv {
  className = 'BackTopBasicExample';

  constructor() {
    super();
    this.addChildren(
      new TextNode('Scroll down to see the bottom-right button.'),
      new TdBackTop({
        right: 100,
        bottom: 100,
      })
    );
  }
}
