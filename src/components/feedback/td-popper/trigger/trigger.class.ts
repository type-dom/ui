import { isElement } from '@type-dom/utils';
import { UI } from '../../../../ui/ui.abstract';
import { useForwardRef } from '../../../../hooks/use-forward-ref';
import { TdOnlyChild } from '../../td-only-child/td-only-child.class';
import { popperContentProps } from '../content/content.const';
import { POPPER_INJECTION_KEY } from '../td-popper.const';
import { ITdPopperTrigger, ITdPopperTriggerConfig } from './trigger.interface';
import { TRIGGER_ELE_EVENTS } from './trigger.const';

export class TdPopperTrigger extends UI implements ITdPopperTrigger {
  className: 'TdPopperTrigger';
  override props: ITdPopperTriggerConfig;
  private role: any;
  triggerRef?: HTMLElement;
  virtualTriggerAriaStopWatch?: () => void;


  constructor(params: ITdPopperTriggerConfig = {}) {
    super();
    this.className = 'TdPopperTrigger';
    if (!params.virtualTriggering) {
      this.addChild(new TdOnlyChild());
    }
    this.buildProps(popperContentProps);
    this.props = this.useParams(params);
  }
  get ariaHaspopup() {
    if (this.role && this.role !== 'tooltip') {
      return this.role
    }
    return undefined
  }

  get ariaControls() {
    return this.ariaHaspopup ? this.props.id : undefined
  }

  get ariaDescribedby() {
    if (this.role && this.role === 'tooltip') {
      return this.props.open && this.props.id ? this.props.id : undefined
    }
    return undefined
  }

  get ariaExpanded() {
    return this.ariaHaspopup.value ? `${this.props.open}` : undefined
  }
  override setup() {
    const { role, triggerRef } = this.inject(POPPER_INJECTION_KEY, undefined)!;
    this.role = role;
    this.triggerRef = triggerRef;
    useForwardRef(triggerRef)

  }

  override beforeDestroy() {
    this.virtualTriggerAriaStopWatch?.()
    this.virtualTriggerAriaStopWatch = undefined
    if (this.triggerRef && isElement(this.triggerRef)) {
      const el = this.triggerRef as HTMLElement
      TRIGGER_ELE_EVENTS.forEach((eventName) => {
        const handler = this.props[eventName];
        if (handler) {
          // todo eventName  onClick
          el.removeEventListener(eventName.slice(2).toLowerCase(), handler)
        }
      });
      this.triggerRef = undefined
    }
  }

  setVirtualRef(el: HTMLElement) {
    if (el) {
      this.props.virtualRef = el;
      this.triggerRef = el;
    }
  }

  setTriggerRef(el: HTMLElement, prevEl?: HTMLElement) {
    this.virtualTriggerAriaStopWatch?.();
    this.virtualTriggerAriaStopWatch = undefined;

    if (isElement(el)) {
      TRIGGER_ELE_EVENTS.forEach((eventName) => {
        const handler = this.props[eventName]
        if (handler) {
          (el as HTMLElement).addEventListener(
            eventName.slice(2).toLowerCase(),
            handler
          );
          (prevEl as HTMLElement)?.removeEventListener?.(
            eventName.slice(2).toLowerCase(),
            handler
          )
        }
      });
      // this.virtualTriggerAriaStopWatch = this.watch(
      //   [ariaControls, ariaDescribedby, ariaHaspopup, ariaExpanded],
      //   (watches) => {
      //     ;[
      //       'aria-controls',
      //       'aria-describedby',
      //       'aria-haspopup',
      //       'aria-expanded',
      //     ].forEach((key, idx) => {
      //       isNil(watches[idx])
      //         ? el.removeAttribute(key)
      //         : el.setAttribute(key, watches[idx]!)
      //     })
      //   },
      //   { immediate: true }
      // )
    }
    if (isElement(prevEl)) {
      [
        'aria-controls',
        'aria-describedby',
        'aria-haspopup',
        'aria-expanded',
      ].forEach((key) => prevEl.removeAttribute(key))
    }
  }

}
