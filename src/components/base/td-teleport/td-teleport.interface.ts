import { ITypeFragment, TypeFragmentProps } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';

export interface ITdTeleport extends ITypeFragment {
  className: 'TdTeleport';
}

export interface TeleportProps extends TypeFragmentProps {
  to?: MaybeRef<string | HTMLElement>; // required: true
  disabled?: boolean;
}
