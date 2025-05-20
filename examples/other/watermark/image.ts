import { TypeFragment, Div } from '@type-dom/framework';
import { TdWatermark } from '@type-dom/ui';

export class WatermarkImageExample extends TypeFragment {
  className: 'WatermarkImageExample';
  constructor() {
    super();
    this.className = 'WatermarkImageExample';
  }
  override setup() {
    this.addChildren(
      new TdWatermark({
        width: 130,
        height: 30,
        image: 'https://element-plus.org/images/element-plus-logo.svg',
        slot: new Div({
          styleObj: {
            height: '500px',
          }
        })
      })
    )
  }
}