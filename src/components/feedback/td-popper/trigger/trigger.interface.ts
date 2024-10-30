import { IUI, IUIConfig } from '../../../../ui/ui.interface';

export interface ITdPopperTrigger extends IUI {
  className: 'TdPopperTrigger';
}

type IEvent = (event: Event) => void;

export interface ITdPopperTriggerConfig extends IUIConfig {
  // virtualRef: {
  //   type: definePropType<Measurable>(Object),
  // },
  virtualRef?: HTMLElement;
  virtualTriggering?: boolean,
  onMouseenter?: IEvent;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  onMouseleave?: IEvent;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  onClick?: IEvent;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  onKeydown?: IEvent;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  onFocus?: IEvent;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  onBlur?: IEvent;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  onContextmenu?: IEvent;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  id?: string;
  open?: boolean;
}
