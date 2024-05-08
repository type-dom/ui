import { UI } from '../../../ui/ui.abstract';
import { EVENT_CODE } from '../../../aria';
import { ITdFocusTrap, ITdFocusTrapConfig } from './td-focus-trap.interface';
import {
  createFocusOutPreventedEvent,
  getEdges,
  tryFocus,
  useFocusReason,
  FocusLayer,
} from './utils';

export class TdFocusTrap extends UI implements ITdFocusTrap {
  className: 'TdFocusTrap';
  override config?: ITdFocusTrapConfig;

  constructor(config?: ITdFocusTrapConfig) {
    super();
    this.className = 'TdFocusTrap';

    this.setConfig(config);
  }

  override initEvents() {
    const focusLayer: FocusLayer = {
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      },
    };

    const { focusReason } = useFocusReason();
    const onKeydown = (e: KeyboardEvent) => {
      if (!this.config?.loop && !this.config?.trapped) return;
      if (focusLayer.paused) return;

      const { key, altKey, ctrlKey, metaKey, currentTarget, shiftKey } = e;
      const { loop } = this.config;
      const isTabbing =
        key === EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;

      const currentFocusingEl = document.activeElement;
      if (isTabbing && currentFocusingEl) {
        const container = currentTarget as HTMLElement;
        const [first, last] = getEdges(container);
        const isTabbable = first && last;
        if (!isTabbable) {
          if (currentFocusingEl === container) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason.value,
            });
            // emit('focusout-prevented', focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
            }
          }
        } else {
          if (!shiftKey && currentFocusingEl === last) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason.value,
            });
            // emit('focusout-prevented', focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
              if (loop) tryFocus(first, true);
            }
          } else if (
            shiftKey &&
            [first, container].includes(currentFocusingEl as HTMLElement)
          ) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason.value,
            });
            // emit('focusout-prevented', focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
              if (loop) tryFocus(last, true);
            }
          }
        }
      }
    };

    this.addEvents({
      keydown: (evt) => onKeydown(evt as KeyboardEvent),
    });
  }
}
