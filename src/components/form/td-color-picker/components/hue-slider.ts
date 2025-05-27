import {
  getCurrentInstance,
  onMounted,
  TypeDiv,
  Div,
} from '@type-dom/framework';
import { getClientXY } from '@type-dom/utils';
import { computed, signal, watch } from '@type-dom/signals';
import { useNamespace } from '../../../../hooks';
import { AlphaSliderProps } from '../props/alpha-slider';
import { draggable } from '../utils/draggable';

export class TdColorHueSlider extends TypeDiv {
  className = 'TdColorHueSlider';
  override props: AlphaSliderProps;
  update?: () => void;

  constructor(params: AlphaSliderProps = {}) {
    super();
    this.props = this.useParams(params);
  }
  override setup() {
    const props = this.props;
    const ns = useNamespace('color-hue-slider')
    const instance = getCurrentInstance()!
    // ref
    const thumb = signal<HTMLElement>()
    const bar = signal<HTMLElement>()
    // data
    const thumbLeft = signal(0)
    const thumbTop = signal(0)
    // computed
    const hueValue = computed(() => {
      return props.color?.get('hue')
    })
    // watch
    watch(
      () => hueValue.get(),
      () => {
        update()
      }
    )

    // methods
    function handleClick(event?: MouseEvent | TouchEvent) {
      // console.warn('handleClick . ');
      if (!event) return;
      const target = event?.target

      if (target !== thumb.get()) {
        handleDrag(event)
      }
    }

    function handleDrag(event: MouseEvent | TouchEvent) {
      // console.warn('handleDrag . ');
      if (!bar.get() || !thumb.get()) return

      const el = instance.dom as HTMLElement;
      const rect = el.getBoundingClientRect()
      const { clientX, clientY } = getClientXY(event)
      let hue

      if (!props.vertical) {
        let left = clientX - rect.left
        left = Math.min(left, rect.width - thumb.get().offsetWidth / 2)
        left = Math.max(thumb.get().offsetWidth / 2, left)

        hue = Math.round(
          ((left - thumb.get().offsetWidth / 2) /
            (rect.width - thumb.get().offsetWidth)) *
          360
        )
      } else {
        let top = clientY - rect.top

        top = Math.min(top, rect.height - thumb.get().offsetHeight / 2)
        top = Math.max(thumb.get().offsetHeight / 2, top)
        hue = Math.round(
          ((top - thumb.get().offsetHeight / 2) /
            (rect.height - thumb.get().offsetHeight)) *
          360
        )
      }
      props.color?.set('hue', hue)
    }

    function getThumbLeft() {
      // console.warn('getThumbLeft . ');
      if (!thumb.get()) return 0

      const el = instance.dom as HTMLElement

      if (props.vertical) return 0
      const hue = props.color?.get('hue') as number

      if (!el) return 0
      return Math.round(
        (hue * (el.offsetWidth - thumb.get().offsetWidth / 2)) / 360
      )
    }

    function getThumbTop() {
      // console.warn('getThumbTop . ');
      if (!thumb.get()) return 0

      const el = instance.dom as HTMLElement
      if (!props.vertical) return 0
      const hue = props.color?.get('hue') as number

      if (!el) return 0
      return Math.round(
        (hue * (el.offsetHeight - thumb.get().offsetHeight / 2)) / 360
      )
    }

    function update() {
      // console.warn('update . ');
      thumbLeft.set(getThumbLeft())
      // console.warn('getThumbTop() is ', getThumbTop())
      thumbTop.set(getThumbTop())
    }
    // mounded
    onMounted(() => {
      // console.warn('onMounted . ');
      if (!bar.get() || !thumb.get()) return
      const dragConfig = {
        drag: (event: MouseEvent | TouchEvent) => {
          handleDrag(event)
        },
        end: (event: MouseEvent | TouchEvent) => {
          handleDrag(event)
        },
      }

      draggable(bar.get(), dragConfig)
      draggable(thumb.get(), dragConfig)
      update()
    })
    this.update = update;

    this.attr.addClass([ns.b(), ns.is('vertical', props.vertical)]);
    this.addChildren(
      new Div({
        refDom: bar,
        class: [ns.e('bar')],
        events: {
          click: handleClick,
        },
      }),
      new Div({
        refDom: thumb,
        class: [ns.e('thumb')],
        styleObj: {
          left: computed(() => `${thumbLeft.get()}px`),
          top: computed(() => `${thumbTop.get()}px`),
        },
      })
    )
  }
}