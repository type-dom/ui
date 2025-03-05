import { isNumber } from '@type-dom/utils';
import { InjectionKey } from '@type-dom/framework';
import { ScrollbarProps, ScrollbarContext } from './td-scrollbar.interface';

export const scrollbarProps: ScrollbarProps = {
  native: false,
  tag: 'div',
  minSize: 20,
  // ...useAriaProps(['ariaLabel', 'ariaOrientation']),
} as const;

export const scrollbarEmits = {
  scroll: ({
    scrollTop,
    scrollLeft,
  }: {
    scrollTop: number;
    scrollLeft: number;
  }) => [scrollTop, scrollLeft].every(isNumber),
};

export const scrollbarContextKey: InjectionKey<ScrollbarContext> = Symbol(
  'scrollbarContextKey'
);
