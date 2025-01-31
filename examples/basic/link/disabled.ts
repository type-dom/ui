import { TypeDiv } from '@type-dom/framework';
import { TdLink } from '@type-dom/ui';

export class LinkDisabledExample extends TypeDiv {
  className: 'LinkDisabledExample';

  constructor() {
    super();
    this.className = 'LinkDisabledExample';
    this.addChildren(
      // 链接
      new TdLink({
        slot:'default',
        type: 'default',
        disabled: true,
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        }
      }),
      new TdLink({
        slot:'primary',
        type: 'primary',
        disabled: true,
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        }
      }),
      new TdLink({
        slot:'success',
        type: 'success',
        disabled: true,
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        }
      }),
      new TdLink({
        slot:'warning',
        type: 'warning',
        disabled: true,
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        }
      }),
      new TdLink({
        slot:'danger',
        type: 'danger',
        disabled: true,
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        }
      }),
      new TdLink({
        slot:'info',
        type: 'info',
        disabled: true,
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        }
      })
    );
  }
}
