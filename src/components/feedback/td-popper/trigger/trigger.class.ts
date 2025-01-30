import { isElement, isNil } from '@type-dom/utils';
import {
  TypeFragment,
  defineExpose,
  inject,
  onBeforeUnmount,
  onMounted,
  unrefElement,
} from '@type-dom/framework';
import { computed, unref, watch, WatchStopHandle } from '@type-dom/signals';
import { isFocusable } from '../../../../../../utils/src/ui/dom';
import { useForwardRef } from '../../../../hooks/use-forward-ref';
import { TdOnlyChild } from '../../td-only-child/td-only-child.class';
import { POPPER_INJECTION_KEY } from '../constants';
import { ITdPopperTrigger, PopperTriggerProps } from './trigger.interface';
import { popperTriggerProps } from './trigger.const';

export class TdPopperTrigger extends TypeFragment implements ITdPopperTrigger {
  className: 'TdPopperTrigger';
  override props: PopperTriggerProps;

  constructor(params: PopperTriggerProps = {}) {
    super();
    console.log('td-popper-trigger , params is ', params);
    this.className = 'TdPopperTrigger';
    this.assignProps(popperTriggerProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;

    const { role, triggerRef } = inject(POPPER_INJECTION_KEY, undefined)!;
    console.log('role is ', role, ' , triggerRef is ', triggerRef);
    // 与 only-child组件配合使用的方法，绑定相关的方法；
    useForwardRef(triggerRef);

    const ariaControls = computed<string | undefined>(() => {
      return ariaHaspopup.get() ? unref(props.id) : undefined;
    });

    const ariaDescribedby = computed<string | undefined>(() => {
      if (role && role.get() === 'tooltip') {
        return props.open?.get() && props.id ? unref(props.id) : undefined;
      }
      return undefined;
    });

    const ariaHaspopup = computed<string | undefined>(() => {
      if (role && role.get() !== 'tooltip') {
        return role.get();
      }
      return undefined;
    });

    const ariaExpanded = computed<string | undefined>(() => {
      return ariaHaspopup.get() ? `${props.open?.get()}` : undefined;
    });

    let virtualTriggerAriaStopWatch: WatchStopHandle | undefined = undefined;

    const TRIGGER_ELE_EVENTS = [
      'onMouseenter',
      'onMouseleave',
      'onClick',
      'onKeydown',
      'onFocus',
      'onBlur',
      'onContextmenu',
    ] as const;

    onMounted(() => {
      watch(
        () => unref(props.virtualRef),
        (virtualEl) => {
          if (virtualEl) {
            triggerRef?.set(unrefElement(virtualEl as HTMLElement));
          }
        },
        {
          immediate: true,
        }
      );

      watch(
        triggerRef,
        (el, prevEl) => {
          virtualTriggerAriaStopWatch?.();
          virtualTriggerAriaStopWatch = undefined;
          if (isElement(el)) {
            console.log(
              'then bind listeners to trigger html element from this element props .'
            );
            TRIGGER_ELE_EVENTS.forEach((eventName) => {
              const handler = props[eventName];
              if (handler) {
                (el as HTMLElement).addEventListener(
                  eventName.slice(2).toLowerCase() as keyof HTMLElementEventMap,
                  handler
                );
                (prevEl as HTMLElement)?.removeEventListener?.(
                  eventName.slice(2).toLowerCase() as keyof HTMLElementEventMap,
                  handler
                );
              }
            });
            if (isFocusable(el as HTMLElement)) {
              virtualTriggerAriaStopWatch = watch(
                () => [
                  ariaControls.get(),
                  ariaDescribedby.get(),
                  ariaHaspopup.get(),
                  ariaExpanded.get(),
                ],
                (watches) => {
                  [
                    'aria-controls',
                    'aria-describedby',
                    'aria-haspopup',
                    'aria-expanded',
                  ].forEach((key, idx) => {
                    isNil(watches[idx])
                      ? el.removeAttribute(key)
                      : el.setAttribute(key, watches[idx]!);
                  });
                },
                { immediate: true }
              );
            }
          }
          if (isElement(prevEl) && isFocusable(prevEl as HTMLElement)) {
            [
              'aria-controls',
              'aria-describedby',
              'aria-haspopup',
              'aria-expanded',
            ].forEach((key) => prevEl.removeAttribute(key));
          }
        },
        {
          immediate: true,
        }
      );
    });

    onBeforeUnmount(() => {
      virtualTriggerAriaStopWatch?.();
      virtualTriggerAriaStopWatch = undefined;
      if (triggerRef?.get() && isElement(triggerRef?.get())) {
        const el = triggerRef.get() as HTMLElement;
        TRIGGER_ELE_EVENTS.forEach((eventName) => {
          const handler = props[eventName];
          if (handler) {
            el?.removeEventListener?.(
              eventName.slice(2).toLowerCase(),
              handler
            );
          }
        });
        triggerRef?.set(undefined);
      }
    });

    defineExpose({
      /**
       * @description trigger element
       */
      triggerRef,
    });

    this.addChild(
      new TdOnlyChild({
        vIf: !this.props.virtualTriggering,
        // v-bind: $attrs
        attrObj: {
          ariaControls: ariaControls,
          ariaDescribedby: ariaDescribedby,
          ariaExpanded: ariaExpanded,
          ariaHaspopup: ariaHaspopup,
        },
        slot: props.slot,
      })
    );
  }
}
