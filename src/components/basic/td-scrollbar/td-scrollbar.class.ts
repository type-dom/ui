import { Div, nextTick, TypeDiv, XElement } from '@type-dom/framework';
import { TdScrollbarBar } from './bar/bar.class';
import {
  ITdScrollbar,
  ITdScrollbarConfig,
  ScrollbarContext,
} from './td-scrollbar.interface';
import {
  scrollbarContextKey,
  scrollbarEmits,
  scrollbarProps,
} from './td-scrollbar.const';
import {
  $scrollbarStyle,
  $scrollbarWrapHiddenDefaultStyle,
  $scrollbarWrapStyle,
} from './td-scrollbar.style';
import { addUnit, debugWarn, isNumber, isObject } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';

export class TdScrollbar extends TypeDiv implements ITdScrollbar {
  className: 'TdScrollbar';
  override props: ITdScrollbarConfig;
  private wrap: Div;
  private bar?: TdScrollbarBar;

  handleScroll?: () => void;
  stopResizeObserver?: () => void;
  stopResizeListener?: () => void;
  scrollTo?: (xCord: number, yCord?: number) => void;
  setScrollTop?: (value: number) => void;
  scrollLeft?: (value: number) => void;

  constructor(params: ITdScrollbarConfig = {}) {
    super();
    this.className = 'TdScrollbar';
    this.attr.addName('td-scrollbar');
    this.style.addObj($scrollbarStyle);
    this.assignProps(scrollbarProps);
    this.props = this.useParams(params);

    this.wrap = new Div({
      name: 'td-scrollbar-wrap',
      styleObj: Object.assign({}, $scrollbarWrapStyle, params.wrapStyle),
      slot: [
        new XElement({
          tag: this.props.tag,
          name: 'td-scrollbar-resize',
          attrObj: {
            role: 'role',
            ariaLabel: params.ariaLabel,
            ariaOrientation: params.ariaOrientation,
          },
          styleObj: params.viewStyle,
          init: (element) => {
            element.slotChildren(params.slot);
          },
        }),
      ],
    });
    const wrapStyle: IStyle = {};
    if (params.height) {
      wrapStyle.height = addUnit(params.height);
    }
    if (params.maxHeight) {
      wrapStyle.maxHeight = addUnit(params.maxHeight);
    }
    this.wrap.style.addObj(wrapStyle);
    if (!this.props.native) {
      this.wrap.style.addObj($scrollbarWrapHiddenDefaultStyle);
    }
    this.addChild(this.wrap);
    this.addEmits(scrollbarEmits);
    if (!this.props?.native) {
      this.bar = new TdScrollbarBar({
        always: this.props?.always,
        minSize: this.props?.minSize,
      });
      this.addChild(this.bar);
    }
    this.provide<ScrollbarContext>(scrollbarContextKey, {
      scrollbarElement: this,
      wrapElement: this.wrap,
    });
  }

  override setup() {
    const COMPONENT_NAME = 'TdScrollbar';

    let wrapScrollTop = 0;
    let wrapScrollLeft = 0;

    const handleScroll = () => {
      if (this.wrap.dom) {
        this.bar?.handleScroll(this.wrap.dom);
        wrapScrollTop = this.wrap.dom.scrollTop;
        wrapScrollLeft = this.wrap.dom.scrollLeft;

        this.emit('scroll', {
          scrollTop: this.wrap.dom.scrollTop,
          scrollLeft: this.wrap.dom.scrollLeft,
        });
      }
    };
    this.handleScroll = handleScroll;
    this.wrap.addEvents({
      scroll: handleScroll,
    });

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    // TODO: refactor method overrides, due to script setup dts
    function scrollTo(xCord: number, yCord?: number): void;
    function scrollTo(options: ScrollToOptions): void;
    function scrollTo(arg1: unknown, arg2?: number) {
      if (isObject(arg1)) {
        self.wrap.dom?.scrollTo(arg1);
      } else if (isNumber(arg1) && isNumber(arg2)) {
        self.wrap.dom?.scrollTo(arg1, arg2);
      }
    }

    this.scrollTo = scrollTo;
    const setScrollTop = (value: number) => {
      if (!isNumber(value)) {
        debugWarn(COMPONENT_NAME, 'value must be a number');
        return;
      }
      this.wrap.dom!.scrollTop = value;
    };
    this.setScrollTop = setScrollTop;

    const setScrollLeft = (value: number) => {
      if (!isNumber(value)) {
        debugWarn(COMPONENT_NAME, 'value must be a number');
        return;
      }
      this.wrap.dom!.scrollLeft = value;
    };
    this.scrollLeft = setScrollLeft;

    this.onUpdated(() => this.updateScroll);

    this.setResize(this.props.noresize);
    if (!this.props.native) {
      nextTick(() => {
        this.updateScroll();
        if (this.wrap.dom) {
          this.bar?.handleScroll(this.wrap.dom);
        }
      });
    }

    // onActivated(() => {
    //   if (wrapRef.value) {
    //     wrapRef.value.scrollTop = wrapScrollTop
    //     wrapRef.value.scrollLeft = wrapScrollLeft
    //   }
    // })
  }

  override mounted() {
    if (!this.props.native) {
      nextTick(() => {
        this.updateScroll();
      });
    }
  }

  updateScroll = () => {
    this.bar?.updateBar();
  };

  setResize(noresize?: boolean) {
    if (noresize) {
      this.stopResizeObserver?.();
      this.stopResizeListener?.();
    } else {
      // ({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update))
      // this.stopResizeListener = useEventListener('resize', update)
      window.addEventListener('resize', this.updateScroll);
    }
  }

  override beforeUnmount() {
    window.removeEventListener('resize', this.updateScroll);
  }
}
