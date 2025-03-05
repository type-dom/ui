import { createClass, Div, Span, TypeDiv } from '@type-dom/framework';
import { TdSlider } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SliderDiscreteValuesExample extends TypeDiv {
  className: 'SliderDiscreteValuesExample';

  constructor() {
    super();
    this.className = 'SliderDiscreteValuesExample';

    const value1 = signal(0)
    const value2 = signal(0)

    createClass('slider-demo-block', {
      maxWidth: '600px',
      display: 'flex',
      alignItems: 'center',
    });
    createClass('slider-demo-block td-slider', {
      marginTop: 0,
      marginLeft: '12px',
    });
    createClass('slider-demo-block demonstration', {
      fontSize: '14px',
      color: 'var(--td-text-color-secondary)',
      lineHeight: '44px',
      flex: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      marginBottom: 0,
    });

    this.addChildren(
      new Div({
        class: 'slider-demo-block',
        slot: [
          new Span({
            class: 'demonstration',
            slot: 'Breakpoints not displayed'
          }),
          new TdSlider({
            styleObj: {
              flex: '0 0 70%'
            },
            vModel: value1,
            step: 10,
          })
        ]
      }),
      new Div({
        class: 'slider-demo-block',
        slot: [
          new Span({
            class: 'demonstration',
            slot: 'Breakpoints displayed'
          }),
          new TdSlider({
            styleObj: {
              flex: '0 0 70%'
            },
            vModel: value2,
            step: 10,
            showStops: true,
          })
        ]
      }),
    );
  }
}
