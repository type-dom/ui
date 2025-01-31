import { TypeDiv } from '@type-dom/framework';
import { TdText } from '@type-dom/ui';

export class SizesExample extends TypeDiv {
  className: 'TextSizeExample';

  constructor() {
    super();
    this.className = 'TextSizeExample';
    this.addChildren(
      new TdText({
        slot: 'Large',
        size: 'large',
        styleObj: {
          margin: '5px 10px'
        }
      }),
      new TdText({
        slot: 'Default',
        size: 'default',
        styleObj: {
          margin: '5px 10px'
        }
      }),
      new TdText({
        slot: 'Small',
        size: 'small',
        styleObj: {
          margin: '5px 10px'
        }
      })
    );
  }
}
