import { LinkProps } from './td-link.interface';

export const linkProps: LinkProps = {
  type: 'default',
  underline: true,
  href: '',
  target: '_self',
};

export const linkEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
};
export type LinkEmits = typeof linkEmits;
