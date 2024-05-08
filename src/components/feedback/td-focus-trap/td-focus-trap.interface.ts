import { IUI, IUIConfig } from '../../../ui/ui.interface';


export interface ITdFocusTrap extends IUI {
  className: 'TdFocusTrap'
}

export interface ITdFocusTrapConfig extends IUIConfig {
  loop?: boolean,
  trapped?: boolean,
  focusTrapEl?: HTMLElement,
  // focusTrapEl: Object as PropType<HTMLElement>,
  focusStartEl?: 'container' | 'first' | HTMLElement; //{
  //   type: [Object, String] as PropType<'container' | 'first' | HTMLElement>,
  //   default: 'first',
  // },
}
