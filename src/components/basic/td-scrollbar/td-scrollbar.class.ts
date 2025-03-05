import {
  defineExpose,
  Div,
  nextTick,
  onMounted,
  onUpdated,
  provide, StyleValue,
  TypeDiv,
  useEventListener,
  useResizeObserver,
  XElement
} from '@type-dom/framework';
import { computed, signal, watch } from '@type-dom/signals';
import { addUnit, Arrayable, debugWarn, isNumber, isObject } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';
import { useNamespace } from '../../../hooks/use-namespace';
import { Bar } from './bar/bar.class';
import {
  ITdScrollbar,
  ScrollbarProps,
} from './td-scrollbar.interface';
import {
  scrollbarContextKey,
  scrollbarEmits,
  scrollbarProps,
} from './td-scrollbar.const';
import './style/index';

export class TdScrollbar extends TypeDiv implements ITdScrollbar {
  className: 'TdScrollbar';
  override props: ScrollbarProps;

  handleScroll?: () => void;
  stopResizeObserver?: () => void;
  stopResizeListener?: () => void;
  scrollTo?: (xCord: number, yCord?: number) => void;
  setScrollTop?: (value: Arrayable<number>) => void;
  scrollLeft?: (value: number) => void;

  constructor(params: ScrollbarProps = {}) {
    super();
    this.className = 'TdScrollbar';
    this.attr.addName('td-scrollbar');
    this.addEmits(scrollbarEmits);
    this.assignProps(scrollbarProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const COMPONENT_NAME = 'TdScrollbar';

    const props = this.props;
    const emit = this.emit;

    const ns = useNamespace('scrollbar')

    let stopResizeObserver: (() => void) | undefined = undefined
    let stopResizeListener: (() => void) | undefined = undefined
    let wrapScrollTop = 0
    let wrapScrollLeft = 0

    const scrollbarRef = signal<HTMLDivElement>()
    const wrapRef = signal<HTMLDivElement>()
    const resizeRef = signal<HTMLElement>()
    const barRef = signal<Bar>()

    const wrapStyle = computed<StyleValue>(() => {
      const style: IStyle = {}
      if (props.height) style.height = addUnit(props.height)
      if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight)
      return [props.wrapStyle, style]
    })

    const wrapKls = computed(() => {
      return [
        props.wrapClass,
        ns.e('wrap'),
        { [ns.em('wrap', 'hidden-default')]: !props.native },
      ]
    })

    const resizeKls = computed(() => {
      return [ns.e('view'), props.viewClass]
    })

    const handleScroll = () => {
      // console.warn('handleScroll')
      if (wrapRef.get()) {
        barRef.get()?.handleScroll?.(wrapRef.get()!)
        wrapScrollTop = wrapRef.get()!.scrollTop
        wrapScrollLeft = wrapRef.get()!.scrollLeft

        emit('scroll', {
          scrollTop: wrapRef.get()?.scrollTop,
          scrollLeft: wrapRef.get()?.scrollLeft,
        })
      }
    }

// TODO: refactor method overrides, due to script setup dts
    function scrollTo(xCord: number, yCord?: number): void
    function scrollTo(options: ScrollToOptions): void
    function scrollTo(arg1: unknown, arg2?: number) {
      if (isObject(arg1)) {
        wrapRef.get()!.scrollTo(arg1)
      } else if (isNumber(arg1) && isNumber(arg2)) {
        wrapRef.get()!.scrollTo(arg1, arg2)
      }
    }

    const setScrollTop = (value: number) => {
      if (!isNumber(value)) {
        debugWarn(COMPONENT_NAME, 'value must be a number')
        return
      }
      wrapRef.get()!.scrollTop = value
    }

    const setScrollLeft = (value: number) => {
      if (!isNumber(value)) {
        debugWarn(COMPONENT_NAME, 'value must be a number')
        return
      }
      wrapRef.get()!.scrollLeft = value
    }

    const update = () => {
      barRef.get()?.updateDom?.()
    }

    watch(
      () => props.noresize,
      (noresize) => {
        if (noresize) {
          stopResizeObserver?.()
          stopResizeListener?.()
        } else {
          ({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update))
          stopResizeListener = useEventListener('resize', update)
        }
      },
      { immediate: true }
    )

    watch(
      () => [props.maxHeight, props.height],
      () => {
        if (!props.native)
          nextTick(() => {
            update()
            if (wrapRef.get()) {
              barRef.get()?.handleScroll?.(wrapRef.get())
            }
          })
      }
    )

    provide(
      scrollbarContextKey,
      // reactive({
      //   scrollbarElement: scrollbarRef,
      //   wrapElement: wrapRef,
      // })
      {
        scrollbarElement: scrollbarRef,
        wrapElement: wrapRef,
      }
    )

    // onActivated(() => {
    //   if (wrapRef.value) {
    //     wrapRef.value.scrollTop = wrapScrollTop
    //     wrapRef.value.scrollLeft = wrapScrollLeft
    //   }
    // })

    onMounted(() => {
      if (!props.native)
        nextTick(() => {
          update()
        })
    })
    onUpdated(() => update())

    defineExpose({
      /** @description scrollbar wrap ref */
      wrapRef,
      /** @description update scrollbar state manually */
      updateDom: update,
      /** @description scrolls to a particular set of coordinates */
      scrollTo,
      /** @description set distance to scroll top */
      setScrollTop,
      /** @description set distance to scroll left */
      setScrollLeft,
      /** @description handle scroll event */
      handleScroll,
    })

    this.assignProps({
      refDom: scrollbarRef,
      // class: ns.b() // todo 不生效 ？？？
    })
    this.attr.addClass(ns.b());

    this.addChild(new Div({
      name: 'td-scrollbar-wrap',
      refDom: wrapRef,
      class: wrapKls,
      styleObj: wrapStyle,
      attrObj: {
        tabindex: props.tabindex,
      },
      events: {
        scroll: handleScroll,
      },
      slot: [
        new XElement({
          tag: props.tag,
          refDom: resizeRef,
          class: resizeKls,
          name: 'td-scrollbar-resize',
          attrObj: {
            id: props.id,
            role: props.role,
            ariaLabel: props.ariaLabel,
            ariaOrientation: props.ariaOrientation,
          },
          styleObj: props.viewStyle,
          slot: props.slot
        }),
      ],
    }));

    if (!props?.native) {
      this.addChild(new Bar({
        refEl: barRef,
        always: props?.always,
        minSize: props?.minSize,
      }));
    }
  }
}
