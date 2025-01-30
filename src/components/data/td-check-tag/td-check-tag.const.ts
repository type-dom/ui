import { isBoolean } from '@type-dom/utils';
import { CHANGE_EVENT } from '../../../constants/event';
import { CheckTagProps } from './td-check-tag.interface';

export const checkTagProps: CheckTagProps = {
  type: 'primary',
};

export const checkTagEmits = {
  'update:checked': (value: boolean) => isBoolean(value),
  [CHANGE_EVENT]: (value: boolean) => isBoolean(value),
};
