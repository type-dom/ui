import { TypeDiv } from '@type-dom/framework';
import { TdEmpty } from '@type-dom/ui';

export class EmptyBasicExample extends TypeDiv {
  className = 'EmptyBasicExample';

  constructor() {
    super();
    this.addChildren(
      new TdEmpty({
        description: 'description'
      }),
    );
  }
}
