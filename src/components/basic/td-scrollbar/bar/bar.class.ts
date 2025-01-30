import { TypeFragment } from '@type-dom/framework';
import { GAP } from '../util';
import { ScrollbarContext } from '../td-scrollbar.interface';
import { TdScrollbarThumb } from '../thumb/thumb.class';
import { scrollbarContextKey } from '../td-scrollbar.const';
import { ITdScrollbarBar, ITdScrollbarBarConfig } from './bar.interface';
import { barProps } from './bar.const';

export class TdScrollbarBar extends TypeFragment implements ITdScrollbarBar {
  className: 'TdScrollbarBar';
  override props: ITdScrollbarBarConfig;
  override childNodes: TdScrollbarThumb[];
  private scrollbar?: ScrollbarContext;
  private moveX: number;
  private moveY: number;
  private sizeWidth: string;
  private sizeHeight: string;
  private ratioX: number;
  private ratioY: number;

  constructor(params: ITdScrollbarBarConfig = {}) {
    super();
    this.className = 'TdScrollbarBar';
    this.childNodes = [];
    // this.attr.addName('td-scrollbar-bar');
    // this.style.addObj($scrollbarBarStyle);
    // config?.minSize 20
    this.moveX = 0;
    this.moveY = 0;
    this.sizeWidth = '';
    this.sizeHeight = '';
    this.ratioY = 1;
    this.ratioX = 1;

    this.assignProps(barProps);
    this.props = this.useParams(params);
    this.addChildren(
      new TdScrollbarThumb({
        move: this.moveX,
        ratio: this.ratioX,
        size: this.sizeWidth,
        always: this.props.always,
      }),
      new TdScrollbarThumb({
        move: this.moveY,
        ratio: this.ratioY,
        always: this.props.always,
        vertical: true,
      })
    );
  }

  override setup() {
    this.scrollbar = this.inject<ScrollbarContext>(scrollbarContextKey);
  }

  handleScroll = (wrap: HTMLDivElement) => {
    if (wrap) {
      const offsetHeight = wrap.offsetHeight - GAP;
      const offsetWidth = wrap.offsetWidth - GAP;

      this.moveY = ((wrap.scrollTop * 100) / offsetHeight) * this.ratioY;
      this.moveX = ((wrap.scrollLeft * 100) / offsetWidth) * this.ratioX;
    }
  };
  updateBar = () => {
    const wrap = this.scrollbar?.wrapElement.dom;
    if (!wrap) {
      return;
    }
    const offsetHeight = wrap.offsetHeight - GAP;
    const offsetWidth = wrap.offsetWidth - GAP;

    const originalHeight = offsetHeight ** 2 / wrap.scrollHeight;
    const originalWidth = offsetWidth ** 2 / wrap.scrollWidth;
    const height = Math.max(originalHeight, this.props.minSize!);
    const width = Math.max(originalWidth, this.props.minSize!);

    this.ratioY =
      originalHeight /
      (offsetHeight - originalHeight) /
      (height / (offsetHeight - height));
    this.ratioX =
      originalWidth /
      (offsetWidth - originalWidth) /
      (width / (offsetWidth - width));

    this.sizeHeight = height + GAP < offsetHeight ? `${height}px` : '';
    this.sizeWidth = width + GAP < offsetWidth ? `${width}px` : '';
  };
}
