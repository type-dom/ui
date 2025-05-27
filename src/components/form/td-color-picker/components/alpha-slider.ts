import { defineExpose, TypeDiv, Div } from '@type-dom/framework';
import { Signal } from '@type-dom/signals';
import { alphaSliderProps, AlphaSliderProps } from '../props/alpha-slider';
import { useAlphaSlider, useAlphaSliderDOM } from '../composables/use-alpha-slider';

export class TdColorAlphaSlider extends TypeDiv {
  className = 'TdColorAlphaSlider';
  override props: AlphaSliderProps;
  update?: () => void;
  bar?: Signal<HTMLElement>;
  thumb?: Signal<HTMLElement>;
  constructor(params: AlphaSliderProps = {}) {
    super();
    this.assignProps(alphaSliderProps);
    this.props = this.useParams(params);
  }
  override setup() {
    const props = this.props;
    const {
      alpha,
      alphaLabel,
      bar,
      thumb,
      handleDrag,
      handleClick,
      handleKeydown,
    } = useAlphaSlider(props)

    const { rootKls, barKls, barStyle, thumbKls, thumbStyle, update } =
      useAlphaSliderDOM(props, {
        bar,
        thumb,
        handleDrag,
      })

    defineExpose({
      /**
       * @description update alpha slider manually
       * @type {Function}
       */
      update,
      /**
       * @description bar element ref
       * @type {HTMLElement}
       */
      bar,
      /**
       * @description thumb element ref
       * @type {HTMLElement}
       */
      thumb,
    })
    this.attr.addClass(rootKls);
    this.addChildren(
      new Div({
        refDom: bar,
        class: barKls,
        styleObj: barStyle,
        events: {
          click: handleClick,
        }
      }),
      new Div({
        refDom: thumb,
        class: thumbKls,
        styleObj: thumbStyle,
        attrObj: {
          ariaLabel: alphaLabel,
          ariaValueNow: alpha,
          ariaOrientation: props.vertical ? 'vertical' : 'horizontal',
          ariaValueMin: 0,
          ariaValueMax: 100,
          role: 'slider',
          tabindex: 0,
        },
        events: {
          keydown: handleKeydown,
        }
      }),
    )
  }
}