import {
  Span,
  SvgSvg,
  TypeButton,
  TypeButtonProps,
  TypeSvgSvg,
} from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { useLocale } from '../../../../hooks/use-locale';
import { TdIcon } from '../../../basic/td-icon/td-icon.class';

export interface PaginationNextProps extends TypeButtonProps {
  disabled?: boolean;
  currentPage?: number;
  pageCount?: number;
  nextText?: string;
  nextIcon?: typeof TypeSvgSvg;
}

export const paginationNextProps: PaginationNextProps = {
  currentPage: 1,
  pageCount: 50,
};

export class PaginationNext extends TypeButton {
  className: 'PaginationNext';
  override props: PaginationNextProps;

  constructor(params?: PaginationNextProps) {
    super();
    this.className = 'PaginationNext';
    this.assignProps(paginationNextProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const { t } = useLocale();

    const internalDisabled = computed(
      () =>
        props.disabled ||
        props.currentPage === props.pageCount ||
        props.pageCount === 0
    );
    this.attr.addObj({
      disabled: internalDisabled,
      type: 'button',
      class: 'btn-next',
      ariaLabel: props.nextText || t('el.pagination.next'),
      ariaDisabled: internalDisabled,
    });
    this.addEmits({
      click: (e) => {
        this.emit('click', e);
      },
    });
    if (props.nextText) {
      this.addChild(
        new Span({
          vIf: props.nextText,
          slot: props.nextText,
        })
      );
    } else {
      this.addChild(
        new TdIcon({
          slot: new (props.nextIcon as typeof SvgSvg)(),
        })
      );
    }
  }
}
