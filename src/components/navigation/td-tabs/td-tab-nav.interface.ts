import { ITypeDiv, TypeDivProps } from '@type-dom/framework';
// import { TabPaneProps } from '../td-tab-pane/td-tab-pane.interface';
import { TdTabs } from './td-tabs.class';
import { TabPaneName } from './td-tabs.interface';
import { TabsPaneContext } from './constants';

export interface ITdTabNav extends ITypeDiv {
  className: 'TdTabNav';
}

export interface TabNavProps extends TypeDivProps {
  rootTabs?: TdTabs;
  panes?: TabsPaneContext[];
  //   type: definePropType<TabsPaneContext[]>(Array),
  //   default: () => mutable([] as const),
  currentName?: string | number; // default: '',
  editable?: boolean;
  type?: 'card' | 'border-card' | ''; // default: '',
  stretch?: boolean;

  emits?: {
    tabClick?: (
      tab: TabsPaneContext,
      tabName: TabPaneName,
      event: Event
    ) => void;
    tabRemove?: (tab: TabsPaneContext, evt: Event) => void;
  };
}

export interface Scrollable {
  next?: boolean;
  prev?: number;
}
