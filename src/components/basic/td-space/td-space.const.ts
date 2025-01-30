import { SpaceProps } from './td-space.interface';

export const SIZE_MAP: { [propName: string]: number } = {
  small: 8,
  default: 12,
  large: 16,
};

export const spaceProps: SpaceProps = {
  direction: 'horizontal',
  alignment: 'center', // StyleAlignItems.center,
  fillRatio: 100,
};
