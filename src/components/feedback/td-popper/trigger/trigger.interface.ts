import { IUI, IUIConfig } from '../../../../ui/ui.interface';


export interface ITdPopperTrigger extends IUI {
  className: 'TdPopperTrigger'
}

export interface ITdPopperTriggerConfig extends IUIConfig {
  // virtualRef: {
  //   type: definePropType<Measurable>(Object),
  // },
  // virtualTriggering: Boolean,
  // onMouseenter: {
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  // onMouseleave: {
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  // onClick: {
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  // onKeydown: {
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  // onFocus: {
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  // onBlur: {
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  // onContextmenu: {
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  id?: string,
  open?: boolean,
}
