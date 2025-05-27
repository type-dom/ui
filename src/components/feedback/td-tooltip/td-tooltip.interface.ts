import {
  ISlotItem,
  ITypeFragment,
  TypeElement,
} from '@type-dom/framework';
import { Computed, Signal } from '@type-dom/signals';
import { Arrayable } from '@type-dom/utils';
import { PopperProps } from '../td-popper/td-popper.interface';
import {
  TooltipTriggerProps,
  TooltipTriggerType,
} from './trigger/trigger.interface';
import { TooltipContentProps } from './content/content.interface';
import { PopperArrowProps } from '../td-popper/arrow/arrow.interface';

export interface ITdTooltip extends ITypeFragment {
  className: 'TdTooltip';
}

export interface TooltipProps
  extends PopperProps,
    Omit<TooltipTriggerProps, 'open' | 'nodeName'>,
    Omit<TooltipContentProps, 'slot' | 'nodeName'>,
    Omit<PopperArrowProps, 'nodeName'> {
  // ...popperProps,
  // ...useTooltipModelToggleProps,
  // ...useTooltipContentProps,
  // ...useTooltipTriggerProps,
  // ...popperArrowProps,
  // open?: any; // todo
  // nodeName?: 'fragment';
  /**
   *     default: 5,
   */
  // arrowOffset?: number;
  /**
   * @description whether the tooltip content has an arrow
   *  default: true,
   */
  showArrow?: boolean;

  slot?: TypeElement;
  slots?: {
    // default?: TypeElement;
    default?: ISlotItem;
    reference?: ISlotItem;
    content?: ISlotItem;
  };
}

export type TooltipContext = {
  controlled: Computed<boolean>;
  id: Computed<string>;
  open: Signal<boolean>;
  trigger?: Signal<Arrayable<TooltipTriggerType | undefined>>;
  onOpen: (e?: Event) => void;
  onClose: (e?: Event) => void;
  onToggle: (e?: Event) => void;
  onShow: () => void;
  onHide: () => void;
  onBeforeShow: () => void;
  onBeforeHide: () => void;
  updatePopper?: () => void; // todo add by me ??
};
