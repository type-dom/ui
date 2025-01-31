import { Div, Span, TypeDiv } from '@type-dom/framework';
import { TdAvatar } from '@type-dom/ui';
import './fit.scss';

export class AvatarFitExample extends TypeDiv {
  className = 'AvatarFitExample';
  constructor() {
    super();
    const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg';
    const fits =  [
      'fill',
      'contain',
      'cover',
      'none',
      'scale-down',
    ] as const;
    const fitList: Div[] = [];
    for (let i = 0; i < fits.length; i++) {
      const fit = fits[i];
      fitList.push(
        new Div({
          class: 'block',
          slot: [
            new Span({
              class: 'title',
              slot: fit,
            }),
            new TdAvatar({
              shape: 'square',
              size: 100,
              fit: fit,
              src: url,
            })
          ]
        })
      );
    }
    this.addChild(
      new Div({
        class: 'demo-fit',
        slot: fitList,
      })
    );
  }
}
