import { IStyle } from '@type-dom/css-type';
import { ITypeDiv, TypeDivProps } from '@type-dom/framework';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { TabPaneProps } from '../td-tab-pane/td-tab-pane.interface';
import { TdTabPane } from '../td-tab-pane/td-tab-pane.class';

export interface ITdTabs extends ITypeDiv {
  className: 'TdTabs';
}

export interface TabsProps extends TypeDivProps {
  /**
   * @description type of Tab
   *     default: '',
   */
  type?: 'card' | 'border-card' | '';
  /**
   * @description whether Tab is closable
   */
  closable?: boolean;
  /**
   * @description whether Tab is addable
   */
  addable?: boolean;
  /**
   * @description binding value, name of the selected tab
   */
  modelValue?: string | number;
  /**
   * @description whether Tab is addable and closable
   */
  editable?: boolean;
  /**
   * @description position of tabs
   *     default: 'top',
   */
  tabPosition?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * @description hook function before switching tab. If `false` is returned or a `Promise` is returned and then is rejected, switching will be prevented
   *     default: () => true,
   */
  beforeLeave?: (
    newName: TabPaneName,
    oldName: TabPaneName | undefined
  ) => void | boolean;
  // type: definePropType<
  //   (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>
  // >(Function),
  /**
   * @description whether width of tab automatically fits its container
   */
  stretch?: boolean;

  contentStyle?: IStyle;

  slot?: TdTabPane[];
  slots?: {
    addIcon?: TdIcon;
  };
}

export type TabsPanes = Record<number, TabsPaneContext>;

export type TabPaneName = string | number;
export type TabsPaneContext = {
  uid: number;
  // slots: Slots
  config: TabsProps;
  paneName: TabPaneName;
  active: boolean;
  index: string | undefined;
  isClosable: boolean;
};

export interface ITabsRootContext {
  config: TabsProps;
  currentName: TabPaneName;
  registerPane: (pane: TabsPaneContext) => void;
  unregisterPane: (uid: number) => void;
}
