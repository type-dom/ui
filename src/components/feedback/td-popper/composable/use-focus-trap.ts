import { PopperContentProps } from '../content/content.interface';
import { signal } from '@type-dom/signals';

export const usePopperContentFocusTrap = (
  props: PopperContentProps,
  emit: (evt: string) => void
) => {
  const trapped = signal(false);
  const focusStartRef = signal<'container' | 'first' | HTMLElement>();

  const onFocusAfterTrapped = () => {
    emit('focus');
  };

  const onFocusAfterReleased = (event?: CustomEvent) => {
    if (event?.detail?.focusReason !== 'pointer') {
      focusStartRef.set('first');
      emit('blur');
    }
  };

  const onFocusInTrap = (event?: FocusEvent) => {
    if (props.visible && !trapped.get()) {
      if (event?.target) {
        focusStartRef.set(event.target as HTMLElement);
      }
      trapped.set(true);
    }
  };

  const onFocusoutPrevented = (event?: CustomEvent) => {
    if (!props.trapping) {
      if (event?.detail.focusReason === 'pointer') {
        event.preventDefault();
      }
      trapped.set(false);
    }
  };

  const onReleaseRequested = () => {
    trapped.set(false);
    emit('close');
  };

  return {
    focusStartRef,
    trapped,

    onFocusAfterReleased,
    onFocusAfterTrapped,
    onFocusInTrap,
    onFocusoutPrevented,
    onReleaseRequested,
  };
};

export type UsePopperContentFocusTrapReturn = ReturnType<
  typeof usePopperContentFocusTrap
>;
