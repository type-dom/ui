// import { isRef, onMounted, ref, unref, watchEffect } from 'vue'
// import { unrefElement } from '@vueuse/core'
// import { isNil } from 'lodash-unified'
// import { arrow as arrowCore, computePosition } from '@floating-ui/dom'
// import { buildProps, isClient, keysOf } from '@element-plus/utils'
//
// import type { Ref, ToRefs } from 'vue'
import {
  computePosition,
  arrow as arrowCore,
  ComputePositionReturn,
  Middleware,
  Placement,
  SideObject,
  Strategy,
  VirtualElement,
  ReferenceElement,
} from '@type-dom/popper';
import { effect, isRef, Ref, signal, ToRefs, unref } from '@type-dom/signals';
import { onMounted, unrefElement } from '@type-dom/framework';
import { isClient, isNil, keysOf } from '@type-dom/utils';

export const useFloatingProps = {};

export type UseFloatingProps = ToRefs<{
  middleware: Array<Middleware>;
  placement: Placement;
  strategy: Strategy;
}>;

type ElementRef = Parameters<typeof unrefElement>['0'];

const unrefReference = (
  elRef: ElementRef | Ref<Element | VirtualElement>
) => {
  if (!isClient) return;
  if (!elRef) return elRef;
  const unrefEl = unrefElement(elRef as ElementRef);
  if (unrefEl) return unrefEl;
  return isRef(elRef as unknown) ? unrefEl : elRef;
};

export const getPositionDataWithUnit = <T extends Record<string, number>>(
  record: T | undefined,
  key: keyof T
) => {
  const value = record?.[key];
  return isNil(value) ? '' : `${value}px`;
};

export const useFloating = ({
  middleware,
  placement,
  strategy,
}: UseFloatingProps) => {
  const referenceRef = signal<HTMLElement | VirtualElement>();
  const contentRef = signal<HTMLElement>();
  const x = signal<number>();
  const y = signal<number>();
  const middlewareData = signal<ComputePositionReturn['middlewareData']>({});

  const states: any = {
    x,
    y,
    placement,
    strategy,
    middlewareData,
  } as const;

  const update = async () => {
    if (!isClient) return;

    const referenceEl = unrefReference(referenceRef);
    const contentEl = unrefElement(contentRef);
    if (!referenceEl || !contentEl) return;

    const data = await computePosition(
      referenceEl as ReferenceElement,
      contentEl,
      {
        placement: unref(placement),
        strategy: unref(strategy),
        middleware: unref(middleware),
      }
    );

    keysOf(states).forEach((key) => {
      states[key].set((data as any)[key]);
    });
  };

  onMounted(() => {
    effect(() => {
      // watchEffect
      update();
    });
  });

  return {
    ...states,
    update,
    referenceRef,
    contentRef,
  };
};

export type ArrowMiddlewareProps = {
  arrowRef: Ref<HTMLElement | null | undefined>;
  padding?: number | SideObject;
};

export const arrowMiddleware = ({
  arrowRef,
  padding,
}: ArrowMiddlewareProps): Middleware => {
  return {
    name: 'arrow',
    options: {
      element: arrowRef,
      padding,
    },

    fn(args) {
      const arrowEl = unref(arrowRef);
      if (!arrowEl) return {};

      return arrowCore({
        element: arrowEl,
        padding,
      }).fn(args);
    },
  };
};
