import {
  defineExpose,
  Div,
  getCurrentInstance,
  nextTick,
  provide,
  TypeDiv,
  useSlots,
} from '@type-dom/framework';
import { computed, Signal, signal, watch } from '@type-dom/signals';
import { ElPlusSvg } from '@type-dom/svgs';
import { isUndefined } from '@type-dom/utils';
// import { $colorPrimary, $colors, $textColor } from '../../../styles';
import { useNamespace } from '../../../hooks/use-namespace';
import { useOrderedChildren } from '../../../hooks/use-ordered-children';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { EVENT_CODE } from '../../../constants';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
// import { TabPaneProps } from '../td-tab-pane/td-tab-pane.interface';
import { tabsEmits, tabsProps } from './td-tabs.const';
import { TabPaneName, ITdTabs, TabsProps } from './td-tabs.interface';
import { TdTabNav } from './td-tab-nav.class';
import { TabsPaneContext, tabsRootContextKey } from './constants';

export class TdTabs extends TypeDiv implements ITdTabs {
  className: 'TdTabs';
  override props: TabsProps;
  currentName?: Signal<TabPaneName>;

  constructor(params: TabsProps = {}) {
    super();
    this.className = 'TdTabs';
    this.attr.addObj({
      name: 'td-tabs',
    });

    this.addEmits(tabsEmits);
    this.assignProps(tabsProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;
    const ns = useNamespace('tabs');

    const isVertical = computed(() =>
      ['left', 'right'].includes(props.tabPosition!)
    );

    const {
      children: panes,
      addChild: sortPane,
      removeChild: unregisterPane,
    } = useOrderedChildren<TabsPaneContext>(getCurrentInstance()!, 'TdTabPane');

    const nav$ = signal<TdTabNav>();
    const currentName = signal<TabPaneName>(props.modelValue ?? '0');

    const setCurrentName = async (value?: TabPaneName, trigger = false) => {
      // should do nothing.
      if (currentName.get() === value || isUndefined(value)) return;

      try {
        const canLeave = await props.beforeLeave?.(value, currentName.get());
        if (canLeave !== false) {
          currentName.set(value);
          if (trigger) {
            emit(UPDATE_MODEL_EVENT, value);
            emit('tabChange', value);
          }

          nav$.get()?.removeFocus?.();
        }
      } catch {
      //   nothing
      }
    };

    const handleTabClick = (
      tab: TabsPaneContext,
      tabName: TabPaneName,
      event: Event
    ) => {
      if (tab.props.disabled) return;
      setCurrentName(tabName, true);
      emit('tabClick', tab, event);
    };

    const handleTabRemove = (pane: TabsPaneContext, ev: Event) => {
      if (pane.props.disabled || isUndefined(pane.props.name)) return;
      ev.stopPropagation();
      emit('edit', pane.props.name, 'remove');
      emit('tabRemove', pane.props.name);
    };

    const handleTabAdd = () => {
      emit('edit', undefined, 'add');
      emit('tabAdd');
    };

    watch(
      () => props.vModel?.get(),
      (modelValue) => setCurrentName(modelValue as TabPaneName)
    );

    watch(() => currentName.get(), async () => {
      await nextTick();
      nav$.get()?.scrollToActiveTab?.();
    });

    provide(tabsRootContextKey, {
      props,
      currentName,
      registerPane: (pane: TabsPaneContext) => {
        panes.get().push(pane);
      },
      sortPane,
      unregisterPane,
    });

    defineExpose({
      currentName,
    });
    // const TabNavRenderer: { render: () => TypeNode } = ({ render}) => {
    //   return render()
    // }
    const slots = useSlots();
    const addSlot = slots?.addIcon;
    const newButton =
      props.editable || props.addable
        ? new Div({
            class: [
              ns.e('new-tab'),
              isVertical.get() && ns.e('new-tab-vertical'),
            ],
            attrObj: {
              tabindex: '0',
            },
            events: {
              click: handleTabAdd,
              keydown: (ev?: KeyboardEvent) => {
                if ( ev &&
                  [EVENT_CODE.enter, EVENT_CODE.numpadEnter].includes(ev.code)
                )
                  handleTabAdd();
              },
            },
            slot: addSlot
              ? slots.addIcon
              : new TdIcon({
                  slot: new ElPlusSvg(),
                }),
          })
        : undefined;

    const header = new Div({
      class: [
        ns.e('header'),
        isVertical.get() && ns.e('header-vertical'),
        ns.is(props.tabPosition!),
      ],
      slot: [
        new TdTabNav({
          refEl: nav$,
          panes: panes.get(),
          attrObj: {
            currentName: currentName.get(),
            editable: props.editable,
            type: props.type,
            stretch: props.stretch,
          },
          emits: {
            tabClick: handleTabClick,
            tabRemove: handleTabRemove,
          },
          slot: [],
        }),
        newButton!,
      ],
    });
    const panels = new Div({
      class: ns.e('content'),
      slot: props.slot || slots?.default,
    });

    this.addChild(
      new Div({
        class: [
          ns.b(),
          ns.m(props.tabPosition),
          {
            [ns.m('card')]: props.type === 'card',
            [ns.m('border-card')]: props.type === 'border-card',
          },
        ],
        slot: [panels, header],
      })
    );
  }
}
