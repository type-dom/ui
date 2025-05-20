import { createClass, Div, TypeDiv } from '@type-dom/framework';
import { TdSlider } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SliderWithInputBoxExample extends TypeDiv {
  className = 'SliderSizesInputBoxExample';

  constructor() {
    super();
    const value = signal(0)

    createClass('slider-demo-block', {
      maxWidth: '600px',
      display: 'flex',
      alignItems: 'center',
    });
    createClass('slider-demo-block td-slider', {
      marginTop: 0,
      marginLeft: '12px',
    });
    this.addChildren(
      new Div({
        class: 'slider-demo-block',
        slot: [
          new TdSlider({
            vModel: value,
            showInput: true,
          })
        ]
      }),
    );
  }
}
