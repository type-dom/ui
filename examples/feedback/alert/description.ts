import { TypeDiv } from '@type-dom/framework';
import { TdAlert } from '@type-dom/ui';

export class AlertDescriptionExample extends TypeDiv {
  className = 'AlertDescriptionExample';

  constructor() {
    super();
    this.style.addObj({
      maxWidth: '600px',
    });
    this.addChildren(
      new TdAlert({
        title: 'With description',
        type: 'success',
        description: 'This is a description.',
      }),
    );
  }
}
