import { createClass, Div, Span, TypeDiv } from '@type-dom/framework';
import { TdSlider } from '@type-dom/ui';
import { signal } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';

export class SliderShowMarksExample extends TypeDiv {
  className: 'SliderShowMarksExample';

  constructor() {
    super();
    this.className = 'SliderShowMarksExample';

    interface Mark {
      style: IStyle
      label: string
    }

    type Marks = Record<number, Mark | string>

    const value = signal([30, 60])
    const marks: Marks = {
      0: '0°C',
      8: '8°C',
      37: '37°C',
      50: {
        style: {
          color: '#1989FA',
        },
        label: '50%',
      },
    }
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
        slot: new TdSlider({
          vModel: value,
          range: true,
          marks: marks,
        })
      }),
    );
  }
}
