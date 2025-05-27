import { TextNode, TypeSpan, TypeSpanProps } from '@type-dom/framework';
import { useLocale } from '../../../../hooks/use-locale';
import { useNamespace } from '../../../../hooks/use-namespace';
// import { usePagination } from '../usePagination';

export interface PaginationTotalProps extends TypeSpanProps {
  total?: number;
}

export const paginationTotalProps: PaginationTotalProps = {
  total: 1000,
};

export class PaginationTotal extends TypeSpan {
  className: 'PaginationTotal';
  override props: PaginationTotalProps;

  constructor(params: PaginationTotalProps = {}) {
    super();
    this.className = 'PaginationTotal';
    this.assignProps(paginationTotalProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    // const emit = this.emit;

    const { t } = useLocale();
    const ns = useNamespace('pagination');
    // const { disabled } = usePagination();
    this.attr.addObj({
      class: ns.e('total'),
      role: 'status',
      ariaLabel: t('el.pagination.total'),
    });
    this.addChild(
      new TextNode(
        t('el.pagination.total', {
          total: props.total!.toString(),
        })
      )
    );
  }
}
