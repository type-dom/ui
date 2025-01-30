import { TabsPaneContext } from './constants';
import { TabPaneName } from './td-tabs.interface';

export const tabNavEmits = {
  tabClick: (tab: TabsPaneContext, tabName: TabPaneName, ev: Event) =>
    ev instanceof Event,
  tabRemove: (tab: TabsPaneContext, ev: Event) => ev instanceof Event,
};
