import { Div, Img, TypeDiv } from '@type-dom/framework';
import { TdAvatar } from '@type-dom/ui';

export class AvatarFallbackExample extends TypeDiv {
  className = 'AvatarFallbackExample';
  constructor() {
    super();
    const errorHandler = () => true
    this.addChild(new Div({
      name: 'demo-type',
      slot: [
        new TdAvatar({
          size: 60,
          src: 'https://empty',
          emits: {
            error: errorHandler
          },
          slot: new Img({
            attrObj: {
              src: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
            }
          })
        })
      ]
    }))
  }
}
