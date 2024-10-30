import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { ITdTabPaneConfig } from './td-tab-pane.interface';
import { TdTabs } from './td-tabs.class';

export interface ITdTabBar extends IUI {
  className: 'TdTabBar';
}

export interface ITdTabBarConfig extends IUIConfig {
  tabs?: ITdTabPaneConfig[];
  // type: definePropType<TabsPaneContext[]>(Array),
  // default: () => mutable([] as const),

  rootTabs?: TdTabs;
}
