// import { computed, inject, ref, unref } from 'vue'
// import { useIdInjection, useNamespace } from '@element-plus/hooks'
import { inject } from '@type-dom/framework';
import { computed, signal, unref } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { useIdInjection } from '../../../hooks/use-id';
import { CollapseItemProps } from '../td-collapse-item/td-collapse-item.interface';
import { collapseContextKey } from './constants';
import { CollapseActiveName } from './td-collapse.interface';

// import type { CollapseItemProps } from './collapse-item'

export const useCollapseItem = (props: CollapseItemProps) => {
  const collapse = inject(collapseContextKey);
  const { namespace } = useNamespace('collapse');

  const focusing = signal(false);
  const isClick = signal(false);
  const idInjection = useIdInjection();
  const id = computed(() => idInjection.current++);
  const name = computed(() => {
    return (props.name ??
      `${namespace.get()}-id-${idInjection.prefix}-${unref(
        id
      )}`) as CollapseActiveName;
  });
  // console.warn('name is ', name);
  const isActive = computed(() =>
    collapse?.activeNames.get().includes(unref(name)!)
  );
  // console.error('isActive is ', isActive);
  const handleFocus = () => {
    setTimeout(() => {
      if (!isClick.get()) {
        focusing.set(true);
      } else {
        isClick.set(false);
      }
    }, 50);
  };

  const handleHeaderClick = () => {
    if (props.disabled) return;
    collapse?.handleItemClick(unref(name)!);
    focusing.set(false);
    isClick.set(true);
  };

  const handleEnterClick = () => {
    collapse?.handleItemClick(unref(name)!);
  };

  return {
    focusing,
    id,
    isActive,
    handleFocus,
    handleHeaderClick,
    handleEnterClick,
  };
};

export const useCollapseItemDOM = (
  props: CollapseItemProps,
  { focusing, isActive, id }: Partial<ReturnType<typeof useCollapseItem>>
) => {
  const ns = useNamespace('collapse');

  const rootKls = computed(() => [
    ns.b('item'),
    ns.is('active', unref(isActive)),
    ns.is('disabled', props.disabled),
  ]);
  const headKls = computed(() => [
    ns.be('item', 'header'),
    ns.is('active', unref(isActive)),
    { focusing: unref(focusing) && !props.disabled },
  ]);
  const arrowKls = computed(() => [
    ns.be('item', 'arrow'),
    ns.is('active', unref(isActive)),
  ]);
  const itemTitleKls = computed(() => [ns.be('item', 'title')])
  const itemWrapperKls = computed(() => ns.be('item', 'wrap'));
  const itemContentKls = computed(() => ns.be('item', 'content'));
  const scopedContentId = computed(() => ns.b(`content-${unref(id)}`));
  const scopedHeadId = computed(() => ns.b(`head-${unref(id)}`));

  return {
    itemTitleKls,
    arrowKls,
    headKls,
    rootKls,
    itemWrapperKls,
    itemContentKls,
    scopedContentId,
    scopedHeadId,
  };
};
