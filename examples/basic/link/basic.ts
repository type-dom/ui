import { TypeDiv } from '@type-dom/framework';
import { TdLink } from '@type-dom/ui';

export class LinkBasicExample extends TypeDiv {
  className: 'LinkBasicExample';

  constructor() {
    super();
    this.className = 'LinkBasicExample';
    this.addChildren(
      // 链接
      new TdLink({
        slot: 'default',
        type: 'default',
        href: '/home',
        target: '_blank',
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        },
        emits: {
          click: event => {
            console.log('LinkBasicExample click', event);
          }
        }
      }),
      new TdLink({
        slot: 'primary',
        type: 'primary',
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        },
        emits: {
          click: event => {
            console.log('LinkBasicExample click', event);
          }
        }
      }),
      new TdLink({
        slot: 'success',
        type: 'success',
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        }
      }),
      new TdLink({
        slot: 'warning',
        type: 'warning',
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        }
      }),
      new TdLink({
        slot: 'danger',
        type: 'danger',
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        }
      }),
      new TdLink({
        slot: 'info',
        type: 'info',
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        }
      })
    );
  }
}
