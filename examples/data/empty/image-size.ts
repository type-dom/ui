import { TypeDiv } from '@type-dom/framework';
import { TdEmpty } from '@type-dom/ui';

export class EmptyImageSizeExample extends TypeDiv {
  className = 'EmptyImageSizeExample';

  constructor() {
    super();
    this.addChildren(
      new TdEmpty({
        imageSize: 200
      }),
    );
  }
}
