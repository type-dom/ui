// import { onMounted, ref, shallowRef } from 'vue'
// import { useEventListener, useThrottleFn } from '@vueuse/core'
// import { throwError } from '@element-plus/utils'
// import type { SetupContext } from 'vue'
// import type { BacktopEmits, BacktopProps } from './backtop'

import { BacktopEmits } from './td-backtop.const';
import { BacktopProps } from './td-backtop.interface';
import { signal } from '@type-dom/signals';
import {
  onMounted,
  useEventListener,
  useThrottleFn,
} from '@type-dom/framework';
import { throwError } from '@type-dom/utils';

export const useBackTop = (
  props: BacktopProps,
  emit: any,
  componentName: string
) => {
  const el = signal<HTMLElement | undefined>();
  const container = signal<Document | HTMLElement>();
  const visible = signal(false);

  const handleScroll = () => {
    if (el.get()) visible.set(el.get()!.scrollTop >= props.visibilityHeight!);
  };

  const handleClick = (event?: MouseEvent) => {
    el.get()?.scrollTo({ top: 0, behavior: 'smooth' });
    emit('click', event);
  };

  const handleScrollThrottled = useThrottleFn(handleScroll, 300, true);

  useEventListener(container, 'scroll', handleScrollThrottled);
  onMounted(() => {
    container.set(document);
    el.set(document.documentElement);

    if (props.target) {
      el.set(document.querySelector<HTMLElement>(props.target) ?? undefined);
      if (!el.get()) {
        throwError(componentName, `target does not exist: ${props.target}`);
      }
      container.set(el.get());
    }
    // Give visible an initial value, fix #13066
    handleScroll();
  });

  return {
    visible,
    handleClick,
  };
};
