import { TextNode, TypeDiv } from '@type-dom/framework';
import { TabPaneName, TdTabPane, TdTabs } from '@type-dom/ui';

export class TabsDynamicTabsExample extends TypeDiv {
  className = 'TabsDynamicTabsExample';
  tabIndex: number;
  private editableTabs: {
    name: string;
    title: string;
    content: string;
  }[];
  private editableTabsValue: string;

  constructor() {
    super();
    this.tabIndex = 2;
    this.editableTabs = [
      {
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content',
      },
      {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content',
      },
    ];
    this.editableTabsValue = '1';
    const tabPanes: TdTabPane[] = [];
    for (const item of this.editableTabs) {
      const tabPane = new TdTabPane({
        label: item.title,
        name: item.name,
        slot: new TextNode(item.content),
      });
      tabPanes.push(tabPane);
    }
    this.addChild(
      new TdTabs({
        modelValue: '1',
        type: 'card',
        editable: true,
        emits: {
          edit: this.handleTabsEdit,
        },
        contentStyle: {
          padding: '32px',
          color: '#6b778c',
          fontSize: '32px',
          fontWeight: 600,
        },
        slot: tabPanes,
      })
    );
  }

  handleTabsEdit = (
    targetName: TabPaneName | undefined,
    action: 'remove' | 'add'
  ) => {
    console.log('handleTabsEdit . ');
    if (action === 'add') {
      const newTabName = `${++this.tabIndex}`;
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content',
      });
      this.editableTabsValue = newTabName;
    } else if (action === 'remove') {
      const tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
    }
  };
}
