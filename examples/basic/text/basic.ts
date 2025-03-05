import { TypeDiv } from '@type-dom/framework';
import { TdText } from '@type-dom/ui';

export class TextBasicExample extends TypeDiv {
  className: 'TextBasicExample';

  constructor() {
    super();
    this.className = 'TextBasicExample';
    this.addChildren(
      new TdText({
        slot: 'Default',
        styleObj: {
          margin: '5px 10px'
        }
      }),
      new TdText({
        slot: 'Primary',
        type: 'primary',
        styleObj: {
          margin: '5px 10px'
        }
      }),
      new TdText({
        slot: 'Success',
        type: 'success',
        styleObj: {
          margin: '5px 10px'
        }
      }),
      new TdText({
        slot: 'Warning',
        type: 'warning',
        styleObj: {
          margin: '5px 10px'
        }
      }),
      new TdText({
        slot: 'Danger',
        type: 'danger',
        styleObj: {
          margin: '5px 10px'
        }
      })
    );
  }
}
