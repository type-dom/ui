import {
  Div,
  getCurrentInstance,
  provide,
  TypeFragment,
  TypeNode,
} from '@type-dom/framework';
import {
  ITdPagination,
  LayoutKey,
  PaginationProps,
} from './td-pagination.interface';
import {
  isAbsent,
  paginationEmits,
  paginationProps,
} from './td-pagination.const';
import { computed, signal, watch } from '@type-dom/signals';
import { useLocale } from '../../../hooks/use-locale';
import { useGlobalSize } from '../../../hooks/use-size';
import { useDeprecated } from 'libs/ui/src/hooks/use-deprecated';
import { useNamespace } from '../../../hooks/use-namespace';
import { debugWarn } from '@type-dom/utils';
import { tdPaginationKey } from './constants';
import { PaginationPrev } from './components/prev.class';
import { PaginationJumper } from './components/jumper.class';
import { PaginationPager } from './components/pager.class';
import { PaginationNext } from './components/next.class';
import { PaginationSizes } from './components/sizes.class';
import { PaginationTotal } from './components/total.class';

export class TdPagination extends TypeFragment implements ITdPagination {
  className: 'TdPagination';
  override props: PaginationProps;

  constructor(params: PaginationProps) {
    super();
    this.className = 'TdPagination';

    this.addEmits(paginationEmits);
    this.assignProps(paginationProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const componentName = 'TdPagination';
    const props = this.props;
    const emit = this.emit;

    const { t } = useLocale();
    const ns = useNamespace('pagination');
    // const vnodeProps = getCurrentInstance()!.vnode.props || {}
    const vnodeProps = getCurrentInstance()!.props.emits || {};
    const _globalSize = useGlobalSize();
    const _size = computed(() =>
      props.small ? 'small' : props.size ?? _globalSize.get()
    );
    useDeprecated(
      {
        from: 'small',
        replacement: 'size',
        version: '3.0.0',
        scope: 'el-pagination',
        ref: 'https://element-plus.org/zh-CN/component/pagination.html',
      },
      computed(() => !!props.small)
    );
    // we can find @xxx="xxx" props on `vnodeProps` to check if user bind corresponding events
    const hasCurrentPageListener =
      'onUpdate:currentPage' in vnodeProps ||
      'onUpdate:current-page' in vnodeProps ||
      'onCurrentChange' in vnodeProps;
    const hasPageSizeListener =
      'onUpdate:pageSize' in vnodeProps ||
      'onUpdate:page-size' in vnodeProps ||
      'onSizeChange' in vnodeProps;
    const assertValidUsage = computed(() => {
      // Users have to set either one, otherwise count of pages cannot be determined
      if (isAbsent(props.total) && isAbsent(props.pageCount)) return false;
      // <el-pagination ...otherProps :current-page="xxx" /> without corresponding listener is forbidden now
      // Users have to use two way binding of `currentPage`
      // If users just want to provide a default value, `defaultCurrentPage` is here for you
      if (!isAbsent(props.currentPage) && !hasCurrentPageListener) return false;
      // When you want to change sizes, things get more complex, detailed below
      // Basically the most important value we need is page count
      // either directly from props.pageCount
      // or calculated from props.total
      // we will take props.pageCount precedence over props.total
      if (props.layout?.includes('sizes')) {
        if (!isAbsent(props.pageCount)) {
          // if props.pageCount is assign by user, then user have to watch pageSize change
          // and recalculate pageCount
          if (!hasPageSizeListener) return false;
        } else if (!isAbsent(props.total)) {
          // Otherwise, we will see if user have props.pageSize defined
          // If so, meaning user want to have pageSize controlled himself/herself from component
          // Thus page size listener is required
          // users are account for page size change
          if (!isAbsent(props.pageSize)) {
            if (!hasPageSizeListener) {
              return false;
            }
          } else {
            // (else block just for explaination)
            // else page size is controlled by el-pagination internally
          }
        }
      }
      return true;
    });

    const innerPageSize = signal(
      isAbsent(props.defaultPageSize) ? 10 : props.defaultPageSize
    );
    const innerCurrentPage = signal(
      isAbsent(props.defaultCurrentPage) ? 1 : props.defaultCurrentPage
    );

    const pageSizeBridge = computed({
      get() {
        return isAbsent(props.pageSize) ? innerPageSize.get() : props.pageSize;
      },
      set(v: number) {
        if (isAbsent(props.pageSize)) {
          innerPageSize.set(v);
        }
        if (hasPageSizeListener) {
          emit('update:page-size', v);
          emit('size-change', v);
        }
      },
    });

    const pageCountBridge = computed<number>(() => {
      let pageCount = 0;
      if (!isAbsent(props.pageCount)) {
        pageCount = props.pageCount;
      } else if (!isAbsent(props.total)) {
        pageCount = Math.max(1, Math.ceil(props.total / pageSizeBridge.get()));
      }
      return pageCount;
    });

    const currentPageBridge = computed<number>({
      get() {
        return isAbsent(props.currentPage)
          ? innerCurrentPage.get()
          : props.currentPage;
      },
      set(v) {
        let newCurrentPage = v;
        if (v < 1) {
          newCurrentPage = 1;
        } else if (v > pageCountBridge.get()) {
          newCurrentPage = pageCountBridge.get();
        }
        if (isAbsent(props.currentPage)) {
          innerCurrentPage.set(newCurrentPage);
        }
        if (hasCurrentPageListener) {
          emit('update:current-page', newCurrentPage);
          emit('current-change', newCurrentPage);
        }
      },
    });

    watch(pageCountBridge, (val) => {
      if (currentPageBridge.get() > val) currentPageBridge.set(val);
    });

    watch(
      () => [currentPageBridge.get(), pageSizeBridge.get()],
      (value) => {
        emit('change', ...value);
      },
      { flush: 'post' }
    );

    function handleCurrentChange(val: number) {
      currentPageBridge.set(val);
    }

    function handleSizeChange(val: number) {
      pageSizeBridge.set(val);
      const newPageCount = pageCountBridge.get();
      if (currentPageBridge.get() > newPageCount) {
        currentPageBridge.set(newPageCount);
      }
    }

    function prev() {
      if (props.disabled) return;
      currentPageBridge.set(currentPageBridge.get() - 1);
      emit('prev-click', currentPageBridge.get());
    }

    function next() {
      if (props.disabled) return;
      currentPageBridge.set(currentPageBridge.get() + 1);
      emit('next-click', currentPageBridge.get());
    }

    function addClass(element: any, cls: string) {
      if (element) {
        if (!element.props) {
          element.props = {};
        }
        element.props.class = [element.props.class, cls];
      }
    }

    provide(tdPaginationKey, {
      pageCount: pageCountBridge,
      disabled: computed(() => props.disabled),
      currentPage: currentPageBridge,
      changeEvent: handleCurrentChange,
      handleSizeChange,
    });

    if (!assertValidUsage.get()) {
      debugWarn(componentName, t('el.pagination.deprecationWarning'));
      return;
    }
    if (!props.layout) return;
    if (props.hideOnSinglePage && pageCountBridge.get() <= 1) return;
    const rootChildren: Array<TypeNode> = [];
    const rightWrapperChildren: Array<TypeNode> = [];
    const rightWrapperRoot = new Div({
      class: ns.e('rightwrapper'),
      slot: rightWrapperChildren,
    });
    const TEMPLATE_MAP: Record<Exclude<LayoutKey, '->'>, TypeNode> = {
      prev: new PaginationPrev({
        disabled: props.disabled,
        currentPage: currentPageBridge.get(),
        prevText: props.prevText,
        prevIcon: props.prevIcon,
        events: {
          click: prev,
        },
      }),
      jumper: new PaginationJumper({
        size: _size.get(),
      }),
      pager: new PaginationPager({
        currentPage: currentPageBridge.get(),
        pageCount: pageCountBridge.get(),
        pagerCount: props.pagerCount,

        disabled: props.disabled,
        events: {
          change: (evt) => handleCurrentChange, // todo
        },
      }),
      next: new PaginationNext({
        disabled: props.disabled,
        currentPage: currentPageBridge.get(),
        pageCount: pageCountBridge.get(),
        nextText: props.nextText,
        nextIcon: props.nextIcon,
        events: {
          click: next,
        },
      }),
      sizes: new PaginationSizes({
        pageSize: pageSizeBridge.get(),
        pageSizes: props.pageSizes,
        popperClass: props.popperClass,
        disabled: props.disabled,
        teleported: props.teleported,
        size: _size.get(),
        appendSizeTo: props.appendSizeTo,
      }),
      slot: props.slot ?? (props.slots?.default as any),
      total: new PaginationTotal({
        total: isAbsent(props.total) ? 0 : props.total,
      }),
    };

    const components = props.layout
      .split(',')
      .map((item: string) => item.trim()) as LayoutKey[];

    let haveRightWrapper = false;

    components.forEach((c) => {
      if (c === '->') {
        haveRightWrapper = true;
        return;
      }
      if (!haveRightWrapper) {
        rootChildren.push(TEMPLATE_MAP[c]);
      } else {
        rightWrapperChildren.push(TEMPLATE_MAP[c]);
      }
    });

    addClass(rootChildren[0], ns.is('first'));
    addClass(rootChildren[rootChildren.length - 1], ns.is('last'));

    if (haveRightWrapper && rightWrapperChildren.length > 0) {
      addClass(rightWrapperChildren[0], ns.is('first'));
      addClass(
        rightWrapperChildren[rightWrapperChildren.length - 1],
        ns.is('last')
      );
      rootChildren.push(rightWrapperRoot);
    }

    this.addChild(
      new Div({
        class: [
          ns.b(),
          ns.is('background', props.background),
          ns.m(_size.get()),
        ],
        slot: rootChildren,
      })
    );
  }
}
