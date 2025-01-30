// import { computed, onBeforeMount } from 'vue'
// import { isClient } from '@element-plus/utils'
import { computed } from '@type-dom/signals';
import { onBeforeMount } from '@type-dom/framework';
import { isClient } from '@type-dom/utils';
import { useGetDerivedNamespace } from '../use-namespace';
import { useIdInjection } from '../use-id';

export const usePopperContainerId = () => {
  console.log('usePopperContainerId');
  const namespace = useGetDerivedNamespace();
  const idInjection = useIdInjection();

  const id = computed(() => {
    return `${namespace.get()}-popper-container-${idInjection.prefix}`;
  });
  const selector = computed(() => `#${id.get()}`);

  return {
    id,
    selector,
  };
};

const createContainer = (id: string) => {
  const container = document.createElement('div');
  container.id = id;
  document.body.appendChild(container);
  return container;
};

export const usePopperContainer = () => {
  console.log('usePopperContainer');
  const { id, selector } = usePopperContainerId();
  onBeforeMount(() => {
    if (!isClient) return;

    // This is for bypassing the error that when under testing env, we often encounter
    // document.body.innerHTML = '' situation
    // for this we need to disable the caching since it's not really needed
    if (
      process.env.NODE_ENV === 'test' ||
      !document.body.querySelector(selector.get())
    ) {
      createContainer(id.get());
    }
  });

  return {
    id,
    selector,
  };
};
