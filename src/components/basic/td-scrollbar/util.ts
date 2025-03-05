import { IStyle } from '@type-dom/css-type';
import { unref } from '@type-dom/signals';
import { ThumbProps } from './thumb/thumb.interface';
import { addUnit } from '@type-dom/utils';

export const GAP = 4; // top 2 + bottom 2 of bar instance

export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
} as const;

export const renderThumbStyle = ({
  move,
  size,
  bar,
}: Pick<ThumbProps, 'move' | 'size'> & {
  bar: (typeof BAR_MAP)[keyof typeof BAR_MAP];
}): IStyle => {
  // console.warn('size is ', size);
  // console.warn('move is ', move);
  // console.warn('bar is ', bar);
  return {
    [bar.size]: addUnit(size?.get()),
    transform: `translate${bar.axis}(${unref(move)}%)`,
  }
};
