import {
  TypeElement,
  ITypeFragment,
  TypeFragmentProps,
} from '@type-dom/framework';

export interface ITdTabPane extends ITypeFragment {
  className: 'TdTabPane';
}

export interface TabPaneProps extends TypeFragmentProps {
  /**
   * @description title of the tab
   *     default: '',
   */
  label?: string;
  /**
   * @description identifier corresponding to the name of Tabs, representing the alias of the tab-pane, the default is ordinal number of the tab-pane in the sequence, e.g. the first tab-pane is '0'
   */
  name?: string | number;
  /**
   * @description whether Tab is closable
   */
  closable?: boolean;
  /**
   * @description whether Tab is disabled
   */
  disabled?: boolean;
  /**
   * @description whether Tab is lazily rendered
   */
  lazy?: boolean;

  slots?: {
    label?: TypeElement;
  };
}
