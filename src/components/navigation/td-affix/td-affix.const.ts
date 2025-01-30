import { isBoolean, isNumber } from '@type-dom/utils';
import { CHANGE_EVENT } from '../../../constants/event';
import { AffixProps } from './td-affix.interface';

export const affixProps: AffixProps = {
  zIndex: 100,
  offset: 0,
  position: 'top',
};

export const affixEmits = {
  scroll: ({ scrollTop, fixed }: { scrollTop: number; fixed: boolean }) =>
    isNumber(scrollTop) && isBoolean(fixed),
  [CHANGE_EVENT]: (fixed: boolean) => isBoolean(fixed),
};
