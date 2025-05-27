import {
  getCurrentInstance,
  onMounted,
  TypeDiv,
  TypeDivProps,
  Div,
} from '@type-dom/framework';
import { computed, signal, watch } from '@type-dom/signals';
import { useNamespace } from '../../../../hooks/use-namespace/index';
import Color from '../utils/color';
import { getClientXY } from '@type-dom/utils';
import { draggable } from '../utils/draggable';

export interface SvPanelProps extends TypeDivProps {
  color?: Color
}
export class SvPanel  extends TypeDiv {
  className = 'TdSlPanel';
  override props: SvPanelProps;
  update?: () => void;

  constructor(params: SvPanelProps = {}) {
    super();
    this.props = this.useParams(params);
  }
  override setup() {
    const props = this.props;
    const ns = useNamespace('color-svpanel')

    // instance
    const instance = getCurrentInstance()!

    // data
    const cursorTop = signal(0)
    const cursorLeft = signal(0)
    const background = signal('hsl(0, 100%, 50%)')
    const colorValue = computed(() => {
      const hue = props.color?.get('hue')
      const value = props.color?.get('value')
      return { hue, value }
    })

    // methods
    function update() {
      const saturation = props.color?.get('saturation') as number
      const value = props.color?.get('value') as number

      const el = instance.dom as HTMLElement
      const { clientWidth: width, clientHeight: height } = el

      cursorLeft.set((saturation * width) / 100)
      cursorTop.set(((100 - value) * height) / 100)

      background.set(`hsl(${props.color?.get('hue')}, 100%, 50%)`)
    }

    function handleDrag(event: MouseEvent | TouchEvent) {
      // console.warn('handleDrag .');
      const el = instance.dom as HTMLElement
      const rect = el.getBoundingClientRect()
      const { clientX, clientY } = getClientXY(event)

      let left = clientX - rect.left
      let top = clientY - rect.top
      left = Math.max(0, left)
      left = Math.min(left, rect.width)

      top = Math.max(0, top)
      top = Math.min(top, rect.height)

      cursorLeft.set(left)
      cursorTop.set(top)
      props.color?.set({
        saturation: (left / rect.width) * 100,
        value: 100 - (top / rect.height) * 100,
      })
    }

    // watch
    watch(
      () => colorValue.get(),
      () => {
        update()
      }
    )
    // mounted
    onMounted(() => {
      draggable(instance.dom as HTMLElement, {
        drag: (event) => {
          handleDrag(event)
        },
        end: (event) => {
          handleDrag(event)
        },
      })

      update()
    })
    this.update = update;

    this.attr.addClass(ns.b());
    this.style.addObj({
      backgroundColor: background,
    })
    this.addChildren(
      new Div({
        class: ns.e('white'),
      }),
      new Div({
        class: ns.e('black'),
      }),
      new Div({
        class: ns.e('cursor'),
        styleObj: {
          top: computed(() => cursorTop.get() + 'px'),
          left: computed(() => cursorLeft.get() + 'px'),
        },
        slot: new Div()
      }),
    )
  }
}
