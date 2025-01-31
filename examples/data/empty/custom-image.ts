import { TypeDiv } from '@type-dom/framework';
import { TdEmpty } from '@type-dom/ui';

export class EmptyCustomImageExample extends TypeDiv {
  className = 'EmptyCustomImageExample';

  constructor() {
    super();
    this.addChildren(
      new TdEmpty({
        image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
      }),
    );
  }
}
