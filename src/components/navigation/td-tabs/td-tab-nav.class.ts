import { capitalize, throwError } from '@type-dom/utils';
import {
  Div,
  Span,
  nextTick,
  TypeDiv,
  onMounted,
  useResizeObserver,
  inject,
  onUpdated,
  defineExpose,
  arraySlot,
  useWindowFocus,
  useDocumentVisibility,
} from '@type-dom/framework';
import { ElArrowLeftSvg, ElArrowRightSvg, ElCloseSvg } from '@type-dom/svgs';
import { IStyle } from '@type-dom/css-type';
import { computed, signal, unref, watch } from '@type-dom/signals';
import { EVENT_CODE } from '../../../constants/aria';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdIcon } from '../../basic/td-icon/td-icon.class';

import { Scrollable, ITdTabNav, TabNavProps } from './td-tab-nav.interface';
import { TdTabBar } from './td-tab-bar.class';
// import { TdTabs } from './td-tabs.class';
import { tabsRootContextKey } from './constants';

export class TdTabNav extends TypeDiv implements ITdTabNav {
  className: 'TdTabNav';
  override props: TabNavProps;
  scrollToActiveTab?: () => Promise<void>;
  removeFocus?: () => void;

  constructor(params: TabNavProps = {}) {
    super();
    this.className = 'TdTabNav';
    this.attr.addName('td-tab-nav-wrap');

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;
    const COMPONENT_NAME = 'TdTabNav';
    const rootTabs = inject(tabsRootContextKey);
    if (!rootTabs) throwError(COMPONENT_NAME, `<td-tabs><tab-nav /></td-tabs>`);

    const ns = useNamespace('tabs');
    const visibility = useDocumentVisibility();
    const focused = useWindowFocus();

    const navScroll$ = signal<HTMLDivElement>();
    const nav$ = signal<HTMLDivElement>();
    const el$ = signal<HTMLDivElement>();

    const tabBarRef = signal<TdTabBar>();

    const scrollable = signal<undefined | Scrollable>(undefined);
    const navOffset = signal(0);
    const isFocus = signal(false);
    const focusable = signal(true);

    const sizeName = computed(() =>
      ['top', 'bottom'].includes(rootTabs.props.tabPosition!)
        ? 'width'
        : 'height'
    );
    const navStyle = computed<IStyle>(() => {
      const dir = sizeName.get() === 'width' ? 'X' : 'Y';
      return {
        transform: `translate${dir}(-${navOffset.get()}px)`,
      };
    });

    const scrollPrev = () => {
      if (!navScroll$.get()) return;

      const containerSize =
        navScroll$.get()?.[
          `offset${capitalize(sizeName.get()!) as 'Width' | 'Height'}`
        ];
      const currentOffset = navOffset.get();

      if (!currentOffset) return;

      const newOffset =
        currentOffset > containerSize! ? currentOffset - containerSize! : 0;

      navOffset.set(newOffset);
    };

    const scrollNext = () => {
      if (!navScroll$.get() || !nav$.get()) return;

      const navSize =
        nav$.get()?.[
          `offset${capitalize(sizeName.get()) as 'Width' | 'Height'}`
        ];
      const containerSize =
        navScroll$.get()?.[
          `offset${capitalize(sizeName.get()) as 'Width' | 'Height'}`
        ];
      const currentOffset = navOffset.get();

      if (navSize! - currentOffset <= containerSize!) return;

      const newOffset =
        navSize! - currentOffset > containerSize! * 2
          ? currentOffset + containerSize!
          : navSize! - containerSize!;

      navOffset.set(newOffset);
    };

    const scrollToActiveTab = async () => {
      const nav = nav$.get();
      if (!scrollable.get() || !el$.get() || !navScroll$.get() || !nav) return;

      await nextTick();

      const activeTab = el$.get()?.querySelector('.is-active');
      if (!activeTab) return;

      const navScroll = navScroll$.get();
      const isHorizontal = ['top', 'bottom'].includes(
        rootTabs.props.tabPosition!
      );
      const activeTabBounding = activeTab.getBoundingClientRect();
      const navScrollBounding = navScroll?.getBoundingClientRect();
      const maxOffset = isHorizontal
        ? nav.offsetWidth - navScrollBounding!.width
        : nav.offsetHeight - navScrollBounding!.height;
      const currentOffset = navOffset.get();
      let newOffset = currentOffset;

      if (isHorizontal) {
        if (activeTabBounding.left < navScrollBounding!.left) {
          newOffset =
            currentOffset - (navScrollBounding!.left - activeTabBounding.left);
        }
        if (activeTabBounding.right > navScrollBounding!.right) {
          newOffset =
            currentOffset + activeTabBounding.right - navScrollBounding!.right;
        }
      } else {
        if (activeTabBounding.top < navScrollBounding!.top) {
          newOffset =
            currentOffset - (navScrollBounding!.top - activeTabBounding.top);
        }
        if (activeTabBounding.bottom > navScrollBounding!.bottom) {
          newOffset =
            currentOffset +
            (activeTabBounding.bottom - navScrollBounding!.bottom);
        }
      }
      newOffset = Math.max(newOffset, 0);
      navOffset.set(Math.min(newOffset, maxOffset));
    };

    const update = () => {
      if (!nav$.get() || !navScroll$.get()) return;

      if (props.stretch) tabBarRef.get()?.update?.();

      const navSize =
        nav$.get()?.[
          `offset${capitalize(sizeName.get()) as 'Width' | 'Height'}`
        ];
      const containerSize =
        navScroll$.get()?.[
          `offset${capitalize(sizeName.get()) as 'Width' | 'Height'}`
        ];
      const currentOffset = navOffset.get();

      if (containerSize! < navSize!) {
        scrollable.set(scrollable.get() || {});
        scrollable.get()!.prev = currentOffset;
        scrollable.get()!.next = currentOffset + containerSize! < navSize!;
        if (navSize! - currentOffset < containerSize!) {
          navOffset.set(navSize! - containerSize!);
        }
      } else {
        scrollable.set(undefined);
        if (currentOffset > 0) {
          navOffset.set(0);
        }
      }
    };

    const changeTab = (event?: KeyboardEvent) => {
      let step = 0;

      switch (event?.code) {
        case EVENT_CODE.left:
        case EVENT_CODE.up:
          step = -1;
          break;
        case EVENT_CODE.right:
        case EVENT_CODE.down:
          step = 1;
          break;
        default:
          return;
      }

      const tabList = Array.from(
        (
          event.currentTarget as HTMLDivElement
        ).querySelectorAll<HTMLDivElement>('[role=tab]:not(.is-disabled)')
      );
      const currentIndex = tabList.indexOf(event.target as HTMLDivElement);
      let nextIndex = currentIndex + step;

      if (nextIndex < 0) {
        nextIndex = tabList.length - 1;
      } else if (nextIndex >= tabList.length) {
        nextIndex = 0;
      }

      tabList[nextIndex].focus({ preventScroll: true }); // 改变焦点元素
      tabList[nextIndex].click(); // 选中下一个tab
      setFocus();
    };

    const setFocus = () => {
      if (focusable.get()) isFocus.set(true);
    };
    const removeFocus = () => isFocus.set(false);

    watch(() => visibility.get(), (visibility) => {
      if (visibility === 'hidden') {
        focusable.set(false);
      } else if (visibility === 'visible') {
        setTimeout(() => focusable.set(true), 50);
      }
    });
    watch(() => focused.get(), (focused) => {
      if (focused) {
        setTimeout(() => focusable.set(true), 50);
      } else {
        focusable.set(false);
      }
    });

    useResizeObserver(el$, update);

    onMounted(() => setTimeout(() => scrollToActiveTab(), 0));
    onUpdated(() => update());

    defineExpose({
      scrollToActiveTab,
      removeFocus,
    });

    const scrollBtn = scrollable.get()
      ? [
          new Span({
            name: 'nav-prev',
            class: [
              ns.e('nav-prev'),
              ns.is('disabled', !scrollable.get()?.prev),
            ],
            events: {
              click: () => {
                scrollPrev();
              },
            },
            slot: [
              new TdIcon({
                slot: new ElArrowLeftSvg(),
              }),
            ],
          }),
          new Span({
            name: 'nav-preview',
            class: [
              ns.e('nav-preview'),
              ns.is('disabled', !scrollable.get()?.next),
            ],
            events: {
              click: () => {
                scrollNext();
              },
            },
            slot: [
              new TdIcon({
                slot: new ElArrowRightSvg(),
              }),
            ],
          }),
        ]
      : undefined;

    const tabs = props.panes?.map((pane, index) => {
      const uid = pane.uid;
      const disabled = pane.props.disabled;
      const tabName = pane.props.name ?? pane.index ?? `${index}`;
      const closable = !disabled && (pane.isClosable || props.editable);
      pane.index = `${index}`;

      const btnClose = closable
        ? new TdIcon({
            class: 'is-icon-close',
            events: {
              // `onClick` not exist when generate dts
              click: (ev?: MouseEvent) => emit('tabRemove', pane, ev),
            },
            slot: new ElCloseSvg(),
          })
        : undefined;

      const tabLabelContent = pane.slots?.label || pane.props.label;
      const tabindex = !disabled && pane.active ? 0 : -1;
      return new Div({
        refId: `tab-${uid}`,
        class: [
          ns.e('item'),
          ns.is(rootTabs.props.tabPosition!),
          ns.is('active', pane.active.get()),
          ns.is('disabled', unref(disabled)),
          ns.is('closable', unref(closable)),
          ns.is('focus', isFocus.get()),
        ],
        attrObj: {
          id: `tab-${tabName}`,
          key: `tab-${uid}`,
          ariaControls: `pane-${tabName}`,
          role: 'tab',
          ariaSelected: pane.active.get(),
          tabindex: tabindex,
        },
        events: {
          focus: () => setFocus(),
          blur: () => removeFocus(),
          click: (ev?: MouseEvent) => {
            removeFocus();
            emit('tabClick', pane, tabName, ev);
          },
          keydown: (ev?: KeyboardEvent) => {
            if (
              closable &&
              (ev?.code === EVENT_CODE.delete ||
                ev?.code === EVENT_CODE.backspace)
            ) {
              emit('tabRemove', pane, ev);
            }
          },
        },
        slot: [...arraySlot(tabLabelContent), btnClose!],
      });
    });

    this.addChild(
      new Div({
        refDom: el$,
        class: [
          ns.e('nav-wrap'),
          ns.is('scrollable', !!scrollable.get()),
          ns.is(rootTabs.props.tabPosition!),
        ],
        slot: [
          ...scrollBtn!,
          new Div({
            class: ns.e('nav-scroll'),
            refDom: navScroll$,
            slot: [
              new Div({
                refDom: nav$,
                class: [
                  ns.e('nav'),
                  ns.is(rootTabs.props.tabPosition!),
                  ns.is(
                    'stretch',
                    props.stretch &&
                      ['top', 'bottom'].includes(rootTabs.props.tabPosition!)
                  ),
                ],
                attrObj: {
                  role: 'tablist',
                },
                styleObj: navStyle,
                events: {
                  keydown: changeTab,
                },
                init: (ele) => {
                  if (!props.type) {
                    ele.addChild(
                      new TdTabBar({
                        refEl: tabBarRef,
                        tabs: [...props.panes!],
                      })
                    );
                  }
                  ele.slotChildren(tabs);
                },
              }),
            ],
          }),
        ],
      })
    );
  }
}
