// import { onBeforeUnmount, onMounted, watchEffect } from 'vue'
// import { addUnit } from '@element-plus/utils'
// import type { ComputedRef, Ref } from 'vue'

import { Computed, effect, MaybeRef, Ref, unref } from '@type-dom/signals';
import { addUnit } from '@type-dom/utils';
import { onBeforeUnmount, onMounted } from '@type-dom/framework';

export const useDraggable = (
  targetRef: Ref<HTMLElement | undefined>,
  dragRef: Ref<HTMLElement | undefined>,
  draggable: Computed<boolean | undefined>,
  overflow?: Computed<boolean | undefined>
) => {
  let transform = {
    offsetX: 0,
    offsetY: 0,
  };

  const onMousedown = (e: MouseEvent) => {
    const downX = e.clientX;
    const downY = e.clientY;
    const { offsetX, offsetY } = transform;

    const targetRect = unref(targetRef)!.getBoundingClientRect();
    const targetLeft = targetRect.left;
    const targetTop = targetRect.top;
    const targetWidth = targetRect.width;
    const targetHeight = targetRect.height;

    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;

    const minLeft = -targetLeft + offsetX;
    const minTop = -targetTop + offsetY;
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
    const maxTop = clientHeight - targetTop - targetHeight + offsetY;

    const onMousemove = (e: MouseEvent) => {
      let moveX = offsetX + e.clientX - downX;
      let moveY = offsetY + e.clientY - downY;

      if (!unref(overflow)) {
        moveX = Math.min(Math.max(moveX, minLeft), maxLeft);
        moveY = Math.min(Math.max(moveY, minTop), maxTop);
      }

      transform = {
        offsetX: moveX,
        offsetY: moveY,
      };

      if (unref(targetRef)) {
        unref(targetRef)!.style.transform = `translate(${addUnit(
          moveX
        )}, ${addUnit(moveY)})`;
      }
    };

    const onMouseup = () => {
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('mouseup', onMouseup);
    };

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('mouseup', onMouseup);
  };

  const onDraggable = () => {
    if (unref(dragRef) && unref(targetRef)) {
      unref(dragRef)?.addEventListener('mousedown', onMousedown);
    }
  };

  const offDraggable = () => {
    if (unref(dragRef) && unref(targetRef)) {
      unref(dragRef)?.removeEventListener('mousedown', onMousedown);
    }
  };

  const resetPosition = () => {
    transform = {
      offsetX: 0,
      offsetY: 0,
    };
    if (unref(targetRef)) {
      unref(targetRef)!.style.transform = 'none';
    }
  };

  onMounted(() => {
    effect(() => {
      if (unref(draggable)) {
        onDraggable();
      } else {
        offDraggable();
      }
    });
  });

  onBeforeUnmount(() => {
    offDraggable();
  });

  return {
    resetPosition,
  };
};
