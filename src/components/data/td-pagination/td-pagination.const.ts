import { isNumber } from '@type-dom/utils';

import { ElArrowLeftSvg, ElArrowRightSvg } from '@type-dom/svgs';
import { PaginationProps } from './td-pagination.interface';

/**
 * It it user's responsibility to guarantee that the value of props.total... is number
 * (same as pageSize, defaultPageSize, currentPage, defaultCurrentPage, pageCount)
 * Otherwise we can reasonable infer that the corresponding field is absent
 */
export const isAbsent = (v: unknown): v is undefined => typeof v !== 'number';

export const paginationProps: PaginationProps = {
  pagerCount: 7,
  layout: ['prev', 'pager', 'next', 'jumper', '->', 'total'].join(', '),
  pageSizes: [10, 20, 30, 40, 50, 100],
  prevIcon: ElArrowLeftSvg,
  nextIcon: ElArrowRightSvg,
  teleported: true,
};
export const paginationEmits = {
  'update:current-page': (val: number) => isNumber(val),
  'update:page-size': (val: number) => isNumber(val),
  'size-change': (val: number) => isNumber(val),
  change: (currentPage: number, pageSize: number) =>
    isNumber(currentPage) && isNumber(pageSize),
  'current-change': (val: number) => isNumber(val),
  'prev-click': (val: number) => isNumber(val),
  'next-click': (val: number) => isNumber(val),
};
