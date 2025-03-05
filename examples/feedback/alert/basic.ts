import { TypeDiv } from '@type-dom/framework';
import { TdAlert } from '@type-dom/ui';

export class AlertBasicExample extends TypeDiv {
  className = 'AlertBasicExample';

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
        title: 'Success alert',
        type: 'success',
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Info alert',
        type: 'info',
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Warning alert',
        type: 'warning',
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Error alert',
        type: 'error',
        styleObj: $item,
      }),
    );
  }
}
