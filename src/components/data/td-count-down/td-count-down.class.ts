import { cAF, isUndefined, rAF } from '@type-dom/utils';
import {
  defineExpose,
  onBeforeUnmount,
  onMounted,
  TypeFragment,
} from '@type-dom/framework';
import {
  Computed,
  computed,
  signal,
  unref,
  watch,
} from '@type-dom/signals';
import { CHANGE_EVENT } from '../../../constants/event';
import { TdStatistic } from '../td-statistic/td-statistic.class';
import { ITdCountDown, CountDownProps } from './td-count-down.interface';
import { formatTime, getTime } from './utils';
import { countdownEmits, countdownProps } from './td-count-down.const';

export class TdCountDown extends TypeFragment implements ITdCountDown {
  className: 'TdCountDown';
  override props: CountDownProps;
  displayValue?: Computed<string>;

  constructor(params: CountDownProps = {}) {
    super();
    this.className = 'TdCountDown';
    this.addEmits(countdownEmits);
    this.assignProps(countdownProps);
    this.props = this.useParams(params);
  }

  override setup() {
    // console.warn('TdCountDown setup . ');
    const props = this.props;
    const emit = this.emit;

    let timer: ReturnType<typeof rAF> | undefined;
    const rawValue = signal<number>(0);
    const displayValue = computed(() =>
      formatTime(rawValue.get(), props.format!)
    );

    const formatter: any = (val: number) => formatTime(val, props.format!);

    const stopTimer = () => {
      if (timer) {
        cAF(timer);
        timer = undefined;
      }
    };

    const startTimer = () => {
      const value = unref(props.value);
      if (isUndefined(value)) {
        return;
      }
      const timestamp = getTime(value);
      const frameFunc = () => {
        let diff = timestamp - Date.now();
        emit(CHANGE_EVENT, diff);
        if (diff <= 0) {
          diff = 0;
          stopTimer();
          emit('finish');
        } else {
          timer = rAF(frameFunc);
        }
        rawValue.set(diff);
      };
      timer = rAF(frameFunc);
    };

    onMounted(() => {
      const value = unref(props.value) as number;
      if (isUndefined(value)) {
        return;
      }
      rawValue.set(getTime(value - Date.now()));

      watch(
        () => [unref(props.value), props.format],
        () => {
          stopTimer();
          startTimer();
        },
        {
          immediate: true,
        }
      );
    });

    onBeforeUnmount(() => {
      stopTimer();
    });

    defineExpose({
      /**
       * @description current display value
       */
      displayValue,
    });

    this.addChild(
      new TdStatistic({
        value: rawValue,
        title: props.title,
        prefix: props.prefix,
        suffix: props.suffix,
        valueStyle: props.valueStyle,
        formatter,
        slots: props.slots,
      })
    );
  }
}
