// import { getCurrentInstance, inject, ref, unref, watch } from 'vue'
// import { isArray } from '@element-plus/utils'
// import { useLocale, useNamespace } from '@element-plus/hooks'

// import type { Ref } from 'vue'
import type { Dayjs } from 'dayjs';
import { signal, unref, watch, Ref } from '@type-dom/signals';
import { isArray } from '@type-dom/utils';
import { getCurrentInstance, inject } from '@type-dom/framework';
import { useNamespace } from '../../../../hooks/use-namespace';
import { useLocale } from '../../../../hooks/use-locale';
import type { PanelRangeSharedProps, RangeState } from '../props/shared';
import type { DefaultValue } from '../utils';
import { getDefaultValue, isValidRange } from '../utils';
import { ROOT_PICKER_INJECTION_KEY } from '../constants';
import { useShortcut } from './use-shortcut';

type UseRangePickerProps = {
  onParsedValueChanged: (
    minDate: Dayjs | undefined,
    maxDate: Dayjs | undefined
  ) => void;
  defaultValue: Ref<DefaultValue>;
  leftDate: Ref<Dayjs>;
  rightDate: Ref<Dayjs>;
  unit: 'month' | 'year';
};

export const useRangePicker = (
  props: PanelRangeSharedProps,
  {
    defaultValue,
    leftDate,
    rightDate,
    unit,

    onParsedValueChanged,
  }: UseRangePickerProps
) => {
  const { emit } = getCurrentInstance()!;

  const { pickerNs } = inject(ROOT_PICKER_INJECTION_KEY)!;
  const drpNs = useNamespace('date-range-picker');
  const { t, lang } = useLocale();
  const handleShortcutClick = useShortcut(lang);
  const minDate = signal<Dayjs | undefined>();
  const maxDate = signal<Dayjs | undefined>();
  const rangeState = signal<RangeState>({
    endDate: null,
    selecting: false,
  });

  const handleChangeRange = (val: RangeState) => {
    rangeState.set(val);
  };

  const handleRangeConfirm = (visible = false) => {
    const _minDate = unref(minDate);
    const _maxDate = unref(maxDate);

    if (isValidRange([_minDate, _maxDate])) {
      emit('pick', [_minDate, _maxDate], visible);
    }
  };

  const onSelect = (selecting: boolean) => {
    rangeState.get().selecting = selecting;
    if (!selecting) {
      rangeState.get().endDate = null;
    }
  };

  const onReset = (parsedValue: PanelRangeSharedProps['parsedValue']) => {
    if (isArray(parsedValue) && parsedValue.length === 2) {
      const [start, end] = parsedValue;
      minDate.set(start);
      leftDate.set(start);
      maxDate.set(end);
      onParsedValueChanged(unref(minDate), unref(maxDate));
    } else {
      restoreDefault();
    }
  };

  const restoreDefault = () => {
    const [start, end] = getDefaultValue(unref(defaultValue), {
      lang: unref(lang),
      unit,
      unlinkPanels: props.unlinkPanels!,
    });
    minDate.set(undefined);
    maxDate.set(undefined);
    leftDate.set(start);
    rightDate.set(end);
  };

  watch(
    () => defaultValue.get(),
    (val) => {
      if (val) {
        restoreDefault();
      }
    },
    { immediate: true }
  );

  watch(() => props.parsedValue, onReset, { immediate: true });

  return {
    minDate,
    maxDate,
    rangeState,
    lang,
    ppNs: pickerNs,
    drpNs,

    handleChangeRange,
    handleRangeConfirm,
    handleShortcutClick,
    onSelect,
    onReset,
    t,
  };
};
