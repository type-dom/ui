import { TypeDiv } from '@type-dom/framework';
import { TdAlert } from '@type-dom/ui';

export class AlertIconDescriptionExample extends TypeDiv {
  className = 'AlertIconDescriptionExample';

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
        description: 'More text description',
        showIcon: true,
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Info alert',
        type: 'info',
        description: 'More text description',
        showIcon: true,
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Warning alert',
        type: 'warning',
        description: 'More text description',
        showIcon: true,
        styleObj: $item,
      }),
      new TdAlert({
        title: 'Error alert',
        type: 'error',
        description: 'More text description',
        showIcon: true,
        styleObj: $item,
      }),
    );
  }
}
