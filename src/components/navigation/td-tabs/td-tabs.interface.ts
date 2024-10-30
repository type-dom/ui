import { isNumber, isString } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';
import { IUI, IUIConfig } from '../../../ui/ui.interface';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { ITdTabPaneConfig } from './td-tab-pane.interface';
import { TdTabPane } from './td-tab-pane.class';

export interface ITdTabs extends IUI {
  className: 'TdTabs';
}

const isPaneName = (value: unknown): value is string | number =>
  isString(value) || isNumber(value);

export interface ITdTabsConfig extends IUIConfig {
  /**
   * @description type of Tab
   *     default: '',
   */
  type?: 'card' | 'border-card' | '';
  /**
   * @description whether Tab is closable
   */
  closable?: boolean,
  /**
   * @description whether Tab is addable
   */
  addable?: boolean,
  /**
   * @description binding value, name of the selected tab
   */
  modelValue?: string | number;
  /**
   * @description whether Tab is addable and closable
   */
  editable?: boolean,
  /**
   * @description position of tabs
   *     default: 'top',
   */
  tabPosition?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * @description hook function before switching tab. If `false` is returned or a `Promise` is returned and then is rejected, switching will be prevented
   *     default: () => true,
   */
  beforeLeave?: (newName: ITabPaneName, oldName: ITabPaneName | undefined) => void | boolean;
  // type: definePropType<
  //   (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>
  // >(Function),
  /**
   * @description whether width of tab automatically fits its container
   */
  stretch?: boolean,

  contentStyle?: IStyle;
  emits?: {
    [UPDATE_MODEL_EVENT]?: (name: ITabPaneName) => void;
    tabClick?: (pane: ITdTabPaneConfig, ev: Event) => void;
    tabChange?: (name: ITabPaneName) => void;
    edit?: (paneName: ITabPaneName | undefined, action: 'remove' | 'add') =>
      void;
    tabRemove?: (name: ITabPaneName) => void;
    tabAdd?: () => true,
  }
  slot?: TdTabPane[];
  slots?: {
    addIcon?: TdIcon;
  }
}

export type ITabPaneName = string | number;
export type ITabsPaneContext = {
  uid: number
  // slots: Slots
  config: ITdTabsConfig;
  paneName: ITabPaneName;
  active: boolean;
  index: string | undefined;
  isClosable: boolean;
}

export interface ITabsRootContext {
  config: ITdTabsConfig;
  currentName: ITabPaneName;
  registerPane: (pane: ITabsPaneContext) => void;
  unregisterPane: (uid: number) => void;
}

