import { isNumber } from '@type-dom/utils';
import { InjectionKey } from '@type-dom/framework';
import { ITdScrollbarConfig, ScrollbarContext } from './td-scrollbar.interface';

export const scrollbarProps: ITdScrollbarConfig = {
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
