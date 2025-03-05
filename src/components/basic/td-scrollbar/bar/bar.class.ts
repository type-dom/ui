import { defineExpose, inject, TypeFragment } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { GAP } from '../util';
import { Thumb } from '../thumb/thumb.class';
import { scrollbarContextKey } from '../td-scrollbar.const';
import { IBar, BarProps } from './bar.interface';
import { barProps } from './bar.const';

export class Bar extends TypeFragment implements IBar {
  className: 'Bar';
  override props: BarProps;
  override childNodes: Thumb[];
  handleScroll?: (el?: HTMLDivElement) => void;
  updateDom?: (el?: HTMLDivElement) => void; // todo

  constructor(params: BarProps = {}) {
    super();
    this.className = 'Bar';
    this.childNodes = [];
    // this.attr.addName('td-scrollbar-bar');

    this.assignProps(barProps);
    this.props = this.useParams(params);

  }

  override setup() {

    const props = this.props;

    const scrollbar = inject(scrollbarContextKey)

    const moveX = signal(0)
    const moveY = signal(0)
    const sizeWidth = signal('')
    const sizeHeight = signal('')
    const ratioY = signal(1)
    const ratioX = signal(1)

    const handleScroll = (wrap: HTMLDivElement) => {
      if (wrap) {
        const offsetHeight = wrap.offsetHeight - GAP
        const offsetWidth = wrap.offsetWidth - GAP

        moveY.set(((wrap.scrollTop * 100) / offsetHeight) * ratioY.get())
        moveX.set(((wrap.scrollLeft * 100) / offsetWidth) * ratioX.get())
      }
    }

    const update = () => {
      const wrap = scrollbar?.wrapElement.get();
      if (!wrap) return
      const offsetHeight = wrap.offsetHeight - GAP
      const offsetWidth = wrap.offsetWidth - GAP

      const originalHeight = offsetHeight ** 2 / wrap.scrollHeight
      const originalWidth = offsetWidth ** 2 / wrap.scrollWidth
      const height = Math.max(originalHeight, props.minSize!)
      const width = Math.max(originalWidth, props.minSize!)

      ratioY.set(
        originalHeight /
        (offsetHeight - originalHeight) /
        (height / (offsetHeight - height))
      )

      ratioX.set(
        originalWidth /
        (offsetWidth - originalWidth) /
        (width / (offsetWidth - width))
      )

      sizeHeight.set(height + GAP < offsetHeight ? `${height}px` : '')
      // console.warn('sizeHeight is ', sizeHeight);
      sizeWidth.set(width + GAP < offsetWidth ? `${width}px` : '')
      // console.warn('sizeWidth is ', sizeWidth);
    }

    defineExpose({
      handleScroll,
      updateDom: update,
    })
    this.addChildren(
      new Thumb({
        move: moveX,
        ratio: ratioX,
        size: sizeWidth,
        always: props.always,
      }),
      new Thumb({
        move: moveY,
        ratio: ratioY,
        size: sizeHeight,
        vertical: true,
        always: props.always,
      })
    );
  }
}
