import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { ITdTabPaneConfig } from './td-tab-pane.interface';
import { TdTabs } from './td-tabs.class';
import { ITabPaneName } from './td-tabs.interface';

export interface ITdTabNav extends IUI {
  className: 'TdTabNav'
}

export interface ITdTabNavConfig extends IUIConfig {
  rootTabs?: TdTabs;
  panes?: ITdTabPaneConfig[];
  //   type: definePropType<TabsPaneContext[]>(Array),
  //   default: () => mutable([] as const),
  currentName?: string | number;  // default: '',
  editable?: boolean,
  type?: 'card' | 'border-card' | '', // default: '',
  stretch?: boolean,

  emits?: {
    tabClick?: (tab: ITdTabPaneConfig, tabName: ITabPaneName, event: Event) => void;
    tabRemove?: (tab: ITdTabPaneConfig, evt: Event) => void;
  }
}

export interface IScrollable {
  next?: boolean
  prev?: number
}
