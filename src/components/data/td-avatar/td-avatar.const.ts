import { ITdAvatarConfig } from '@type-dom/ui';

export const avatarProps: ITdAvatarConfig = {
  shape: 'circle',
  src: '',
  fit: 'cover',
};

export const avatarEmits = {
  error: (evt: Event) => evt instanceof Event,
};
