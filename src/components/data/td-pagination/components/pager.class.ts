import { LI, TypeUL, TypeULProps } from '@type-dom/framework';
import { useNamespace } from '../../../../hooks/use-namespace';
import { useLocale } from '../../../../hooks/use-locale';
import { computed, effect, signal } from '@type-dom/signals';
import { ElDArrowLeftSvg, ElMoreFilledSvg } from '@type-dom/svgs';

export interface PaginationPagerProps extends TypeULProps {
  currentPage?: number;
  pageCount?: number;
  pagerCount?: number;
  disabled?: boolean;
}

export const paginationPagerProps: PaginationPagerProps = {
  currentPage: 1,
  pagerCount: 7,
};

export class PaginationPager extends TypeUL {
  className: 'PaginationPager';
  override props: PaginationPagerProps;

  constructor(params: PaginationPagerProps = {}) {
    super();
    this.className = 'PaginationPager';
    this.assignProps(paginationPagerProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;
    const nsPager = useNamespace('pager');
    const nsIcon = useNamespace('icon');
    const { t } = useLocale();

    const showPrevMore = signal(false);
    const showNextMore = signal(false);
    const quickPrevHover = signal(false);
    const quickNextHover = signal(false);
    const quickPrevFocus = signal(false);
    const quickNextFocus = signal(false);
    // const pagers = computed(() => {
    //   const pagerCount = props.pagerCount!;
    //   const halfPagerCount = (pagerCount! - 1) / 2;
    //   const currentPage = Number(props.currentPage);
    //   const pageCount = Number(props.pageCount);
    //   let showPrevMore = false;
    //   let showNextMore = false;
    //   if (pageCount > pagerCount) {
    //     if (currentPage > pagerCount - halfPagerCount) {
    //       showPrevMore = true;
    //     }
    //     if (currentPage < pageCount - halfPagerCount) {
    //       showNextMore = true;
    //     }
    //   }
    //   const array: number[] = [];
    //   if (showPrevMore && !showNextMore) {
    //     const startPage = pageCount - (pagerCount - 2);
    //     for (let i = startPage; i < pageCount; i++) {
    //       array.push(i);
    //     }
    //   } else if (!showPrevMore && showNextMore) {
    //     for (let i = 2; i < pagerCount; i++) {
    //       array.push(i);
    //     }
    //   } else if (showPrevMore && showNextMore) {
    //     const offset = Math.floor(pagerCount / 2) - 1;
    //     for (let i = currentPage - offset; i <= currentPage + offset; i++) {
    //       array.push(i);
    //     }
    //   } else {
    //     for (let i = 2; i < pageCount; i++) {
    //       array.push(i);
    //     }
    //   }
    //   return array;
    // });

    const prevMoreKls = computed(() => [
      'more',
      'btn-quickprev',
      nsIcon.b(),
      nsPager.is('disabled', props.disabled),
    ]);
    // const nextMoreKls = computed(() => [
    //   'more',
    //   'btn-quicknext',
    //   nsIcon.b(),
    //   nsPager.is('disabled', props.disabled),
    // ]);

    const tabindex = computed(() => (props.disabled ? -1 : 0));
    effect(() => {
      const halfPagerCount = (props.pagerCount! - 1) / 2;
      showPrevMore.set(false);
      showNextMore.set(false);
      if (props.pageCount! > props.pagerCount!) {
        if (props.currentPage! > props.pagerCount! - halfPagerCount) {
          showPrevMore.set(true);
        }
        if (props.currentPage! < props.pageCount! - halfPagerCount) {
          showNextMore.set(true);
        }
      }
    });

    function onMouseEnter(forward = false) {
      if (props.disabled) return;
      if (forward) {
        quickPrevHover.set(true);
      } else {
        quickNextHover.set(true);
      }
    }

    function onFocus(forward = false) {
      if (forward) {
        quickPrevFocus.set(true);
      } else {
        quickNextFocus.set(true);
      }
    }

    function onEnter(e: UIEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'li' &&
        Array.from(target.classList).includes('number')
      ) {
        const newPage = Number(target.textContent);
        if (newPage !== props.currentPage) {
          emit('change', newPage);
        }
      } else if (
        target.tagName.toLowerCase() === 'li' &&
        Array.from(target.classList).includes('more')
      ) {
        onPagerClick(e);
      }
    }

    function onPagerClick(event?: UIEvent) {
      const target = event?.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'ul' || props.disabled) {
        return;
      }
      let newPage = Number(target.textContent);
      const pageCount = props.pageCount!;
      const currentPage = props.currentPage!;
      const pagerCountOffset = props.pagerCount! - 2;
      if (target.className.includes('more')) {
        if (target.className.includes('quickprev')) {
          newPage = currentPage - pagerCountOffset;
        } else if (target.className.includes('quicknext')) {
          newPage = currentPage + pagerCountOffset;
        }
      }
      if (!Number.isNaN(+newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }
        if (newPage > pageCount) {
          newPage = pageCount;
        }
      }
      if (newPage !== currentPage) {
        emit('change', newPage);
      }
    }

    this.attr.addClass(nsPager.b());
    this.addEvents({
      click: onPagerClick,
      keyup: (evt) => {
        if (evt?.key === 'Enter') {
          onEnter(evt);
        }
      },
    });
    this.addChildren(
      new LI({
        vIf: props.pageCount! > 0, // todo 待优化 要动态改变
        class: [
          nsPager.is('active', props.currentPage === 1),
          nsPager.is('disabled', props.disabled),
        ],
        attrObj: {
          class: 'number',
          ariaCurrent: props.currentPage === 1,
          ariaLabel: t('el.pagination.currentPage', { pager: 1 }),
          tabindex: tabindex,
        },
        slot: 1,
      }),
      new LI({
        vIf: showPrevMore,
        attrObj: {
          class: prevMoreKls,
          tabindex: tabindex,
          ariaLabel: t('el.pagination.prevPages', {
            pager: props.pagerCount! - 2,
          }),
        },
        events: {
          mouseenter: () => onMouseEnter(true),
          mouseleave: () => quickPrevHover.set(false),
          focus: () => onFocus(true),
          blur: () => quickPrevFocus.set(false),
        },
        slot: [
          // todo 如何动态刷新
          new ElDArrowLeftSvg({
            vIf:
              (quickNextHover.get() || quickNextFocus.get()) && !props.disabled,
          }),
          new ElMoreFilledSvg(), // v-else
        ],
      }),
      new LI({
        vIf: props.pageCount! > 1,
        class: [
          nsPager.is('active', props.currentPage === props.pageCount),
          nsPager.is('disabled', props.disabled),
        ],
        attrObj: {
          class: 'number',
          ariaCurrent: props.currentPage === props.pageCount,
          ariaLabel: t('el.pagination.currentPage', {
            pager: props.pageCount!,
          }),
          tabindex: tabindex,
        },
        slot: props.pageCount,
      })
    );
  }
}
