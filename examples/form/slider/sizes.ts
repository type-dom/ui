import { createClass, Div, TypeDiv } from '@type-dom/framework';
import { TdSlider } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SliderSizesExample extends TypeDiv {
  className: 'SliderSizesExample';

  constructor() {
    super();
    this.className = 'SliderSizesExample';

    const value = signal(0)

    createClass('slider-demo-block', {
      maxWidth: '600px',
    });

    createClass('td-slider', {
      marginTop: '20px',
    });
    createClass('td-slider:first-child', {
      marginTop: 0,
    });

    this.addChildren(
      new Div({
        class: 'slider-demo-block',
        slot: new TdSlider({
          vModel: value,
          showInput: true,
          size: 'large'
        })
      }),
      new Div({
        class: 'slider-demo-block',
        slot: new TdSlider({
          vModel: value,
          styleObj: {
            marginTop: '20px',
          },
          showInput: true
        })
      }),
      new Div({
        class: 'slider-demo-block',
        slot: new TdSlider({
          styleObj: {
            marginTop: '20px',
          },
          vModel: value,
          showInput: true,
          size: 'small'
        })
      }),
    );
  }
}
