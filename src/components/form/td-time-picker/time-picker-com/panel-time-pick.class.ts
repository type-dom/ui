import { inject, TypeFragmentProps, TypeFragment } from '@type-dom/framework';
import dayjs, { Dayjs } from 'dayjs';
import { computed, signal } from '@type-dom/signals';
// import { isUndefined } from '@type-dom/utils';
import { EVENT_CODE } from '../../../../constants/aria';
// import { useNamespace } from '../../../../hooks/use-namespace';
import { useLocale } from '../../../../hooks/use-locale';
import { useTimePanel } from '../composables/use-time-panel';
import { PanelTimePickerProps } from '../props/panel-time-picker';
import {
  buildAvailableTimeSlotGetter,
  // useOldValue,
} from '../composables/use-time-picker';

export class PanelTimePick extends TypeFragment {
  className: 'PanelTimePick';
  override props: PanelTimePickerProps & TypeFragmentProps;

  constructor(params: PanelTimePickerProps = {}) {
    super();
    this.className = 'PanelTimePick';

    // this.assignProps(panelTimePickerProps);
    this.props = this.useParams(params) as PanelTimePickerProps &
      TypeFragmentProps;
  }

  override setup() {
    const props = this.props;
    const emit = this.emit; // defineEmits(['pick', 'select-range', 'set-picker-option'])

    // Injections
    const pickerBase = inject('EP_PICKER_BASE') as any;
    const {
      // arrowControl,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      defaultValue,
    } = pickerBase.props;
    const { getAvailableHours, getAvailableMinutes, getAvailableSeconds } =
      buildAvailableTimeSlotGetter(
        disabledHours,
        disabledMinutes,
        disabledSeconds
      );

    // const ns = useNamespace('time');
    const { lang } = useLocale();
    // data
    const selectionRange = signal([0, 2]);
    // const oldValue = useOldValue(props);
    // computed
    // const transitionName = computed(() => {
    //   return isUndefined(props.actualVisible)
    //     ? `${ns.namespace.get()}-zoom-in-top`
    //     : '';
    // });
    const showSeconds = computed(() => {
      return props.format?.includes('ss');
    });
    // const amPmMode = computed(() => {
    //   if (props.format?.includes('A')) return 'A';
    //   if (props.format?.includes('a')) return 'a';
    //   return '';
    // });
    // method
    const isValidValue = (_date: Dayjs) => {
      const parsedDate = dayjs(_date).locale(lang.get());
      const result = getRangeAvailableTime(parsedDate);
      return parsedDate.isSame(result);
    };
    // const handleCancel = () => {
    //   emit('pick', oldValue.get(), false);
    // };
    // const handleConfirm = (visible = false, first = false) => {
    //   if (first) return;
    //   emit('pick', props.parsedValue, visible);
    // };
    // const handleChange = (_date: Dayjs) => {
    //   // visible avoids edge cases, when use scrolls during panel closing animation
    //   if (!props.visible) {
    //     return;
    //   }
    //   const result = getRangeAvailableTime(_date).millisecond(0);
    //   emit('pick', result, true);
    // };

    // const setSelectionRange = (start: number, end: number) => {
    //   emit('select-range', start, end);
    //   selectionRange.set([start, end]);
    // };

    const changeSelectionRange = (step: number) => {
      const list = [0, 3].concat(showSeconds.get() ? [6] : []);
      const mapping = ['hours', 'minutes'].concat(
        showSeconds.get() ? ['seconds'] : []
      );
      const index = list.indexOf(selectionRange.get()[0]);
      const next = (index + step + list.length) % list.length;
      timePickerOptions['start_emitSelectRange'](mapping[next]);
    };

    const handleKeydown = (event: KeyboardEvent) => {
      const code = event.code;

      const { left, right, up, down } = EVENT_CODE;

      if ([left, right].includes(code)) {
        const step = code === left ? -1 : 1;
        changeSelectionRange(step);
        event.preventDefault();
        return;
      }

      if ([up, down].includes(code)) {
        const step = code === up ? -1 : 1;
        timePickerOptions['start_scrollDown'](step);
        event.preventDefault();
        return;
      }
    };

    const { timePickerOptions, getAvailableTime } = useTimePanel({
      getAvailableHours,
      getAvailableMinutes,
      getAvailableSeconds,
    });

    const getRangeAvailableTime = (date: Dayjs) => {
      return getAvailableTime(date, props.datetimeRole || '', true);
    };

    const parseUserInput = (value: Dayjs) => {
      if (!value) return null;
      return dayjs(value, props.format).locale(lang.get());
    };

    const formatToString = (value: Dayjs) => {
      if (!value) return null;
      return value.format(props.format);
    };

    const getDefaultValue = () => {
      return dayjs(defaultValue).locale(lang.get());
    };

    emit('set-picker-option', ['isValidValue', isValidValue]);
    emit('set-picker-option', ['formatToString', formatToString]);
    emit('set-picker-option', ['parseUserInput', parseUserInput]);
    emit('set-picker-option', ['handleKeydownInput', handleKeydown]);
    emit('set-picker-option', ['getRangeAvailableTime', getRangeAvailableTime]);
    emit('set-picker-option', ['getDefaultValue', getDefaultValue]);
  }
}
