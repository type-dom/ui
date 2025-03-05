import {
  inject,
  onBeforeUnmount,
  useEventListener,
  Div,
  Transition,
  TypeFragment
} from '@type-dom/framework';
import { computed, signal, unref } from '@type-dom/signals';
import { isClient, throwError } from '@type-dom/utils';
import { useNamespace } from '../../../../hooks/use-namespace';
import { BAR_MAP, renderThumbStyle } from '../util';
import { scrollbarContextKey } from '../td-scrollbar.const';
import { IThumb, ThumbProps } from './thumb.interface';

export class Thumb
  extends TypeFragment
  implements IThumb
{
  className: 'Thumb';
  override props: ThumbProps;

  constructor(params: ThumbProps = {}) {
    super();
    this.className = 'Thumb';

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const COMPONENT_NAME = 'Thumb';

    const scrollbar = inject(scrollbarContextKey)
    const ns = useNamespace('scrollbar')

    if (!scrollbar) throwError(COMPONENT_NAME, 'can not inject scrollbar context')

    const instance = signal<HTMLDivElement>()
    const thumb = signal<HTMLDivElement>()

    const thumbState = signal<Partial<Record<'X' | 'Y', number>>>({})
    const visible = signal(false)

    let cursorDown = false
    let cursorLeave = false
    let originalOnSelectStart:
      | ((this: GlobalEventHandlers, ev: Event) => any)
      | null = isClient ? document.onselectstart : null

    const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])

    const thumbStyle = computed(() => {
      // console.warn('thumStyle . ');
      // props.size?.get();
      // props.move?.get();
      return renderThumbStyle({
        size: props.size,
        move: props.move,
        bar: bar.get(),
      });
    }
    )

    const offsetRatio = computed(
      () =>
        // offsetRatioX = original width of thumb / current width of thumb / ratioX
        // offsetRatioY = original height of thumb / current height of thumb / ratioY
        // instance height = wrap height - GAP
        instance.get()![bar.get().offset] ** 2 /
        scrollbar.wrapElement!.get()![bar.get().scrollSize] /
        unref(props.ratio)! /
        thumb.get()![bar.get().offset]
    )

    const clickThumbHandler = (e?: MouseEvent) => {
      // prevent click event of middle and right button
      if (!e) return;
      e?.stopPropagation()
      if (e?.ctrlKey || [1, 2].includes(e.button)) return

      window.getSelection()?.removeAllRanges()
      startDrag(e)

      const el = e.currentTarget as HTMLDivElement
      if (!el) return
      thumbState.get()[bar.get().axis] =
        el[bar.get().offset] -
        (e[bar.get().client] - el.getBoundingClientRect()[bar.get().direction])
    }

    const clickTrackHandler = (e?: MouseEvent) => {
      if (!e || !thumb.get() || !instance.get() || !scrollbar.wrapElement) return

      const offset = Math.abs(
        (e.target as HTMLElement).getBoundingClientRect()[bar.get().direction] -
        e[bar.get().client]
      )
      const thumbHalf = thumb.get()![bar.get().offset] / 2
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100 * offsetRatio.get()) /
        instance.get()![bar.get().offset]

      scrollbar.wrapElement!.get()![bar.get()!.scroll] =
        (thumbPositionPercentage * scrollbar.wrapElement!.get()![bar.get().scrollSize]) /
        100
    }

    const startDrag = (e: MouseEvent) => {
      e.stopImmediatePropagation()
      cursorDown = true
      document.addEventListener('mousemove', mouseMoveDocumentHandler)
      document.addEventListener('mouseup', mouseUpDocumentHandler)
      originalOnSelectStart = document.onselectstart
      document.onselectstart = () => false
    }

    const mouseMoveDocumentHandler = (e: MouseEvent) => {
      if (!instance.get() || !thumb.get()) return
      if (cursorDown === false) return

      const prevPage = thumbState.get()[bar.get().axis]
      if (!prevPage) return

      const offset =
        (instance.get()!.getBoundingClientRect()[bar.get().direction] -
          e[bar.get().client]) *
        -1
      const thumbClickPosition = thumb.get()![bar.get().offset] - prevPage
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100 * offsetRatio.get()) /
        instance.get()![bar.get().offset]
      scrollbar.wrapElement.get()![bar.get().scroll] =
        (thumbPositionPercentage * scrollbar.wrapElement.get()![bar.get().scrollSize]) /
        100
    }

    const mouseUpDocumentHandler = () => {
      cursorDown = false
      thumbState.get()[bar.get().axis] = 0
      document.removeEventListener('mousemove', mouseMoveDocumentHandler)
      document.removeEventListener('mouseup', mouseUpDocumentHandler)
      restoreOnselectstart()
      if (cursorLeave) visible.set(false)
    }

    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false
      visible.set(!!props.size?.get())
    }

    const mouseLeaveScrollbarHandler = () => {
      cursorLeave = true
      visible.set(cursorDown)
    }

    onBeforeUnmount(() => {
      restoreOnselectstart()
      document.removeEventListener('mouseup', mouseUpDocumentHandler)
    })

    const restoreOnselectstart = () => {
      if (document.onselectstart !== originalOnSelectStart)
        document.onselectstart = originalOnSelectStart
    }

    useEventListener(
      scrollbar.scrollbarElement,
      'mousemove',
      mouseMoveScrollbarHandler
    )
    useEventListener(
      scrollbar.scrollbarElement,
      'mouseleave',
      mouseLeaveScrollbarHandler
    )

    this.addChild(
      new Transition({
        name: ns.b('fade'),
        slot: new Div({
          vShow: computed(() => props.always || visible.get()),
          refDom: instance,
          class: computed(() => [ns.e('bar'), ns.is(bar.get().key)]),
          events: {
            mousedown: clickTrackHandler,
          },
          slot: new Div({
            refDom: thumb,
            class: ns.e('thumb'),
            styleObj: thumbStyle,
            events: {
              mousedown: clickThumbHandler,
            },
          }),
        })
      })
    );
  }
}
