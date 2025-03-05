import { createClass, Div, Span, TypeDiv } from '@type-dom/framework';
import { TdSlider } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class SliderBasicExample extends TypeDiv {
  className: 'SliderBasicExample';

  constructor() {
    super();
    this.className = 'SliderBasicExample';

    const value1 = signal(0)
    const value2 = signal(0)
    const value3 = signal(0)
    const value4 = signal(0)
    const value5 = signal(0)

    const formatTooltip = (val: number) => {
      return val / 100
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
    createClass('slider-demo-block demonstration td-slider', {
      flex: '0 0 70%'
    })
    this.addChildren(
      new Div({
        class: 'slider-demo-block',
        slot: [
          new Span({
            class: 'demonstration',
            slot: 'Default value'
          }),
          new TdSlider({
            styleObj: {
              flex: '0 0 70%'
            },
            vModel: value1
          })
        ]
      }),
      new Div({
        class: 'slider-demo-block',
        slot: [
          new Span({
            class: 'demonstration',
            slot: 'Customized initial value'
          }),
          new TdSlider({
            styleObj: {
              flex: '0 0 70%'
            },
            vModel: value2
          })
        ]
      }),
      new Div({
        class: 'slider-demo-block',
        slot: [
          new Span({
            class: 'demonstration',
            slot: 'Hide Tooltip'
          }),
          new TdSlider({
            styleObj: {
              flex: '0 0 70%'
            },
            vModel: value3,
            showTooltip: false
          })
        ]
      }),
      new Div({
        class: 'slider-demo-block',
        slot: [
          new Span({
            class: 'demonstration',
            slot: 'Format Tooltip'
          }),
          new TdSlider({
            styleObj: {
              flex: '0 0 70%'
            },
            vModel: value4,
            formatTooltip: formatTooltip
          })
        ]
      }),
      new Div({
        class: 'slider-demo-block',
        slot: [
          new Span({
            class: 'demonstration',
            slot: 'Disabled'
          }),
          new TdSlider({
            styleObj: {
              flex: '0 0 70%'
            },
            vModel: value5,
            disabled: true
          })
        ]
      }),
    );
  }
}
