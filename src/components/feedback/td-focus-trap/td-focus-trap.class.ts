import { EVENT_CODE, isNil, isString } from '@type-dom/utils';
import { nextTick } from '@type-dom/framework';
import { useEscapeKeydown } from '../../../hooks/use-escape-keydown';
import { UI } from '../../../ui/ui.abstract';
import { ITdFocusTrap, ITdFocusTrapConfig } from './td-focus-trap.interface';
import {
  createFocusOutPreventedEvent,
  getEdges,
  tryFocus,
  useFocusReason,
  FocusLayer, focusableStack, focusFirstDescendant, obtainAllFocusableElements, isFocusCausedByUserEvent
} from './utils';
import {
  FOCUS_AFTER_RELEASED,
  FOCUS_AFTER_TRAPPED,
  FOCUS_AFTER_TRAPPED_OPTS,
  FOCUS_TRAP_INJECTION_KEY, ON_RELEASE_FOCUS_EVT,
  ON_TRAP_FOCUS_EVT
} from './tokens';

export class TdFocusTrap extends UI<undefined> implements ITdFocusTrap {
  className: 'TdFocusTrap';
  override props: ITdFocusTrapConfig;
  inheritAttrs: boolean;
  forwardRef?: HTMLElement;
  lastFocusBeforeTrapped?: HTMLElement;
  lastFocusAfterTrapped?: HTMLElement;

  handelKeydown?: (e: KeyboardEvent) => void;
  private escapeKeydown?: {
    beforeDestroy: () => void;
    mounted: () => void;
  };
  private focusLayer?: FocusLayer;
  private focusReason?: 'pointer' | 'keyboard';


  constructor(params: ITdFocusTrapConfig = {}) {
    super();
    this.useTag('fragment');
    this.className = 'TdFocusTrap';
    this.inheritAttrs = false;

    this.props = this.useParams(params);
  }

  override setup() {
    const { focusReason } = useFocusReason();
    this.focusReason = focusReason;
    this.escapeKeydown = useEscapeKeydown((event) => {
      if (this.props.trapped && !this.focusLayer?.paused) {
        this.emit('release-requested', event);
      }
    });

    this.focusLayer = {
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    };

    this.handelKeydown = this.onKeydown;

    this.provide(FOCUS_TRAP_INJECTION_KEY, {
      focusTrapRef: this.forwardRef,
      onKeydown: this.onKeydown
    });
  }

  override mounted() {
    this.escapeKeydown?.mounted();
    if (this.props.trapped) {
      this.startTrap();
    }
  }

  override beforeDestroy() {
    this.escapeKeydown?.beforeDestroy();
  }

  onKeydown = (e: KeyboardEvent) => {
    if (!this.props.loop && !this.props.trapped) {
      return;
    }
    if (this.focusLayer?.paused) {
      return;
    }

    const { key, altKey, ctrlKey, metaKey, currentTarget, shiftKey } = e;
    const { loop } = this.props;
    const isTabbing =
      key === EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;

    const currentFocusingEl = document.activeElement;
    if (isTabbing && currentFocusingEl) {
      const container = currentTarget as HTMLElement;
      const [first, last] = getEdges(container);
      const isTabbable = first && last;
      if (isTabbable) {
        if (!shiftKey && currentFocusingEl === last) {
          const focusoutPreventedEvent = createFocusOutPreventedEvent({
            focusReason: this.focusReason
          });
          this.emit('focusout-prevented', focusoutPreventedEvent);
          if (!focusoutPreventedEvent.defaultPrevented) {
            e.preventDefault();
            if (loop) {
              tryFocus(first, true);
            }
          }
        } else if (
          shiftKey &&
          [first, container].includes(currentFocusingEl as HTMLElement)
        ) {
          const focusoutPreventedEvent = createFocusOutPreventedEvent({
            focusReason: this.focusReason
          });
          // emit('focusout-prevented', focusoutPreventedEvent);
          if (!focusoutPreventedEvent.defaultPrevented) {
            e.preventDefault();
            if (loop) {
              tryFocus(last, true);
            }
          }
        }
      } else {
        if (currentFocusingEl === container) {
          const focusoutPreventedEvent = createFocusOutPreventedEvent({
            focusReason: this.focusReason
          });
          // emit('focusout-prevented', focusoutPreventedEvent);
          if (!focusoutPreventedEvent.defaultPrevented) {
            e.preventDefault();
          }
        }
      }
    }
  }

  setFocusTrapEl(el: HTMLElement) {
    if (el) {
      this.props.focusTrapEl = el;
      this.forwardRef = el;
    }
  }

  setForwardRef(newEl: HTMLElement, oldEl: HTMLElement) {
    if (newEl) {
      newEl.addEventListener('keydown', this.onKeydown);
      newEl.addEventListener('focusin', this.onFocusIn);
      newEl.addEventListener('focusout', this.onFocusOut);
    }
    if (oldEl) {
      oldEl.removeEventListener('keydown', this.onKeydown);
      oldEl.removeEventListener('focusin', this.onFocusIn);
      oldEl.removeEventListener('focusout', this.onFocusOut);
    }
  }

  trapOnFocus = (e: Event) => {
    this.emit(ON_TRAP_FOCUS_EVT, e);
  }

  releaseOnFocus = (e: Event) => {
    this.emit(ON_RELEASE_FOCUS_EVT, e);
  }

  onFocusIn = (e: FocusEvent) => {
    const trapContainer = this.forwardRef;
    if (!trapContainer) {
      return;
    }

    const target = e.target as HTMLElement;
    const relatedTarget = e.relatedTarget as HTMLElement;
    const isFocusedInTrap = target && trapContainer.contains(target);

    if (!this.props.trapped) {
      const isPrevFocusedInTrap =
        relatedTarget && trapContainer.contains(relatedTarget);
      if (!isPrevFocusedInTrap) {
        this.lastFocusBeforeTrapped = relatedTarget;
      }
    }

    if (isFocusedInTrap) {
      this.emit('focusin', e);
    }

    if (this.focusLayer?.paused) {
      return;
    }

    if (this.props.trapped) {
      if (isFocusedInTrap) {
        this.lastFocusAfterTrapped = target;
      } else {
        tryFocus(this.lastFocusAfterTrapped, true);
      }
    }
  };

  onFocusOut = (e: Event) => {
    const trapContainer = this.forwardRef;
    if (this.focusLayer?.paused || !trapContainer) {
      return;
    }

    if (this.props.trapped) {
      const relatedTarget = (e as FocusEvent)
        .relatedTarget as HTMLElement | null;
      if (!isNil(relatedTarget) && !trapContainer.contains(relatedTarget)) {
        // Give embedded focus layer time to pause this layer before reclaiming focus
        // And only reclaim focus if it should currently be trapping
        setTimeout(() => {
          if (!this.focusLayer?.paused && this.props.trapped) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: this.focusReason
            });
            this.emit('focusout-prevented', focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              tryFocus(this.lastFocusAfterTrapped, true);
            }
          }
        }, 0);
      }
    } else {
      const target = e.target as HTMLElement | null;
      const isFocusedInTrap = target && trapContainer.contains(target);
      if (!isFocusedInTrap) this.emit('focusout', e);
    }
  }

  async startTrap() {
    // Wait for forwardRef to resolve
    await nextTick();
    const trapContainer = this.forwardRef;
    if (trapContainer) {
      focusableStack.push(this.focusLayer!);
      const prevFocusedElement = trapContainer.contains(
        document.activeElement
      )
        ? this.lastFocusBeforeTrapped
        : document.activeElement;
      this.lastFocusBeforeTrapped = prevFocusedElement as HTMLElement;
      const isPrevFocusContained = trapContainer.contains(prevFocusedElement!);
      if (!isPrevFocusContained) {
        const focusEvent = new Event(
          FOCUS_AFTER_TRAPPED,
          FOCUS_AFTER_TRAPPED_OPTS
        );
        trapContainer.addEventListener(FOCUS_AFTER_TRAPPED, this.trapOnFocus);
        trapContainer.dispatchEvent(focusEvent);
        if (!focusEvent.defaultPrevented) {
          nextTick(() => {
            let focusStartEl = this.props.focusStartEl;
            if (!isString(focusStartEl)) {
              tryFocus(focusStartEl);
              if (document.activeElement !== focusStartEl) {
                focusStartEl = 'first';
              }
            }
            if (focusStartEl === 'first') {
              focusFirstDescendant(
                obtainAllFocusableElements(trapContainer),
                true
              );
            }
            if (
              document.activeElement === prevFocusedElement ||
              focusStartEl === 'container'
            ) {
              tryFocus(trapContainer);
            }
          });
        }
      }
    }
  }

  stopTrap() {
    const trapContainer = this.forwardRef;

    if (trapContainer) {
      trapContainer.removeEventListener(FOCUS_AFTER_TRAPPED, this.trapOnFocus);

      const releasedEvent = new CustomEvent(FOCUS_AFTER_RELEASED, {
        ...FOCUS_AFTER_TRAPPED_OPTS,
        detail: {
          focusReason: this.focusReason
        }
      });
      trapContainer.addEventListener(FOCUS_AFTER_RELEASED, this.releaseOnFocus);
      trapContainer.dispatchEvent(releasedEvent);
      if (
        !releasedEvent.defaultPrevented &&
        (this.focusReason == 'keyboard' ||
          !isFocusCausedByUserEvent() ||
          trapContainer.contains(document.activeElement))
      ) {
        tryFocus(this.lastFocusBeforeTrapped ?? document.body);
      }

      trapContainer.removeEventListener(FOCUS_AFTER_RELEASED, this.releaseOnFocus);
      focusableStack.remove(this.focusLayer!);
    }
  }
}
