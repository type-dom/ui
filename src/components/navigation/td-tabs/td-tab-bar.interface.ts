import { ITypeDiv, TypeDivProps } from '@type-dom/framework';

import { TabsPaneContext } from './constants';

export interface ITdTabBar extends ITypeDiv {
  className: 'TdTabBar';
}

export interface TabBarProps extends TypeDivProps {
  tabs?: TabsPaneContext[];
  // type: definePropType<TabsPaneContext[]>(Array),
  // default: () => mutable([] as const),

  // rootTabs?: TdTabs;
}
