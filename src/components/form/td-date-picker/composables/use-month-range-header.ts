// import { computed } from 'vue'
// import { useLocale } from '@element-plus/hooks'
// import type { Ref, ToRef } from 'vue'
import type { Dayjs } from 'dayjs';
import { ToRef, Ref, computed } from '@type-dom/signals';
import { useLocale } from '../../../../hooks/use-locale';

export const useMonthRangeHeader = ({
  unlinkPanels,
  leftDate,
  rightDate,
}: {
  unlinkPanels: ToRef<boolean>;
  leftDate: Ref<Dayjs>;
  rightDate: Ref<Dayjs>;
}) => {
  const { t } = useLocale();
  const leftPrevYear = () => {
    leftDate.set(leftDate.get().subtract(1, 'year'));
    if (!unlinkPanels.get()) {
      rightDate.set(rightDate.get().subtract(1, 'year'));
    }
  };

  const rightNextYear = () => {
    if (!unlinkPanels.get()) {
      leftDate.set(leftDate.get().add(1, 'year'));
    }
    rightDate.set(rightDate.get().add(1, 'year'));
  };

  const leftNextYear = () => {
    leftDate.set(leftDate.get().add(1, 'year'));
  };

  const rightPrevYear = () => {
    rightDate.set(rightDate.get().subtract(1, 'year'));
  };
  const leftLabel = computed(() => {
    return `${leftDate.get().year()} ${t('el.datepicker.year')}`;
  });

  const rightLabel = computed(() => {
    return `${rightDate.get().year()} ${t('el.datepicker.year')}`;
  });

  const leftYear = computed(() => {
    return leftDate.get().year();
  });

  const rightYear = computed(() => {
    return rightDate.get().year() === leftDate.get().year()
      ? leftDate.get().year() + 1
      : rightDate.get().year();
  });

  return {
    leftPrevYear,
    rightNextYear,
    leftNextYear,
    rightPrevYear,
    leftLabel,
    rightLabel,
    leftYear,
    rightYear,
  };
};
