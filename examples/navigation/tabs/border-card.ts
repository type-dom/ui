import { TextNode, TypeDiv } from '@type-dom/framework';
import { TdTabPane, TdTabs } from '@type-dom/ui';

export class TabsBorderCardExample extends TypeDiv {
  className = 'TabsBorderCardExample';

  constructor() {
    super();
    this.addChild(
      new TdTabs({
        type: 'border-card',
        modelValue: 1,
        slot: [
          new TdTabPane({
            label: 'User',
            slot: new TextNode('User')
          }),
          new TdTabPane({
            label: 'Config',
            slot: new TextNode('Config')
          }),
          new TdTabPane({
            label: 'Role',
            slot: new TextNode('Role')
          }),
          new TdTabPane({
            label: 'Task',
            slot: new TextNode('Task')
          }),
        ]
      })
    );
  }
}
