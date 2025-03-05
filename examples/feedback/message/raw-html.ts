import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage } from '@type-dom/ui';

export class MessageRawHtmlExample extends TypeDiv {
  className = 'MessageRawHtmlExample';

  constructor() {
    super();
    const openHTML = () => {
      TdMessage({
        dangerouslyUseHTMLString: true,
        message: '<strong>This is <i>HTML</i> string</strong>',
      })
    }

    this.addChild(
      new TdButton({
        slot:'Use HTML string',
        plain: true,
        events: {
          click: openHTML
        }
      }),
    );
  }
}
