import { InjectionKey } from '@type-dom/framework';
import { Computed } from '@type-dom/signals';
import { RowProps } from './td-row.interface';

interface RowContext {
  gutter: Computed<number | undefined>;
}

export const rowContextKey: InjectionKey<RowContext> = Symbol('rowContextKey');

export const rowProps: RowProps = {
  tag: 'div',
  gutter: 0,
  justify: 'start',
};
