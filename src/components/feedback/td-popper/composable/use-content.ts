// import { computed, inject, onMounted, ref, unref, watch } from 'vue'
// import { isUndefined } from 'lodash-unified'
// import { usePopper } from '@element-plus/hooks'
// import { buildPopperOptions, unwrapMeasurableEl } from '../utils'
// import type { Modifier } from '@popperjs/core'
// import type { PartialOptions } from '@element-plus/hooks'

import {
  Computed,
  computed,
  Ref,
  signal,
  unref,
  watch,
} from '@type-dom/signals';
import {
  arrow,
  flip,
  FloatingElement,
  Middleware,
  ReferenceElement,
} from '@type-dom/popper';
import { isUndefined } from '@type-dom/utils';
import { onMounted, inject } from '@type-dom/framework';
import { PartialOptions, usePopper } from '../../../../hooks/use-popper';
import { buildPopperOptions, unwrapMeasurableEl } from '../utils';
import { PopperContentProps } from '../content/content.interface';
import { POPPER_INJECTION_KEY } from '../constants';
import { Measurable } from '../td-popper.interface';

const DEFAULT_ARROW_OFFSET = 0;

export const usePopperContent = (props: PopperContentProps) => {
  const { popperInstanceRef, contentRef, triggerRef, role } = inject(
    POPPER_INJECTION_KEY,
    undefined
  )!;

  const arrowRef = signal<HTMLElement>();
  const arrowOffset = signal<number>(5);

  // const eventListenerModifier = computed(() => {
  //   return {
  //     name: 'eventListeners',
  //     enabled: !!props.visible,
  //   } // as Modifier<'eventListeners', any>
  // })
  // middleWare
  const arrowMiddleware = computed(() => {
    console.log('arrowMiddleware', arrowRef, arrowOffset);
    const arrowEl = unref(arrowRef);
    const offset = unref(arrowOffset) ?? DEFAULT_ARROW_OFFSET;
    // Seems like the `phase` and `fn` is required by Modifier type
    // But on its documentation they didn't specify that.
    // Refer to https://popper.js.org/docs/v2/modifiers/arrow/
    // return {
    //   name: 'arrow',
    //   enabled: !isUndefined(arrowEl),
    //   options: {
    //     element: arrowEl,
    //     padding: offset,
    //   },
    // }
    if (!isUndefined(arrowEl)) {
      return arrow({ element: arrowEl, padding: offset });
    } else {
      return undefined;
    }
  });
  // 这个 options 对应的是 中间件 Middleware, 不包含其它的选项。
  const options = computed<PartialOptions>(() => {
    console.warn('useContent options computed . ');
    return {
      // onFirstUpdate: () => {
      //   update()
      // },
      ...buildPopperOptions(props, [
        unref(arrowMiddleware),
        // unref(eventListenerModifier),
      ]),
      // arrowMiddleware: arrowMiddleware.get(),
      // arrowEl,
      // ...props,
      // middleware,
    };
  });

  const computedReference: Computed = computed(
    () => (unwrapMeasurableEl(props.referenceEl) || unref(triggerRef))!
  );

  const { attributes, state, styles, instanceRef, update, forceUpdate } =
    usePopper(computedReference, contentRef as Ref<FloatingElement>, options);

  watch(instanceRef, (instance) => popperInstanceRef.set(instance));

  onMounted(() => {
    watch(
      () =>
        (
          unref(computedReference) as unknown as Measurable
        )?.getBoundingClientRect(),
      () => {
        update();
      }
    );
  });

  return {
    attributes,
    arrowRef,
    contentRef,
    instanceRef,
    state,
    styles,
    role,

    forceUpdate,
    update,
  };
};

export type UsePopperContentReturn = ReturnType<typeof usePopperContent>;
