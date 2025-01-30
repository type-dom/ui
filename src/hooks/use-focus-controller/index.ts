import { Computed, signal, Signal, watch } from '@type-dom/signals';
import {
  getCurrentInstance,
  onMounted,
  TypeElement,
  useEventListener,
} from '@type-dom/framework';
import { isElement, isFunction } from '@type-dom/utils';

interface UseFocusControllerOptions {
  /**
   * return true to cancel focus
   * @param event FocusEvent
   */
  beforeFocus?: (event?: FocusEvent) => boolean | undefined;
  afterFocus?: () => void;
  /**
   * return true to cancel blur
   * @param event FocusEvent
   */
  beforeBlur?: (event?: FocusEvent) => boolean | undefined;
  afterBlur?: () => void;
}

export function useFocusController<T extends { focus: () => void }>(
  target: Signal<T | undefined> | Computed<T | undefined>,
  {
    beforeFocus,
    afterFocus,
    beforeBlur,
    afterBlur,
  }: UseFocusControllerOptions = {}
) {
  const instance = getCurrentInstance()!;
  const { emit } = instance;
  const wrapperRef = signal<HTMLElement>();
  const isFocused = signal(false);

  const handleFocus = (event?: FocusEvent) => {
    // console.log('handleFocus . ');
    const cancelFocus = isFunction(beforeFocus) ? beforeFocus(event) : false;
    if (cancelFocus || isFocused.get()) return;
    isFocused.set(true);
    emit('focus', event);
    afterFocus?.();
  };

  const handleBlur = (event?: FocusEvent) => {
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;
    if (
      cancelBlur ||
      (event?.relatedTarget &&
        wrapperRef.get()?.contains(event?.relatedTarget as Node))
    )
      return;

    isFocused.set(false);
    emit('blur', event);
    afterBlur?.();
  };

  const handleClick = () => {
    if (
      wrapperRef.get()?.contains(document.activeElement) &&
      wrapperRef.get() !== document.activeElement
    ) {
      return;
    }

    if (target.get() instanceof TypeElement) {
      (target.get() as any).dom.focus();
    } else {
      target.get()?.focus();
    }
  };
  // todo
  watch(wrapperRef, (el) => {
    if (el) {
      el.setAttribute('tabindex', '-1');
    }
  });

  // console.log('then listen wrapperRef ', wrapperRef.get());
  useEventListener(wrapperRef, 'focus', handleFocus, true);
  useEventListener(wrapperRef, 'blur', handleBlur, true);
  useEventListener(wrapperRef, 'click', handleClick, true);

  // only for test
  if (process.env.NODE_ENV === 'test') {
    onMounted(() => {
      const targetEl = isElement(target.get())
        ? target.get()
        : document.querySelector('input,textarea');

      if (targetEl) {
        useEventListener(targetEl as Element, 'focus', handleFocus, true);
        useEventListener(targetEl as Element, 'blur', handleBlur, true);
      }
    });
  }

  return {
    isFocused,
    /** Avoid using wrapperRef and handleFocus/handleBlur together */
    wrapperRef,
    handleFocus,
    handleBlur,
  };
}
