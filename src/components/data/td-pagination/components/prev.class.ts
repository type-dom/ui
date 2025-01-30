import {
  Span,
  SvgSvg,
  TypeButton,
  TypeButtonProps,
  TypeSvgSvg,
} from '@type-dom/framework';
import { useLocale } from '../../../../hooks/use-locale';
import { computed } from '@type-dom/signals';
import { TdIcon } from '@type-dom/ui';

export interface PaginationPrevProps extends TypeButtonProps {
  disabled?: boolean;
  currentPage?: number;
  prevText?: string;
  prevIcon?: typeof TypeSvgSvg;
}

export const paginationPrevEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export const paginationPrevProps: PaginationPrevProps = {
  currentPage: 1,
};

export class PaginationPrev extends TypeButton {
  className: 'PaginationPrev';
  override props: PaginationPrevProps;

  constructor(params: PaginationPrevProps = {}) {
    super();
    this.className = 'PaginationPrev';

    this.addEmits(paginationPrevEmits);
    this.assignProps(paginationPrevProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    const { t } = useLocale();

    const internalDisabled = computed(
      () => props.disabled || props.currentPage! <= 1
    );

    this.attr.addObj({
      type: 'button',
      class: 'btn-prev',
      disabled: internalDisabled,
      ariaLabel: this.props.prevText || t('el.pagination.prev'),
      ariaDisabled: internalDisabled,
    });

    this.addEvents({
      click: (evt) => emit('click', evt),
    });

    if (props.prevText) {
      this.addChild(
        new Span({
          slot: props.prevText,
        })
      );
    } else {
      this.addChild(
        new TdIcon({
          slot: new (props.prevIcon as typeof SvgSvg)(),
        })
      );
    }
  }
}
