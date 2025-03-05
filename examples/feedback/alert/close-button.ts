import { TypeDiv } from '@type-dom/framework';
import { TdAlert } from '@type-dom/ui';

export class AlertCloseButtonExample extends TypeDiv {
  className = 'AlertCloseButtonExample';

  constructor() {
    super();
    this.style.addObj({
      maxWidth: '600px',
    });
    const $item = {
      marginTop: '20px',
    };
    this.addChildren(
      new TdAlert({
        title: 'Unclosable alert',
        type: 'success',
        closable: false,
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Customized close text',
        type: 'info',
        closeText: 'Gotcha',
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Alert with callback',
        type: 'warning',
        styleObj: $item,
        emits: {
          close: () => {
            alert('Clicked!');
          }
        }
      }),
    );
  }
}
