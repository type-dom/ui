import { Div, TypeDiv } from '@type-dom/framework';
import { TdTag } from '@type-dom/ui';


export class TagBasicExample extends TypeDiv {
  className = 'TagBasicExample';

  constructor() {
    super();
    const $item = {
      marginTop: '10px',
      marginRight: '30px'
    };
    this.addChild(new Div({
      name: 'basic',
      styleObj: {
        display: 'flex',
        gap: '0.5rem',
      },
      slot: [
        new TdTag({
          type: 'primary',
          slot: 'Tag 1'
        }),
        new TdTag({
          type: 'success',
          slot: 'Tag 2'
        }),
        new TdTag({
          type: 'info',
          slot: 'Tag 3'
        }),
        new TdTag({
          type: 'warning',
          slot: 'Tag 4'
        }),
        new TdTag({
          type: 'danger',
          slot: 'Tag 5'
        })
      ]
    }));
  }
}
