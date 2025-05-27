import { Span, TypeSpan, TypeSpanProps } from '@type-dom/framework';
import { computed, signal } from '@type-dom/signals';
import { ComponentSize } from '../../../../constants/size';
import { useLocale } from '../../../../hooks/use-locale';
import { useNamespace } from '../../../../hooks/use-namespace';
import { TdInput } from '../../../form/td-input/td-input.class';
import { usePagination } from '../usePagination';

export interface PaginationJumperProps extends TypeSpanProps {
  size?: ComponentSize;
}

export class PaginationJumper extends TypeSpan {
  className: 'PaginationJumper';
  override props: PaginationJumperProps;

  constructor(params: PaginationJumperProps = {}) {
    super();
    this.className = 'PaginationJumper';

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    // const emit = this.emit;
    const { t } = useLocale();
    const ns = useNamespace('pagination');
    const { pageCount, disabled, currentPage, changeEvent } = usePagination();
    const userInput = signal<number | string | undefined>();
    const innerValue = computed(() => userInput.get() ?? currentPage?.get());

    function handleInput(val: number | string) {
      userInput.set(val ? +val : '');
    }

    function handleChange(val: number | string) {
      val = Math.trunc(+val);
      changeEvent?.(val);
      userInput.set(undefined);
    }

    this.attr.addClass(ns.e('jump'));
    this.assignProps({
      disabled: disabled,
    });

    this.addChildren(
      new Span({
        class: ns.e('goto'),
        slot: t('el.pagination.goto'),
      }),
      new TdInput({
        size: props.size,
        class: [ns.e('editor'), ns.is('in-pagination')],
        disabled: disabled,
        modelValue: innerValue.get(),
        validateEvent: false,
        attrObj: {
          min: 1,
          max: pageCount,
          ariaLabel: t('el.pagination.page'),
          type: 'number',
        },
        emits: {
          'update:model-value': handleInput,
          change: handleChange,
        },
      }),
      new Span({
        class: ns.e('classifier'),
        slot: t('el.pagination.pageClassifier'),
      })
    );
  }
}
