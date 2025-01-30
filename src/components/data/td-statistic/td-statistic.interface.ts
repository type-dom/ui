import {
  ISlotRaw,
  ITypeDiv,
  StyleValue,
  TypeDivProps,
} from '@type-dom/framework';
import { Computed, MaybeRef, Signal } from '@type-dom/signals';
import { Dayjs } from 'dayjs';

export interface ITdStatistic extends ITypeDiv {
  className: 'TdStatistic';
}

export interface StatisticProps extends TypeDivProps {
  /**
   * @description Setting the decimal point
   *     default: '.',
   */
  decimalSeparator?: string;
  /**
   * @description Sets the thousandth identifier
   *     default: ',',
   */
  groupSeparator?: string;
  /**
   * @description numerical precision
   *     default: 0,
   */
  precision?: number;
  /**
   * @description Custom numerical presentation
   */
  formatter?: (value?: MaybeRef<number | number[] | string | Dayjs>) => string;
  /**
   * @description Numerical content
   *     default: 0,
   */
  value?: MaybeRef<number | Dayjs>;
  //   type: definePropType<number | Dayjs>([Number, Object]),
  // },
  /**
   * @description Sets the prefix of a number
   */
  prefix?: string;

  /**
   * @description  Sets the suffix of a number
   */
  suffix?: string;
  /**
   * @description Numeric titles
   */
  title?: string;
  /**
   * @description Styles numeric values
   */
  valueStyle?: StyleValue;
  // type: definePropType<StyleValue>([String, Object, Array]),
  // },

  slots?: {
    prefix?: ISlotRaw;
    suffix?: ISlotRaw;
    title?: ISlotRaw;
    value?: ISlotRaw;
  };
}
