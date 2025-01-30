// import { computed, ref } from 'vue'
// import { debugWarn, ensureArray } from '@element-plus/utils'
// import type { Arrayable } from '@element-plus/utils'
// import type { FormItemContext } from './types'
// import type { FormItemProp } from './form-item'

import { computed, signal } from '@type-dom/signals';
import { debugWarn } from '@type-dom/utils';
import { Arrayable } from '@type-dom/framework';
import { ensureArray } from '../../../../../utils/src/ui/arrays';
import { FormItemProp } from '../td-form-item/td-form-item.interface';
import { FormItemContext } from './td-form.interface';

const SCOPE = 'TdForm';

export function useFormLabelWidth() {
  const potentialLabelWidthArr = signal<number[]>([]);

  const autoLabelWidth = computed(() => {
    if (!potentialLabelWidthArr.get().length) return '0';
    const max = Math.max(...potentialLabelWidthArr.get());
    return max ? `${max}px` : '';
  });

  function getLabelWidthIndex(width: number) {
    const index = potentialLabelWidthArr.get().indexOf(width);
    if (index === -1 && autoLabelWidth.get() === '0') {
      debugWarn(SCOPE, `unexpected width ${width}`);
    }
    return index;
  }

  function registerLabelWidth(val: number, oldVal?: number) {
    if (val && oldVal) {
      const index = getLabelWidthIndex(oldVal);
      potentialLabelWidthArr.get().splice(index, 1, val);
    } else if (val) {
      potentialLabelWidthArr.get().push(val);
    }
  }

  function deregisterLabelWidth(val: number) {
    const index = getLabelWidthIndex(val);
    if (index > -1) {
      potentialLabelWidthArr.get().splice(index, 1);
    }
  }

  return {
    autoLabelWidth,
    registerLabelWidth,
    deregisterLabelWidth,
  };
}

export const filterFields = (
  fields: FormItemContext[],
  props: Arrayable<FormItemProp>
) => {
  const normalized = ensureArray(props);
  return normalized.length > 0
    ? fields.filter((field) => field.prop && normalized.includes(field.prop))
    : fields;
};
