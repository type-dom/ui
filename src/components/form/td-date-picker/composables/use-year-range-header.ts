// import { computed } from 'vue'
// import type { Ref, ToRef } from 'vue'
import type { Dayjs } from 'dayjs';
import { ToRef, Ref, computed } from '@type-dom/signals';

export const useYearRangeHeader = ({
  unlinkPanels,
  leftDate,
  rightDate,
}: {
  unlinkPanels: ToRef<boolean>;
  leftDate: Ref<Dayjs>;
  rightDate: Ref<Dayjs>;
}) => {
  const leftPrevYear = () => {
    leftDate.set(leftDate.get().subtract(10, 'year'));
    if (!unlinkPanels.get()) {
      rightDate.set(rightDate.get().subtract(10, 'year'));
    }
  };

  const rightNextYear = () => {
    if (!unlinkPanels.get()) {
      leftDate.set(leftDate.get().add(10, 'year'));
    }
    rightDate.set(rightDate.get().add(10, 'year'));
  };

  const leftNextYear = () => {
    leftDate.set(leftDate.get().add(10, 'year'));
  };

  const rightPrevYear = () => {
    rightDate.set(rightDate.get().subtract(10, 'year'));
  };

  const leftLabel = computed(() => {
    const leftStartDate = Math.floor(leftDate.get().year() / 10) * 10;
    return `${leftStartDate}-${leftStartDate + 9}`;
  });

  const rightLabel = computed(() => {
    const rightStartDate = Math.floor(rightDate.get().year() / 10) * 10;
    return `${rightStartDate}-${rightStartDate + 9}`;
  });

  const leftYear = computed(() => {
    const leftEndDate = Math.floor(leftDate.get().year() / 10) * 10 + 9;
    return leftEndDate;
  });

  const rightYear = computed(() => {
    const rightStartDate = Math.floor(rightDate.get().year() / 10) * 10;
    return rightStartDate;
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
