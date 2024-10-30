import { Dayjs } from 'dayjs';
import { cAF, rAF } from '@type-dom/utils';
import { TdStatisticAbstract } from '../td-statistic/td-statistic.abstract';
import { ITdStatisticConfig } from '../td-statistic/td-statistic.interface';
import { ITdCountDown, ITdCountDownConfig } from './td-count-down.interface';
import { formatTime, getTime } from './utils';

export class TdCountDown extends TdStatisticAbstract implements ITdCountDown {
  className: 'TdCountDown';
  private rawValue: number; // form value submit
  private timer?: ReturnType<typeof rAF> | undefined;
  override props: ITdCountDownConfig;

  constructor(params: ITdCountDownConfig = {}) {
    const format = params?.format || 'HH:mm:ss';
    params.formatter = (val: number | Dayjs) =>
      formatTime(val as number, format);
    // title,prefix,suffix 可以是 TypeElement元素；
    super(params);
    this.className = 'TdCountDown';
    this.rawValue = getTime(params?.value || 0) - Date.now();
    this.setNumber(this.rawValue);

    this.addChild(this.getSlotNode());
    this.props = this.useParams(params);
  }

  override mounted() {
    this.stopTimer();
    this.startTimer();
  }

  stopTimer() {
    if (this.timer) {
      cAF(this.timer);
      this.timer = undefined;
    }
  }

  startTimer() {
    console.log('this.props.value is ', this.props.value);
    const timestamp = getTime(this.props?.value || 0);
    const frameFunc = () => {
      let diff = timestamp - Date.now();
      // console.log('diff is ', diff);
      // emit('change', diff)
      this.setNumber(diff);
      if (diff <= 0) {
        diff = 0;
        this.stopTimer();
        // emit('finish')
      } else {
        this.timer = rAF(frameFunc);
      }
      this.rawValue = diff;
    };
    this.timer = rAF(frameFunc);
  }

  setNumber(value: number) {
    this.number.textNode?.setText(this.formatValue(value));
  }
}
