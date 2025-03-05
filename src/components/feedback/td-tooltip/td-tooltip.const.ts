import { InjectionKey } from '@type-dom/framework';
import { createModelToggleComposable } from '../../../hooks/use-model-toggle';
import { popperProps } from '../td-popper/td-popper.const';
import { tooltipContentProps } from './content/content.const';
import { tooltipTriggerProps } from './trigger/trigger.const';
import { popperArrowProps } from '../td-popper/arrow/arrow.const';
import { TooltipContext } from './td-tooltip.interface';

export const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle,
} = createModelToggleComposable('visible' as const);

export const tooltipProps = {
  ...popperProps,
  ...useTooltipModelToggleProps,
  ...tooltipContentProps,
  ...tooltipTriggerProps,
  ...popperArrowProps,
  showArrow: true,
  // nodeName: 'fragment',
}; // as TooltipProps;

export const tooltipEmits = [
  ...useTooltipModelToggleEmits,
  'before-show',
  'before-hide',
  'show',
  'hide',
  'open',
  'close',
];

export const TOOLTIP_INJECTION_KEY: InjectionKey<TooltipContext> =
  Symbol('TdTooltip');
