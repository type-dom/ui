// import { computed, onBeforeUnmount, ref, shallowRef, unref, watch } from 'vue'
// import { createPopper } from '@popperjs/core'
// import { fromPairs } from 'lodash-unified'
//
// import type { Ref } from 'vue'
// import type {
//   Instance,
//   Modifier,
//   Options,
//   State,
//   VirtualElement,
// } from '@popperjs/core'

import { computed, signal, unref, watch, Ref, Computed } from '@type-dom/signals';
import {
  VirtualElement,
  ComputePositionConfig as Options,
  FloatingElement,
  Middleware,
  State, Instance, PopperOptions,
  createPopper
} from '@type-dom/popper';
import { nextFrame, onBeforeUnmount } from '@type-dom/framework';

type ElementType = HTMLElement | undefined
type ReferenceElement = ElementType | VirtualElement
export type PartialOptions = Partial<PopperOptions & { arrowMiddleware?: Middleware }>

export const usePopper = (
  referenceElementRef: Ref<ReferenceElement>,
  popperElementRef: Ref<FloatingElement>,
  opts: Computed<PartialOptions> | PartialOptions = {} as PartialOptions
) => {
  // const stateUpdater = {
  //   name: 'updateState',
  //   // enabled: true,
  //   // phase: 'write',
  //   fn: (state ) => {
  //     // const derivedState = deriveState(state)
  //
  //     // Object.assign(states.get(), derivedState)
  //   },
  //   // requires: ['computeStyles'],
  // } as Middleware

  const options = computed<Options>(() => {
    const {
      onFirstUpdate,
      placement,
      strategy,
      // arrowMiddleware,
      // modifiers
      middleware
    } = unref(opts);

    return {
      onFirstUpdate,
      placement: placement || 'bottom',
      strategy: strategy || 'absolute',
      middleware: middleware
      // modifiers: [
      //   ...(modifiers || []),
      //   stateUpdater,
      //   { name: 'applyStyles', enabled: false },
      // ],
    };
  });

  const instanceRef = signal<Instance | undefined>();
  const states = signal<Pick<State, 'styles' | 'attributes'>>({
    styles: {
      popper: {
        position: options.get().strategy,
        left: '0',
        top: '0'
      },
      arrow: {
        position: 'absolute'
      }
    },
    attributes: {}
  });

  const destroy = () => {
    if (!instanceRef.get()) return;

    instanceRef.get()?.destroy();
    instanceRef.set(undefined);
  };

  watch(
    () => options.get(),
    (newOptions) => {
      // console.warn('watch options newOption is ', newOptions);
      const instance = unref(instanceRef);
      if (instance) {
        // console.warn('watch options instance ', instance);
        instance.setOptions(newOptions);
      }
    }
  );

  watch(
    () => [referenceElementRef.get(), popperElementRef.get()],
    ([referenceElement, popperElement]) => {
      // console.error('watch referenceElement and popperElement referenceElementRef.get() and popperElementRef.get() is ', referenceElementRef.get(), popperElementRef.get());
      destroy();
      //  popperElement 会先创建，只是没有挂载。所以还要看是否挂载了。
      if (!referenceElement || !popperElement) return;
      // console.warn('watch referenceElement and popperElement ', referenceElement, popperElement);

      // console.warn('watch referenceElement and popperElement options is ', options);
      nextFrame(async () => {
        instanceRef.set(await createPopper(
          referenceElement,
          popperElement,
          unref(options) as PopperOptions
        ));
      });
    }
  );

  onBeforeUnmount(() => {
    destroy();
  });

  return {
    state: computed(() => ({ ...(unref(instanceRef)?.state || {}) })),
    styles: computed(() => states.get().styles),
    attributes: computed(() => states.get().attributes),
    update: () => unref(instanceRef)?.update(),
    forceUpdate: () => unref(instanceRef)?.forceUpdate(),
    // Preventing end users from modifying the instance.
    instanceRef: computed(() => unref(instanceRef))
  };
};

// interface UpdateParams {
//   arrowRef: Ref<HTMLElement | undefined>,
//   arrowOffset: Ref<number | undefined>,
//   contentRef: Ref<HTMLElement | undefined>,
// }

// 好像在新版中没有什么用
// function deriveState(state: MiddlewareState) {
//   const elements = Object.keys(state.elements) as unknown as Array<
//     keyof State['elements']
//   >;
//
//   // const styles = fromPairs(
//   //   elements.map(
//   //     (element) =>
//   //       [element, state.styles[element] || {}] as [
//   //         string,
//   //         State['styles'][keyof State['styles']]
//   //       ]
//   //   )
//   // )
//
//   // const attributes = fromPairs(
//   //   elements.map(
//   //     (element) =>
//   //       [element, state.attributes[element]] as [
//   //         string,
//   //         State['attributes'][keyof State['attributes']]
//   //       ]
//   //   )
//   // )
//
//   // return {
//   //   styles,
//   //   attributes,
//   // }
// }

// export type UsePopperReturn = ReturnType<typeof usePopper>
