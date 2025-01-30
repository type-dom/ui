import {
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  useSlots,
  TypeDiv,
  TypeFragment,
  Div,
} from '@type-dom/framework';
import { throwError } from '@type-dom/utils';
import { computed, signal, watch } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { TabsPaneContext, tabsRootContextKey } from '../td-tabs/constants';
import { ITdTabPane, TabPaneProps } from './td-tab-pane.interface';

export class TdTabPane extends TypeFragment implements ITdTabPane {
  className: 'TdTabPane';
  override props: TabPaneProps;

  constructor(params: TabPaneProps = {}) {
    super();
    this.className = 'TdTabPane';

    this.props = this.useParams(params);
  }

  override setup() {
    const COMPONENT_NAME = 'TdTabPane';

    const props = this.props;

    const instance = getCurrentInstance()!;
    const slots = useSlots();

    const tabsRoot = inject(tabsRootContextKey);
    if (!tabsRoot)
      throwError(COMPONENT_NAME, 'usage: <el-tabs><el-tab-pane /></el-tabs/>');

    const ns = useNamespace('tab-pane');

    const index = signal<string | undefined>();
    const isClosable = computed(
      () => props.closable || tabsRoot.props.closable
    );
    const active = computed(
      () => tabsRoot.currentName.get() === (props.name ?? index.get())
    );
    const loaded = signal(active.get());
    const paneName = computed(() => props.name ?? index.get());
    const shouldBeRender = computed(
      () => !props.lazy || loaded.get() || active.get()
    );

    watch(active, (val) => {
      if (val) loaded.set(true);
    });

    const pane: TabsPaneContext = {
      uid: instance.uid,
      slots,
      props,
      paneName,
      active,
      index,
      isClosable,
    };

    tabsRoot.registerPane(pane);
    onMounted(() => {
      tabsRoot.sortPane(pane);
    });

    onUnmounted(() => {
      tabsRoot.unregisterPane(pane.uid);
    });

    this.addChild(
      new Div({
        vIf: shouldBeRender,
        vShow: active,
        class: ns.b(),
        attrObj: {
          id: `pane-${paneName.get()}`,
          role: 'tabpanel',
          ariaHidden: !active.get(),
          ariaLabelledby: `tab-${paneName.get()}`,
        },
        slot: props.slot ?? slots?.default,
      })
    );
  }
}
