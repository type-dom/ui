import { TypeElement } from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';
import { Dayjs } from 'dayjs';
import { IUI, IUIConfig } from '../../../ui/ui.interface';

export interface ITdStatisticAbstract extends IUI {
  className: 'TdStatistic' | 'TdCountDown';
}

export interface ITdStatistic extends ITdStatisticAbstract {
  className: 'TdStatistic';
}

export interface ITdStatisticConfig extends IUIConfig {
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
  formatter?: (value: number | Dayjs) => string;
  /**
   * @description Numerical content
   *     default: 0,
   */
  value?: number | Dayjs;
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
  valueStyle?: IStyle;
  // type: definePropType<StyleValue>([String, Object, Array]),
  // },

  slots?: {
    prefix?: TypeElement;
    suffix?: TypeElement;
    title?: TypeElement;
    value?: TypeElement;
  };
}
