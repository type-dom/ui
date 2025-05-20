import { TypeDiv } from '@type-dom/framework';
import { TdAlert } from '@type-dom/ui';
import { ElBellSvg } from '@type-dom/svgs';

export class AlertIconExample extends TypeDiv {
  className = 'AlertIconExample';

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
        showIcon: true,
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Info alert',
        type: 'info',
        showIcon: true,
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Warning alert',
        type: 'warning',
        showIcon: true,
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Error alert',
        type: 'error',
        showIcon: true,
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Error alert with custom icon',
        type: 'error',
        showIcon: true,
        styleObj: $item,
        slots: {
          icon: new ElBellSvg()
        }
      })
    );
  }
}
