import { inject, Div, TypeFragment, TypeFragmentProps } from '@type-dom/framework';
import { Ref, signal, computed, watch } from '@type-dom/signals';
import { useNamespace } from '../../../../hooks';
import Color from '../utils/color';
import { colorPickerContextKey } from '../td-color-picker.const';

export interface PredefineProps extends TypeFragmentProps {
  colors?: string[], // require: true
  color?: Color, // require: true
  enableAlpha?: boolean; // require: true
}
export class Predefine extends TypeFragment {
  className = 'Predefine';
  override props: PredefineProps;
  constructor(params: PredefineProps = {}) {
    super();
    this.props = this.useParams(params);
  }
  override setup() {
    const props = this.props;
    const ns = useNamespace('color-predefine')
    const { currentColor } = inject(colorPickerContextKey)!

    const rgbaColors = signal(parseColors(props.colors, props.color)) as Ref<Color[]>

    watch(
      () => currentColor.get(),
      (val) => {
        const color = new Color()
        color.fromString(val)

        rgbaColors.get()?.forEach((item) => {
          item.selected?.set(color.compare(item))
        })
      }
    )

    // effect(() => {
    //   console.warn('Predefine . effect . ')
    //   // rgbaColors.set(parseColors(props.colors, props.color) ?? [])
    // })

    function handleSelect(index: number) {
      props.color?.fromString(props.colors![index])
    }

    function parseColors(colors?: string[], color?: Color) {
      // console.warn('parseColors . ')
      return colors?.map((value) => {
        const c = new Color()
        c.enableAlpha.set(!!props.enableAlpha)
        c.format.set('rgba')
        c.fromString(value)
        c.selected?.set(c.value.get() === color?.value.get())
        return c
      })
    }

    this.addChild(new Div({
      class: ns.b(),
      slot: new Div({
        class: ns.e('colors'),
        slot: rgbaColors.get()?.map((item: Color, index) => new Div({
          class: computed(() => [
            ns.e('color-selector'),
            ns.is('alpha', item._alpha.get() < 100),
            { selected: item.selected?.get() },
          ]),
          events: {
            click: () => handleSelect(index)
          },
          slot: new Div({
            styleObj: {
              backgroundColor: item.value
            }
          })
        }))
      }),
    }))
  }
}