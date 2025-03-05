// import { computed, provide, ref, watch } from 'vue'
// import { ensureArray } from '@element-plus/utils'
// import { useNamespace } from '@element-plus/hooks'
// import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
// import { collapseContextKey } from './constants'
//
// import type { SetupContext } from 'vue'
// import type {
//   CollapseActiveName,
//   CollapseEmits,
//   CollapseProps,
// } from './collapse'

import { AnyFn, ensureArray } from '@type-dom/utils';
import { computed, signal, watch } from '@type-dom/signals';
import { provide } from '@type-dom/framework';
import { useNamespace } from '../../../hooks/use-namespace';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event';
import { collapseContextKey } from './constants';
import { CollapseActiveName, CollapseProps } from './td-collapse.interface';

export const useCollapse = (props: CollapseProps, emit: AnyFn) => {
  const activeNames = signal(ensureArray(props.vModel?.get()));

  const setActiveNames = (_activeNames: CollapseActiveName[]) => {
    activeNames.set(_activeNames);
    const value = props.accordion ? activeNames.get()[0] : activeNames.get();
    emit(UPDATE_MODEL_EVENT, value);
    emit(CHANGE_EVENT, value);
  };

  const handleItemClick = (name: CollapseActiveName) => {
    if (props.accordion) {
      setActiveNames([activeNames.get()[0] === name ? '' : name]);
    } else {
      const _activeNames: CollapseActiveName[] = [...activeNames.get()];
      const index = _activeNames.indexOf(name);

      if (index > -1) {
        _activeNames.splice(index, 1);
      } else {
        _activeNames.push(name);
      }
      setActiveNames(_activeNames);
    }
  };

  watch(
    () => props.vModel?.get(), // props.vModel 是数组，
    () => activeNames.set(ensureArray(props.vModel?.get()))
    // { deep: true }
  );

  provide(collapseContextKey, {
    activeNames,
    handleItemClick,
  });
  return {
    activeNames,
    setActiveNames,
  };
};

export const useCollapseDOM = () => {
  const ns = useNamespace('collapse');

  const rootKls = computed(() => ns.b());
  return {
    rootKls,
  };
};
