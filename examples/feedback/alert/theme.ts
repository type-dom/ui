import { TypeDiv } from '@type-dom/framework';
import { TdAlert } from '@type-dom/ui';

export class AlertThemeExample extends TypeDiv {
  className = 'AlertThemeExample';

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
        effect: 'dark',
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Info alert',
        type: 'info',
        effect: 'dark',
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Warning alert',
        type: 'warning',
        effect: 'dark',
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Error alert',
        type: 'error',
        effect: 'dark',
        styleObj: $item,
      }),
    );
  }
}
