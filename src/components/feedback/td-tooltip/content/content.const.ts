import { useDelayedToggleProps } from '../../../../hooks/use-delayed-toggle';
import { popperContentProps } from '../../td-popper/content/content.const';
import { TooltipContentProps } from './content.interface';

export const tooltipContentProps: TooltipContentProps = {
  ...useDelayedToggleProps,
  ...popperContentProps,
  teleported: true,
};
