import { Div, TypeDiv } from '@type-dom/framework';
import { TdAvatar, TdIcon } from '@type-dom/ui';
import { IStyle } from '@type-dom/css-type';
import { ElUserFilledSvg } from '@type-dom/svgs';
import './types.scss';

export class AvatarTypesExample extends TypeDiv {
  className = 'AvatarTypesExample';
  constructor() {
    super();
    const $div: IStyle = {
      flex: 1,
      textAlign: 'center',
    };
    this.addChild(new Div({
      class: 'demo-type',
      slot: [
        new Div({
          slot: [
            new TdAvatar({
              icon: new TdIcon({
                slot: new ElUserFilledSvg(),
              }),
            })
          ]
        }),
        new Div({
          slot: [
            new TdAvatar({
              src: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
            }),
          ]
        }),
        new Div({
          slot: [
            new TdAvatar({
              slot: 'user',
            })
          ]
        })
      ]
    }))
  }
}
