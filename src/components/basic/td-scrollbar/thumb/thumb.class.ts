import { Div, Transition, TypeFragment } from '@type-dom/framework';
import { isClient, throwError } from '@type-dom/utils';
import { BAR_MAP, renderThumbStyle } from '../util';
import { ScrollbarContext } from '../td-scrollbar.interface';
import {
  $scrollbarBarStyle,
  $scrollbarThumbStyle,
} from '../td-scrollbar.style';
import { scrollbarContextKey } from '../td-scrollbar.const';
import { ITdScrollbarThumb, ITdScrollbarThumbConfig } from './thumb.interface';

export class TdScrollbarThumb
  extends TypeFragment
  implements ITdScrollbarThumb
{
  className: 'TdScrollbarThumb';
  override props: ITdScrollbarThumbConfig;
  private instance: Div;
  private thumb: Div;

  constructor(params: ITdScrollbarThumbConfig = {}) {
    super();
    this.className = 'TdScrollbarThumb';
    this.thumb = new Div({
      name: 'thumb',
      styleObj: $scrollbarThumbStyle,
    });
    this.instance = new Div({
      styleObj: $scrollbarBarStyle,
      slot: [this.thumb],
    });
    this.addChild(
      new Transition({
        name: 'fade',
        slot: this.instance,
      })
    );
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const COMPONENT_NAME = 'Thumb';

    const scrollbar = this.inject<ScrollbarContext>(scrollbarContextKey);

    if (!scrollbar) {
      throwError(COMPONENT_NAME, 'can not inject scrollbar context');
    }

    const thumbState: Partial<Record<'X' | 'Y', number>> = {};
    let visible = false;

    let cursorDown = false;
    let cursorLeave = false;
    let originalOnSelectStart:
      | ((this: GlobalEventHandlers, ev: Event) => any)
      | null = isClient ? document.onselectstart : null;

    const bar = BAR_MAP[props.vertical ? 'vertical' : 'horizontal'];

    const thumbStyle = renderThumbStyle({
      size: props.size,
      move: props.move,
      bar: bar,
    });

    const offsetRatio =
      // offsetRatioX = original width of thumb / current width of thumb / ratioX
      // offsetRatioY = original height of thumb / current height of thumb / ratioY
      // instance height = wrap height - GAP
      this.instance.dom
        ? this.instance.dom[bar.offset] ** 2 /
          scrollbar.wrapElement!.dom![bar.scrollSize] /
          props.ratio! /
          this.thumb!.dom![bar.offset]
        : 1;

    const clickThumbHandler = (e?: MouseEvent) => {
      // prevent click event of middle and right button
      e?.stopPropagation();
      if (e?.ctrlKey || [1, 2].includes(e!.button)) {
        return;
      }

      window.getSelection()?.removeAllRanges();
      startDrag(e);

      const el = e?.currentTarget as HTMLDivElement;
      if (!el) {
        return;
      }
      thumbState[bar.axis] =
        el[bar.offset] -
        (e![bar.client] - el.getBoundingClientRect()[bar.direction]);
    };
    this.thumb.addEvents({
      mousedown: clickThumbHandler,
    });
    const clickTrackHandler = (e?: MouseEvent) => {
      if (!this.thumb.dom || !this.instance.dom || !scrollbar.wrapElement.dom) {
        return;
      }

      const offset = Math.abs(
        (e?.target as HTMLElement).getBoundingClientRect()[bar.direction] -
          e![bar.client]
      );
      const thumbHalf = this.thumb.dom[bar.offset] / 2;
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100 * offsetRatio) /
        this.instance.dom[bar.offset];

      scrollbar.wrapElement.dom[bar.scroll] =
        (thumbPositionPercentage * scrollbar.wrapElement.dom[bar.scrollSize]) /
        100;
    };
    this.instance.addEvents({
      mousedown: clickTrackHandler,
    });

    const startDrag = (e?: MouseEvent) => {
      e?.stopImmediatePropagation();
      cursorDown = true;
      document.addEventListener('mousemove', mouseMoveDocumentHandler);
      document.addEventListener('mouseup', mouseUpDocumentHandler);
      originalOnSelectStart = document.onselectstart;
      document.onselectstart = () => false;
    };

    const mouseMoveDocumentHandler = (e: MouseEvent) => {
      if (!this.instance.dom || !this.thumb.dom) {
        return;
      }
      if (cursorDown === false) {
        return;
      }

      const prevPage = thumbState[bar.axis];
      if (!prevPage) {
        return;
      }

      const offset =
        (this.instance.dom.getBoundingClientRect()[bar.direction] -
          e[bar.client]) *
        -1;
      const thumbClickPosition = this.thumb.dom[bar.offset] - prevPage;
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100 * offsetRatio) /
        this.instance.dom[bar.offset];
      scrollbar.wrapElement.dom![bar.scroll] =
        (thumbPositionPercentage * scrollbar.wrapElement.dom![bar.scrollSize]) /
        100;
    };

    const mouseUpDocumentHandler = () => {
      cursorDown = false;
      thumbState[bar.axis] = 0;
      document.removeEventListener('mousemove', mouseMoveDocumentHandler);
      document.removeEventListener('mouseup', mouseUpDocumentHandler);
      restoreOnselectstart();
      if (cursorLeave) {
        visible = false;
      }
    };

    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false;
      visible = !!props.size;
    };

    const mouseLeaveScrollbarHandler = () => {
      cursorLeave = true;
      visible = cursorDown;
    };

    this.onBeforeUnmount(() => {
      restoreOnselectstart();
      document.removeEventListener('mouseup', mouseUpDocumentHandler);
    });

    const restoreOnselectstart = () => {
      if (document.onselectstart !== originalOnSelectStart) {
        document.onselectstart = originalOnSelectStart;
      }
    };
    scrollbar.scrollbarElement.addEvents({
      mousemove: mouseMoveScrollbarHandler,
      mouseleave: mouseLeaveScrollbarHandler,
    });
    // useEventListener(
    //   toRef(scrollbar, 'scrollbarElement'),
    //   'mousemove',
    //   mouseMoveScrollbarHandler
    // )
    // useEventListener(
    //   toRef(scrollbar, 'scrollbarElement'),
    //   'mouseleave',
    //   mouseLeaveScrollbarHandler
    // )
  }
}
