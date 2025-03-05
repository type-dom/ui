import { TypeSpan, TypeSpanProps } from '@type-dom/framework';
import { isArray } from '@type-dom/utils';
import { computed, signal, watch } from '@type-dom/signals';
import { isEqual } from 'lodash';
import { ComponentSize } from '../../../../constants/size';
import { useNamespace } from '../../../../hooks/use-namespace';
import { useLocale } from '../../../../hooks/use-locale';
import { TdSelect } from '../../../form/td-select/td-select.class';
import { usePagination } from '../usePagination';

export interface PaginationSizesProps extends TypeSpanProps {
  pageSize?: number;
  pageSizes?: number[];
  popperClass?: string;
  disabled?: boolean;
  teleported?: boolean;
  size?: ComponentSize;
  appendSizeTo?: string;
}

export const paginationSizesProps: PaginationSizesProps = {
  pageSizes: [10, 20, 30, 40, 50, 100],
};

export class PaginationSizes extends TypeSpan {
  className: 'PaginationSizes';
  override props: PaginationSizesProps;

  constructor(params: PaginationSizesProps = {}) {
    super();
    this.className = 'PaginationSizes';

    this.assignProps(paginationSizesProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;
    const { t } = useLocale();
    const ns = useNamespace('pagination');
    const pagination = usePagination();
    const innerPageSize = signal<number>(props.pageSize!);

    watch(
      () => props.pageSizes,
      (newVal, oldVal) => {
        if (isEqual(newVal, oldVal)) return;
        if (isArray(newVal)) {
          const pageSize = newVal.includes(props.pageSize!)
            ? props.pageSize
            : props.pageSizes![0];
          emit('page-size-change', pageSize);
        }
      }
    );

    watch(
      () => props.pageSize,
      (newVal) => {
        innerPageSize.set(newVal!);
      }
    );

    const innerPageSizes = computed(() => props.pageSizes);

    function handleChange(val: string | number) {
      if (val !== innerPageSize.get()) {
        innerPageSize.set(Number(val));
        pagination.handleSizeChange?.(Number(val));
      }
    }

    this.attr.addClass(ns.e('sizes'));
    this.addChild(
      new TdSelect({
        modelValue: innerPageSize,
        disabled: props.disabled,
        popperClass: props.popperClass,
        size: props.size,
        // teleported: props.teleported,
        validateEvent: false,
        // appendTo: props.appendSizeTo,
        events: {
          change: (evt) =>
            handleChange((evt?.target as HTMLInputElement).value),
        },
      })
    );
  }
}
