import { TypeDiv } from '@type-dom/framework';
import { TdLink } from '@type-dom/ui';

export class LinkUnderlineExample extends TypeDiv {
  className: 'LinkUnderlineExample';

  constructor() {
    super();
    this.className = 'LinkUnderlineExample';
    this.addChildren(
      new TdLink({
        slot:'Without Underline',
        underline: false,
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        }
      }),
      new TdLink({
        slot:'With Underline'
      })
    );
  }
}
