import {
  ITypeFragment,
  TypeFragmentProps,
  TypeSvgSvg,
} from '@type-dom/framework';
import { ComponentSize } from '../../../constants/size';
import { paginationEmits } from './td-pagination.const';

export interface ITdPagination extends ITypeFragment {
  className: 'TdPagination';
  props: PaginationProps;
}

export interface PaginationProps extends TypeFragmentProps {
  /**
   * @description options of item count per page
   */
  pageSize?: number;
  /**
   * @description default initial value of page size, not setting is the same as setting 10
   */
  defaultPageSize?: number;
  /**
   * @description total item count
   */
  total?: number;
  /**
   * @description total page count. Set either `total` or `page-count` and pages will be displayed; if you need `page-sizes`, `total` is required
   */
  pageCount?: number;
  /**
   * @description number of pagers. Pagination collapses when the total page count exceeds this value
   */
  pagerCount?: number;
  //   validator: (value: unknown) => {
  //     return (
  //       isNumber(value) &&
  //       Math.trunc(value) === value &&
  //       value > 4 &&
  //       value < 22 &&
  //       value % 2 === 1
  //     )
  //   },
  //   default: 7,
  // },
  /**
   * @description current page number
   */
  currentPage?: number;
  /**
   * @description default initial value of current-page, not setting is the same as setting 1
   */
  defaultCurrentPage?: number;
  /**
   * @description layout of Pagination, elements separated with a comma
   */
  layout?: string;
  //   default: (
  //     ['prev', 'pager', 'preview', 'jumper', '->', 'total'] as LayoutKey[]
  //   ).join(', '),
  // },
  /**
   * @description item count of each page
   *     default: () => mutable([10, 20, 30, 40, 50, 100] as const),
   */
  pageSizes?: number[];
  /**
   * @description custom class name for the page size Select's dropdown
   *     default: '',
   */
  popperClass?: string;
  /**
   * @description text for the prev button
   *     default: '',
   */
  prevText?: string;
  /**
   * @description icon for the prev button, higher priority of `prev-text`
   *     default: () => ArrowLeft,
   */
  prevIcon: typeof TypeSvgSvg;
  /**
   * @description text for the preview button
   *     default: '',
   */
  nextText?: string;
  /**
   * @description icon for the preview button, higher priority of `preview-text`
   *     default: () => ArrowRight,
   */
  nextIcon?: typeof TypeSvgSvg;
  /**
   * @description whether Pagination size is teleported to body
   *     default: true,
   */
  teleported?: boolean;
  /**
   * @description whether to use small pagination
   */
  small?: boolean;
  /**
   * @description set page size
   */
  size?: ComponentSize;
  /**
   * @description whether the buttons have a background color
   */
  background?: boolean;
  /**
   * @description whether Pagination is disabled
   */
  disabled?: boolean;
  /**
   * @description whether to hide when there's only one page
   */
  hideOnSinglePage?: boolean;
  /**
   * @description which element the size dropdown appends to.
   */
  appendSizeTo?: string;
}

export type LayoutKey =
  | 'prev'
  | 'pager'
  | 'next'
  | 'jumper'
  | '->'
  | 'total'
  | 'sizes'
  | 'slot';

export type PaginationEmits = typeof paginationEmits;
