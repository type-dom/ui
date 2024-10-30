import { EVENT_CODE, isClient } from '@type-dom/utils';

let registeredEscapeHandlers: ((e: KeyboardEvent) => void)[] = [];

const cachedHandler = (e: Event) => {
  const event = e as KeyboardEvent;
  if (event.key === EVENT_CODE.esc) {
    registeredEscapeHandlers.forEach((registeredHandler) =>
      registeredHandler(event)
    );
  }
};

export const useEscapeKeydown = (handler: (e: KeyboardEvent) => void) => {
  const mounted = () => {
    if (registeredEscapeHandlers.length === 0) {
      document.addEventListener('keydown', cachedHandler);
    }
    if (isClient) {
      registeredEscapeHandlers.push(handler);
    }
  };

  const beforeDestroy = () => {
    registeredEscapeHandlers = registeredEscapeHandlers.filter(
      (registeredHandler) => registeredHandler !== handler
    );
    if (registeredEscapeHandlers.length === 0) {
      if (isClient) {
        document.removeEventListener('keydown', cachedHandler);
      }
    }
  };
  return { mounted, beforeDestroy };
};
