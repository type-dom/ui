import { TabsPaneContext } from './constants';
import { TabPaneName } from './td-tabs.interface';

export const tabNavEmits = {
  tabClick: (_tab: TabsPaneContext, _tabName: TabPaneName, ev: Event) =>
    ev instanceof Event,
  tabRemove: (_tab: TabsPaneContext, ev: Event) => ev instanceof Event,
};
