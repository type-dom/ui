import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { ON_RELEASE_FOCUS_EVT, ON_TRAP_FOCUS_EVT } from './tokens';

export interface ITdFocusTrap extends IUI {
  className: 'TdFocusTrap';
}

export interface ITdFocusTrapConfig extends IUIConfig {
  loop?: boolean;
  trapped?: boolean;
  focusTrapEl?: HTMLElement;
  // focusTrapEl: Object as PropType<HTMLElement>,
  focusStartEl?: 'container' | 'first' | HTMLElement; //{
  //   type: [Object, String] as PropType<'container' | 'first' | HTMLElement>,
  //   default: 'first',
  // },

  emits?: {
    [ON_TRAP_FOCUS_EVT]?: () => void;
    [ON_RELEASE_FOCUS_EVT]?:() => void;
    focusin?: () => void;
    focusout?: () => void;
    focusoutPrevented?: () => void;
    releaseRequested?: () => void;
  }
}
