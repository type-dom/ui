import {
  ITdStatisticAbstract,
  ITdStatisticConfig
} from '../td-statistic/td-statistic.interface';

export interface ITdCountDown extends ITdStatisticAbstract {
  className: 'TdCountDown';
}

export interface ITdCountDownConfig extends ITdStatisticConfig {
  /**
   * @description Formatting the countdown display
   *     default: 'HH:mm:ss',
   */
  format?: string;
  /**
   * @description Sets the prefix of a countdown
   */
  // prefix?: string,
  // /**
  //  * @description Sets the suffix of a countdown
  //  */
  // suffix?: string,
  // /**
  //  * @description countdown titles
  //  */
  // title?: string,
  // /**
  //  * @description target time
  //  *     default: 0,
  //  */
  // value?: number; // | Dayjs;
  // /**
  //  * @description Styles countdown values
  //  */
  // valueStyle?: Partial<IStyle>;
}
