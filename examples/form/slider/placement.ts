import { createClass, Div, Span, TypeDiv } from '@type-dom/framework';
import { TdSlider } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SliderPlacementExample extends TypeDiv {
  className: 'SliderPlacementExample';

  constructor() {
    super();
    this.className = 'SliderPlacementExample';

    const value1 = signal(0)
    const value2 = signal(0)
    const value3 = signal(0)
    const value4 = signal(0)

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
          new Span({
            class: 'demonstration',
            slot: 'Default value'
          }),
          new TdSlider({
            vModel: value1
          })
        ]
      }),
      new Div({
        class: 'slider-demo-block',
        slot: new TdSlider({
          vModel: value2,
          placement: 'bottom',
        })
      }),
      new Div({
        class: 'slider-demo-block',
        slot: new TdSlider({
          vModel: value3,
          placement: 'right'
        })
      }),
      new Div({
        class: 'slider-demo-block',
        slot: new TdSlider({
          vModel: value4,
          placement: 'left'
        })
      }),
    );
  }
}
