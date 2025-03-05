import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessageBox } from '@type-dom/ui';

export class MessageBoxUseHtmlExample extends TypeDiv {
  className = 'MessageBoxUseHtmlExample';

  constructor() {
    super();
    const open = () => {
      TdMessageBox.alert(
        '<strong>proxy is <i>HTML</i> string</strong>',
        'HTML String',
        {
          dangerouslyUseHTMLString: true,
        }
      );
    };
    this.addChildren(
      new TdButton({
        slot: 'Click to open the Message Box',
        plain: true,
        events: {
          click: open,
        },
      })
    );
  }
}
