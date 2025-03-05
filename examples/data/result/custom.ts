import { TypeDiv } from '@type-dom/framework';
import { TdButton, TdImage, TdResult } from '@type-dom/ui';

export class ResultCustomExample extends TypeDiv {
  className = 'ResultCustomExample';
  constructor() {
    super();
    this.addChild(new TdResult({
      title: '404',
      subTitle: 'Sorry, request error',
      slots: {
        icon: new TdImage({
          src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        }),
        extra: new TdButton({
          type: 'primary',
          slot: 'Back',
          events: {
            click: () => {
              console.log('click');
            }
          }
        })
      }
    }))
  }
}
