import { Img, TypeDiv } from '@type-dom/framework';
import { TdCard } from '@type-dom/ui';

export class CardWithImagesExample extends TypeDiv {
  className = 'CardShadowExample';

  constructor() {
    super();
    this.addChild(
      new TdCard({
        styleObj: {
          maxWidth: '480px'
        },
        slot: new Img({
          attrObj: {
            src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
          },
          styleObj: {
            width: '100%',
          }
        }),
        slots: {
          header: 'Yummy hamburger'
        }
      })
    );
  }
}
