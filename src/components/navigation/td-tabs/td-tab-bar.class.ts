import { IStyle } from '@type-dom/css-type';
import { capitalize, throwError } from '@type-dom/utils';
import {
  defineExpose,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  TypeDiv,
  useResizeObserver,
} from '@type-dom/framework';
import { ITdTabBar, TabBarProps } from './td-tab-bar.interface';

import { TdTabs } from './td-tabs.class';
import { Signal, signal, watch } from '@type-dom/signals';
import { tabsRootContextKey } from './constants';
import { useNamespace } from '../../../hooks/use-namespace';

export class TdTabBar extends TypeDiv implements ITdTabBar {
  className: 'TdTabBar';
  override props: TabBarProps;
  ref?: Signal<HTMLElement | undefined>;
  updateTabBar?: () => void;

  constructor(params: TabBarProps) {
    super();
    this.className = 'TdTabBar';
    this.attr.addName('td-tab-bar');

    this.props = this.useParams(params);
  }

  override setup() {
    const COMPONENT_NAME = 'ElTabBar';

    const props = this.props;

    const instance = getCurrentInstance()!; // todo 不就是 this 吗？？？？？
    const rootTabs = inject(tabsRootContextKey);
    if (!rootTabs)
      throwError(COMPONENT_NAME, '<td-tabs><td-tab-bar /></td-tabs>');

    const ns = useNamespace('tabs');

    const barRef = signal<HTMLDivElement>();
    const barStyle = signal<IStyle>();

    const getBarStyle = (): IStyle => {
      let offset = 0;
      let tabSize = 0;

      const sizeName = ['top', 'bottom'].includes(rootTabs.props.tabPosition!)
        ? 'width'
        : 'height';
      const sizeDir = sizeName === 'width' ? 'x' : 'y';
      const position = sizeDir === 'x' ? 'left' : 'top';

      props.tabs?.every((tab) => {
        // const $el = instance.parent?.refs?.[`tab-${tab.uid}`] as HTMLElement
        const $el = instance.parent?.down('name', `tab-${tab.uid}`)
          ?.dom as HTMLElement;
        if (!$el) return false;

        if (!tab.active.get()) {
          return true;
        }

        offset = $el![`offset${capitalize(position) as 'Left' | 'Top'}`];
        tabSize = $el![`client${capitalize(sizeName) as 'Width' | 'Height'}`];

        const tabStyles = window.getComputedStyle($el);

        if (sizeName === 'width') {
          tabSize -=
            Number.parseFloat(tabStyles.paddingLeft) +
            Number.parseFloat(tabStyles.paddingRight);
          offset += Number.parseFloat(tabStyles.paddingLeft);
        }
        return false;
      });

      return {
        [sizeName]: `${tabSize}px`,
        transform: `translate${capitalize(sizeDir)}(${offset}px)`,
      };
    };

    const updateTabBar = () => barStyle.set(getBarStyle());

    const saveObserver = [] as ReturnType<typeof useResizeObserver>[];
    const observerTabs = () => {
      saveObserver.forEach((observer) => observer.stop());
      saveObserver.length = 0;
      // todo 要实现的是什么 ？？？
      // const list = instance.parent?.refs as Record<string, HTMLElement>;
      const list = instance.parent?.childNodes;
      if (!list) return;
      for (const key in list) {
        if (key.startsWith('tab-')) {
          const _el = list[key];
          if (_el) {
            saveObserver.push(useResizeObserver(_el, updateTabBar));
          }
        }
      }
    };

    watch(
      () => props.tabs,
      async () => {
        await nextTick();
        updateTabBar();

        observerTabs();
      },
      { immediate: true }
    );
    const barObserever = useResizeObserver(barRef, () => updateTabBar());

    onBeforeUnmount(() => {
      saveObserver.forEach((observer) => observer.stop());
      saveObserver.length = 0;
      barObserever.stop();
    });

    defineExpose({
      /** @description tab root html element */
      ref: barRef,
      /** @description method to manually update tab bar style */
      updateTabBar,
    });

    this.assignProps({
      refDom: barRef,
    });
    this.attr.addClass([
      ns.e('active-bar'),
      ns.is(rootTabs!.props.tabPosition!),
    ]);
    this.style.addObj(barStyle);
  }
}
