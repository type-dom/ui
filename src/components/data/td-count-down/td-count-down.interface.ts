import {
  ITypeFragment,
  StyleValue,
  TypeFragmentProps,
} from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';
import { Dayjs } from 'dayjs';
import { MaybeRef, Signal } from '@type-dom/signals';

export interface ITdCountDown extends ITypeFragment {
  className: 'TdCountDown';
}

export interface CountDownProps extends TypeFragmentProps {
  /**
   * @description Formatting the countdown display
   *     default: 'HH:mm:ss',
   */
  format?: string;
  /**
   * @description Sets the prefix of a countdown
   */
  prefix?: string;
  /**
   * @description Sets the suffix of a countdown
   */
  suffix?: string;
  /**
   * @description countdown titles
   */
  title?: string;
  /**
   * @description target time
   *     default: 0,
   */
  value?: MaybeRef<number | Dayjs>;
  /**
   * @description Styles countdown values
   */
  valueStyle?: StyleValue;
}
