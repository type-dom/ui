import {
  defineExpose,
  inject,
  TypeFragment,
} from '@type-dom/framework';
import { Signal, signal, unref } from '@type-dom/signals';
import { composeEventHandlers } from '@type-dom/utils';

import { useNamespace } from '../../../../hooks/use-namespace';
import { TdPopperTrigger } from '../../td-popper/trigger/trigger.class';
import { OnlyChildExpose } from '../../td-only-child/td-only-child.interface';
import { whenTrigger } from '../utils';
import { TOOLTIP_INJECTION_KEY } from '../td-tooltip.const';
// import { TooltipContext } from '../td-tooltip.interface';
import { ITdTooltipTrigger, TooltipTriggerProps } from './trigger.interface';
import { tooltipTriggerProps } from './trigger.const';

export class TdTooltipTrigger
  extends TypeFragment
  implements ITdTooltipTrigger
{
  className: 'TdTooltipTrigger';
  override props: TooltipTriggerProps;
  triggerRef?: Signal<OnlyChildExpose | undefined>;

  constructor(params: TooltipTriggerProps = {}) {
    super();
    // console.log('TdTooltipTrigger, ', params.virtualRef);
    this.className = 'TdTooltipTrigger';
    this.assignProps(tooltipTriggerProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;

    const ns = useNamespace('tooltip');
    const { controlled, id, open, onOpen, onClose, onToggle } = inject(
      TOOLTIP_INJECTION_KEY,
      undefined
    )!;

    const triggerRef = signal<OnlyChildExpose | undefined>(undefined);

    const stopWhenControlledOrDisabled = () => {
      // console.warn('stopWhenControlledOrDisabled');
      // console.log('unref(controlled) is ', unref(controlled));
      if (unref(controlled) || unref(props.disabled)) {
        return true;
      }
      return;
    };
    const trigger = signal(props.trigger || []);
    // console.log('trigger is ', trigger);

    const onMouseenter = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'hover', onOpen)
    );
    // console.log('onMouseenter is ', onMouseenter);

    const onMouseleave = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'hover', onClose)
    );
    const onClick = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'click', (e) => {
        // console.warn('onClick click . e is ', e);
        // distinguish left click
        if ((e as MouseEvent).button === 0) {
          onToggle(e);
        }
      })
    );

    const onFocus = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'focus', onOpen)
    );

    const onBlur = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'focus', onClose)
    );

    const onContextmenu = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'contextmenu', (e?: Event) => {
        e?.preventDefault();
        onToggle(e);
      })
    );

    const onKeydown = composeEventHandlers(
      stopWhenControlledOrDisabled,
      (e?: KeyboardEvent) => {
        if (!e) return;
        const { code } = e;
        if (this.props.triggerKeys?.includes(code)) {
          e?.preventDefault();
          onToggle(e);
        }
      }
    ) as (evt?: Event) => void;

    defineExpose({
      /**
       * @description trigger element
       */
      triggerRef,
    });

    this.addChild(
      new TdPopperTrigger({
        id: id,
        virtualRef: props.virtualRef,
        open: open,
        virtualTriggering: props.virtualTriggering,
        class: [ns.e('trigger')],
        onBlur,
        onClick,
        onContextmenu,
        onFocus,
        onMouseenter,
        onMouseleave,
        onKeydown,
        slot: props.slot,
      })
    );
  }
}
