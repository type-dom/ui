import { isString, isUndefined } from '@type-dom/utils';
import { AnchorProps } from './td-anchor.interface';

export const anchorProps: AnchorProps = {
  offset: 0,
  bound: 15,
  duration: 300,
  marker: true,
  type: 'default',
  direction: 'vertical',
  scrollTop: false,
};

export const anchorEmits = {
  change: (href: string) => isString(href),
  click: (e: MouseEvent, href?: string) =>
    e instanceof MouseEvent && (isString(href) || isUndefined(href)),
};
