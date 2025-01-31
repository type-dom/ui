import { TypeDiv } from '@type-dom/framework';
import { TdAlert } from '@type-dom/ui';

export class AlertCenterExample extends TypeDiv {
  className = 'AlertCenterExample';

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
        center: true,
        showIcon: true,
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Info alert',
        type: 'info',
        center: true,
        showIcon: true,
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Warning alert',
        type: 'warning',
        center: true,
        showIcon: true,
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Error alert',
        type: 'error',
        center: true,
        showIcon: true,
        styleObj: $item,
      }),
    );
  }
}
