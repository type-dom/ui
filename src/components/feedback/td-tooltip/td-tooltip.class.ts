import { Span } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { TdPopper } from '../td-popper/td-popper.class';
import { TdPopperArrow } from '../td-popper/arrow/arrow.class';
import { ITdTooltip, ITdTooltipConfig } from './td-tooltip.interface';
import { TdTooltipTrigger } from './trigger/trigger.class';
import { TdTooltipContent } from './content/content.class';
import { ITdTooltipTriggerConfig } from './trigger/trigger.interface';
import { ITdTooltipContentConfig } from './content/content.interface';

export class TdTooltip extends UI implements ITdTooltip {
  className: 'TdTooltip';
  override props: ITdTooltipConfig;
  private trigger: TdTooltipTrigger;
  private content: TdTooltipContent;

  constructor(params: ITdTooltipConfig = {}) {
    super();
    this.className = 'TdTooltip';
    const triggerParams: ITdTooltipTriggerConfig = {
      disabled: params.disabled,
      trigger: params.trigger,
      triggerKeys: params.triggerKeys,
      virtualRef: params.virtualRef,
      virtualTriggering: params.virtualTriggering,
    }; // as ITdTooltipTriggerConfig;

    this.trigger = new TdTooltipTrigger(triggerParams);
    const contentParams: ITdTooltipContentConfig = {
      ariaLabel: params.ariaLabel,
      boundariesPadding: params.boundariesPadding,
      content: params.content,
      disabled: params.disabled,
      effect: params.effect,
      enterable: params.enterable,
      fallbackPlacements: params.fallbackPlacements,
      hideAfter: params.hideAfter,
      gpuAcceleration: params.gpuAcceleration,
      offset: params.offset,
      persistent: params.persistent,
      popperStyle: params.popperStyle,
      placement: params.placement,
      popperOptions: params.popperOptions,
      pure: params.pure,
      rawContent: params.rawContent,
      referenceEl: params.referenceEl,
      triggerTargetEl: params.triggerTargetEl,
      showAfter: params.showAfter,
      strategy: params.strategy,
      teleported: params.teleported,
      transition: params.transition,
      virtualTriggering: params.virtualTriggering,
      zIndex: params.zIndex,
      appendTo: params.appendTo,
    };
    this.content = new TdTooltipContent({
      ...contentParams,
      slot: [new Span(), new TdPopperArrow()]
    });
    this.addChild(
      new TdPopper({
        slot: [this.trigger, this.content]
      })
    );
    this.buildProps(useTooltipProps);
    this.props = this.useParams(params);
  }
}
