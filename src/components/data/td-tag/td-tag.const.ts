import { TagProps } from './td-tag.interface';

export const tagProps: TagProps = {
  type: 'primary',
  effect: 'light',
} as const;

export const tagEmits = {
  close: (evt?: MouseEvent) => evt instanceof MouseEvent,
  click: (evt?: MouseEvent) => evt instanceof MouseEvent,
};
export type TagEmits = typeof tagEmits;

// export type TagInstance = InstanceType<typeof Tag>
