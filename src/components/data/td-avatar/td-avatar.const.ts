import { AvatarProps } from './td-avatar.interface';

export const avatarProps: AvatarProps = {
  shape: 'circle',
  src: '',
  fit: 'cover',
};

export const avatarEmits = {
  error: (evt: Event) => evt instanceof Event,
};
