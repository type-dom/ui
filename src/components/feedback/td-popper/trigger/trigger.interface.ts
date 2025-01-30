import {
  ITypeFragment,
  TypeFragmentProps,
  TypeElement,
  TypeHtml,
  TypeNode,
  IEvent,
} from '@type-dom/framework';
import { MaybeRef, Ref, Signal } from '@type-dom/signals';
import { Measurable } from '../td-popper.interface';

export interface ITdPopperTrigger extends ITypeFragment {
  className: 'TdPopperTrigger';
}

export interface PopperTriggerProps extends TypeFragmentProps {
  // virtualRef: {
  //   type: definePropType<Measurable>(Object),
  // },
  virtualRef?: Ref<Measurable>;
  virtualTriggering?: boolean;
  onMouseenter?: (e: Event) => void;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  onMouseleave?: (e: Event) => void;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  onClick?: (e: Event) => void;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  onKeydown?: (e: Event) => void;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  onFocus?: (e: Event) => void;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  onBlur?: (e: Event) => void;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  onContextmenu?: (e: Event) => void;
  //   type: definePropType<(e: Event) => void>(Function),
  // },
  id?: MaybeRef<string>;
  open?: Signal<boolean>;

  // slot?: TypeElement;
}
