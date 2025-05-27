import { isNumber, isString } from '@type-dom/utils';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { TabPaneName, TabsProps } from './td-tabs.interface';
import { TabsPaneContext } from './constants';

export const tabsProps: TabsProps = {
  tabPosition: 'top',
  beforeLeave: () => true,
};

const isPaneName = (value: unknown): value is string | number =>
  isString(value) || isNumber(value);

export const tabsEmits = {
  [UPDATE_MODEL_EVENT]: (name: TabPaneName) => isPaneName(name),
  tabClick: (_pane: TabsPaneContext, ev: Event) => ev instanceof Event,
  tabChange: (name: TabPaneName) => isPaneName(name),
  edit: (_paneName: TabPaneName | undefined, action: 'remove' | 'add') =>
    ['remove', 'add'].includes(action),
  tabRemove: (name: TabPaneName) => isPaneName(name),
  tabAdd: () => true,
};
