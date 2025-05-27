import {
  ITypeFragment,
  TypeFragmentProps,
} from '@type-dom/framework';
import { ON_RELEASE_FOCUS_EVT, ON_TRAP_FOCUS_EVT } from './tokens';
import { MaybeRef } from '@type-dom/signals';

export interface ITdFocusTrap extends ITypeFragment {
  className: 'TdFocusTrap';
}

export interface FocusTrapProps extends TypeFragmentProps {
  loop?: boolean;
  trapped?: MaybeRef<boolean>;
  trapOnFocusIn?: boolean;
  focusTrapEl?: MaybeRef<HTMLElement | undefined>;
  // focusTrapEl: Object as PropType<HTMLElement>,
  focusStartEl?: MaybeRef<'container' | 'first' | HTMLElement | undefined>; //{
  //   type: [Object, String] as PropType<'container' | 'first' | HTMLElement>,
  //   default: 'first',
  // },
  // slot?: (arg?: any) => ISlotRaw | ISlotRaw[];
  emits?: {
    [ON_TRAP_FOCUS_EVT]?: () => void;
    [ON_RELEASE_FOCUS_EVT]?: () => void;
    // focusAfterTrapped?: () => void;
    // focusAfterReleased?: () => void;
    focusin?: () => void;
    focusout?: () => void;
    focusoutPrevented?: () => void;
    releaseRequested?: () => void;
  };
}
