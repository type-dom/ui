import {
  TypeDiv,
  inject,
  TypeDivProps,
  nextTick,
  onMounted,
  LI,
  Fragment,
  Div,
  UL,
} from '@type-dom/framework';
import { computed, signal, Ref, unref, watch } from '@type-dom/signals';
import { debounce, getStyle, isNumber } from '@type-dom/utils';
import { ElArrowDownSvg, ElArrowUpSvg } from '@type-dom/svgs';
import { useNamespace } from '../../../../hooks/use-namespace';
import { TdScrollbar } from '../../../basic/td-scrollbar/td-scrollbar.class';
import {
  BasicTimeSpinnerProps,
  basicTimeSpinnerProps,
} from '../props/basic-time-spinner';
import { getTimeLists } from '../composables/use-time-picker';
import { TimeUnit, timeUnits } from '../constants';
import { buildTimeList, TimeList } from '../utils';
import { TdIcon } from '../../../basic/td-icon/td-icon.class';

export class BasicTimeSpinner extends TypeDiv {
  className: 'BasicTimeSpinner';
  override props: BasicTimeSpinnerProps & TypeDivProps;

  constructor(params: BasicTimeSpinnerProps = {}) {
    super();
    this.className = 'BasicTimeSpinner';

    this.assignProps(basicTimeSpinnerProps);
    this.props = this.useParams(params) as BasicTimeSpinnerProps & TypeDivProps;
  }

  override setup() {
    const props = this.props;
    const pickerBase = inject('EP_PICKER_BASE') as any;
    const { isRange } = pickerBase.props;
    // const emit = defineEmits(['change', 'select-range', 'set-option'])
    const emit = this.emit;

    const ns = useNamespace('time');

    const { getHoursList, getMinutesList, getSecondsList } = getTimeLists(
      props.disabledHours,
      props.disabledMinutes,
      props.disabledSeconds
    );

    // data
    let isScrolling = false;

    const currentScrollbar = signal<TimeUnit>();
    const listHoursRef = signal<TdScrollbar>();
    const listMinutesRef = signal<TdScrollbar>();
    const listSecondsRef = signal<TdScrollbar>();
    const listRefsMap: Record<TimeUnit, Ref<TdScrollbar | undefined>> = {
      hours: listHoursRef,
      minutes: listMinutesRef,
      seconds: listSecondsRef,
    };

    // computed
    const spinnerItems = computed(() => {
      return props.showSeconds ? timeUnits : timeUnits.slice(0, 2);
    });

    const timePartials = computed<Record<TimeUnit, number> | undefined>(() => {
      const { spinnerDate } = props;
      if (!spinnerDate) return;
      const hours = spinnerDate.hour()!;
      const minutes = spinnerDate.minute()!;
      const seconds = spinnerDate.second()!;
      return { hours, minutes, seconds };
    });

    const timeList = computed(() => {
      const { hours, minutes } = unref(timePartials)!;
      const { role, spinnerDate } = props;
      const compare = !isRange ? spinnerDate : undefined;
      return {
        hours: getHoursList(role!, compare),
        minutes: getMinutesList(hours, role!, compare),
        seconds: getSecondsList(hours, minutes, role!, compare),
      };
    });

    const arrowControlTimeList = computed<Record<TimeUnit, TimeList>>(() => {
      const { hours, minutes, seconds } = unref(timePartials)!;

      return {
        hours: buildTimeList(hours, 23),
        minutes: buildTimeList(minutes, 59),
        seconds: buildTimeList(seconds, 59),
      };
    });

    const debouncedResetScroll = debounce((type) => {
      isScrolling = false;
      adjustCurrentSpinner(type);
    }, 200);

    const getAmPmFlag = (hour: number) => {
      const shouldShowAmPm = !!props.amPmMode;
      if (!shouldShowAmPm) return '';
      const isCapital = props.amPmMode === 'A';
      // todo locale
      let content = hour < 12 ? ' am' : ' pm';
      if (isCapital) content = content.toUpperCase();
      return content;
    };

    const emitSelectRange = (type: TimeUnit) => {
      let range;

      switch (type) {
        case 'hours':
          range = [0, 2];
          break;
        case 'minutes':
          range = [3, 5];
          break;
        case 'seconds':
          range = [6, 8];
          break;
      }
      const [left, right] = range;

      emit('select-range', left, right);
      currentScrollbar.set(type);
    };

    const adjustCurrentSpinner = (type: TimeUnit) => {
      adjustSpinner(type, unref(timePartials)![type]);
    };

    const adjustSpinners = () => {
      adjustCurrentSpinner('hours');
      adjustCurrentSpinner('minutes');
      adjustCurrentSpinner('seconds');
    };

    const getScrollbarElement = (el: HTMLElement) =>
      el.querySelector(`.${ns.namespace.get()}-scrollbar__wrap`) as HTMLElement;

    const adjustSpinner = (type: TimeUnit, value: number) => {
      if (props.arrowControl) return;
      const scrollbar = unref(listRefsMap[type]);
      if (scrollbar && scrollbar.dom) {
        getScrollbarElement(scrollbar.dom).scrollTop = Math.max(
          0,
          value * typeItemHeight(type)
        );
      }
    };

    const typeItemHeight = (type: TimeUnit): number => {
      const scrollbar = unref(listRefsMap[type]);
      const listItem = scrollbar?.dom?.querySelector('li');
      if (listItem) {
        return Number.parseFloat(getStyle(listItem, 'height')) || 0;
      }
      return 0;
    };

    // const onIncrement = () => {
    //   scrollDown(1);
    // };
    //
    // const onDecrement = () => {
    //   scrollDown(-1);
    // };

    const scrollDown = (step: number) => {
      if (!currentScrollbar.get()) {
        emitSelectRange('hours');
      }

      const label = currentScrollbar.get()!;
      const now = unref(timePartials)![label];
      const total = currentScrollbar.get() === 'hours' ? 24 : 60;
      const next = findNextUnDisabled(label, now, step, total);

      modifyDateField(label, next);
      adjustSpinner(label, next);
      nextTick(() => emitSelectRange(label));
    };

    const findNextUnDisabled = (
      type: TimeUnit,
      now: number,
      step: number,
      total: number
    ) => {
      let next = (now + step + total) % total;
      const list = unref(timeList)![type];
      while (list[next] && next !== now) {
        next = (next + step + total) % total;
      }
      return next;
    };

    const modifyDateField = (type: TimeUnit, value: number) => {
      const list = unref(timeList)![type];
      const isDisabled = list[value];
      if (isDisabled) return;

      const { hours, minutes, seconds } = unref(timePartials)!;

      let changeTo;
      switch (type) {
        case 'hours':
          changeTo = props.spinnerDate
            ?.hour(value)
            .minute(minutes)
            .second(seconds);
          break;
        case 'minutes':
          changeTo = props.spinnerDate
            ?.hour(hours)
            .minute(value)
            .second(seconds);
          break;
        case 'seconds':
          changeTo = props.spinnerDate
            ?.hour(hours)
            .minute(minutes)
            .second(value);
          break;
      }
      emit('change', changeTo);
    };

    const handleClick = (
      type: TimeUnit,
      { value, disabled }: { value: number; disabled: boolean }
    ) => {
      if (!disabled) {
        modifyDateField(type, value);
        emitSelectRange(type);
        adjustSpinner(type, value);
      }
    };

    const handleScroll = (type: TimeUnit) => {
      const scrollbar = unref(listRefsMap[type]);
      if (!scrollbar) return;

      isScrolling = true;
      debouncedResetScroll(type);
      const value = Math.min(
        Math.round(
          (getScrollbarElement(scrollbar.dom!).scrollTop -
            (scrollBarHeight(type!)! * 0.5 - 10) / typeItemHeight(type) +
            3) /
            typeItemHeight(type)
        ),
        type === 'hours' ? 23 : 59
      );
      modifyDateField(type, value);
    };

    const scrollBarHeight = (type: TimeUnit) => {
      return unref(listRefsMap[type])!.dom?.offsetHeight;
    };

    const bindScrollEvent = () => {
      const bindFunction = (type: TimeUnit) => {
        const scrollbar = unref(listRefsMap[type]);
        if (scrollbar && scrollbar.dom) {
          getScrollbarElement(scrollbar.dom).onscroll = () => {
            // TODO: scroll is emitted when set scrollTop programmatically
            // should find better solutions in the future!
            handleScroll(type);
          };
        }
      };
      bindFunction('hours');
      bindFunction('minutes');
      bindFunction('seconds');
    };

    onMounted(() => {
      nextTick(() => {
        if (!props.arrowControl) bindScrollEvent();
        adjustSpinners();
        // set selection on the first hour part
        if (props.role === 'start') emitSelectRange('hours');
      });
    });

    // const setRef = (scrollbar: TdScrollbar | null, type: TimeUnit) => {
    //   listRefsMap[type].set(scrollbar ?? undefined);
    // };

    emit('set-option', [`${props.role}_scrollDown`, scrollDown]);
    emit('set-option', [`${props.role}_emitSelectRange`, emitSelectRange]);

    watch(
      () => props.spinnerDate,
      () => {
        if (isScrolling) return;
        adjustSpinners();
      }
    );

    this.assignProps({
      // todo
      class: computed(() => [
        ns.b('spinner'),
        { 'has-seconds': props.showSeconds },
      ]),
    });
    if (!props.arrowControl) {
      for (const item of spinnerItems!.get()!) {
        this.addChild(
          new TdScrollbar({
            // ref: (scrollbar: unknown) => setRef(scrollbar as any, item), // todo
            class: ns.be('spinner', 'wrapper'),
            wrapStyle: { maxHeight: 'inherit' },
            // viewStyle: ns.be('spinner', 'list'), // todo
            noresize: true,
            tag: 'ul',
            events: {
              mouseenter: () => emitSelectRange(item),
              mousemove: () => adjustCurrentSpinner(item),
            },
            slot: timeList.get()?.[item].map((disabled, key) => {
              return new LI({
                class: [
                  ns.be('spinner', 'item'),
                  ns.is('active', key === timePartials.get()?.[item]),
                  ns.is('disabled', disabled),
                ],
                events: {
                  click: () => handleClick(item, { value: key, disabled }),
                },
                slot: new Fragment({
                  vIf: item === 'hours',
                  slot:
                    ('0' + (props.amPmMode ? key % 12 || 12 : key)).slice(-2) +
                    getAmPmFlag(key),
                }),
              });
            }),
          })
        );
      }
    } else {
      for (const item of spinnerItems.get()!) {
        // 这样就没有双向绑定的效果了
        this.addChild(
          new Div({
            class: [ns.be('spinner', 'wrapper'), ns.is('arrow')],
            events: {
              mouseenter: () => emitSelectRange(item),
            },
            slot: [
              new TdIcon({
                // vRepeatClick: onDecrement, // todo
                class: ['arrow-up', ns.be('spinner', 'arrow')],
                slot: new ElArrowUpSvg(),
              }),
              new TdIcon({
                // vRepeatClick: onIncrement, // todo
                class: ['arrow-down', ns.be('spinner', 'arrow')],
                slot: new ElArrowDownSvg(),
              }),
              new UL({
                class: ns.be('spinner', 'list'),
                slot: arrowControlTimeList.get()?.[item].map((time, key) => {
                  return new LI({
                    class: [
                      ns.be('spinner', 'item'),
                      ns.is('active', key === timePartials.get()?.[item]),
                      ns.is('disabled', timeList.get()?.[item][time!]),
                    ],
                    slot: new Fragment({
                      vIf: isNumber(item),
                      slot: [
                        new Fragment({
                          vIf: item === 'hours',
                          slot:
                            (
                              '0' + (props.amPmMode ? time! % 12 || 12 : time)
                            ).slice(-2) + getAmPmFlag(time!),
                        }),
                        new Fragment({
                          vIf: item !== 'hours',
                          slot: ('0' + time).slice(-2),
                        }),
                      ],
                    }),
                  });
                }),
              }),
            ],
          })
        );
      }
    }
  }
}
