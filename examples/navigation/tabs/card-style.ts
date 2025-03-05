import { TextNode, TypeDiv } from '@type-dom/framework';
import { TabPaneProps, TdTabPane, TdTabs } from '@type-dom/ui';

export class TabsCardStyleExample extends TypeDiv {
  className = 'TabsCardStyleExample';

  constructor() {
    super();
    this.addChild(
      new TdTabs({
        type: 'card',
        modelValue: 'first',
        contentStyle: {
          padding: '32px',
          color: '#6b778c',
          fontSize: '32px',
          fontWeight: 600,
        },
        emits: {
          tabClick: (tab: TabPaneProps, event: Event) => {
            console.log(tab, event)
          }
        },
        slot: [
          new TdTabPane({
            label: 'User',
            name: 'first',
            slot: new TextNode('User'),
          }),
          new TdTabPane({
            label: 'Config',
            name: 'second',
            slot: new TextNode('Config')
          }),
          new TdTabPane({
            label: 'Role',
            name: 'third',
            slot: new TextNode('Role')
          }),
          new TdTabPane({
            label: 'Task',
            name: 'fourth',
            slot: new TextNode('Task')
          }),
        ]
      })
    );
  }
}
