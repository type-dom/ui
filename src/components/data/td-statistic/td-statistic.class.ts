import { TdStatisticAbstract } from './td-statistic.abstract';
import type {
  ITdStatistic,
  ITdStatisticConfig
} from './td-statistic.interface';

export class TdStatistic extends TdStatisticAbstract implements ITdStatistic {
  className: 'TdStatistic';

  constructor(params: ITdStatisticConfig) {
    super(params);
    this.className = 'TdStatistic';
    // console.warn('TdStatistic constructor . ');
  }
}
