import { PopperProps } from './td-popper.interface';

const effects = ['light', 'dark'] as const;
const triggers = ['click', 'contextmenu', 'hover', 'focus'] as const;

export const Effect = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const roleTypes = [
  'dialog',
  'grid',
  'group',
  'listbox',
  'menu',
  'navigation',
  'tooltip',
  'tree',
] as const;

export type PopperEffect =
  | (typeof effects)[number]
  | (string & NonNullable<unknown>);
export type PopperTrigger = (typeof triggers)[number];

export const popperProps: PopperProps = {
  role: 'tooltip',
};
