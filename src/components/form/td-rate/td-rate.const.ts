import { ElStarFilledSvg, ElStarSvg } from '@type-dom/svgs';
import { isNumber } from '@type-dom/utils';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event';
import { RateProps } from './td-rate.interface';

export const rateProps: RateProps = {
  modelValue: 0,
  lowThreshold: 2,
  highThreshold: 4,
  max: 5,
  voidColor: '',
  disabledVoidColor: '',
  icons: [ElStarFilledSvg, ElStarFilledSvg, ElStarFilledSvg],
  voidIcon: ElStarSvg,
  disabledVoidIcon: ElStarFilledSvg,
  textColor: '',
  texts: [
    'Extremely bad',
    'Disappointed',
    'Fair',
    'Satisfied',
    'Surprise',
  ] as string[],
  scoreTemplate: '{value}',
  // ...useAriaProps(['ariaLabel']),
} as const;
export const rateEmits = {
  [CHANGE_EVENT]: (value: number) => isNumber(value),
  [UPDATE_MODEL_EVENT]: (value: number) => isNumber(value),
};
export type RateEmits = typeof rateEmits;
