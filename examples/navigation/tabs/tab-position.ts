import { TextNode, TypeDiv } from '@type-dom/framework';
import { TdRadioGroup, TdTabPane, TdTabs } from '@type-dom/ui';

export class TabsTabPositionExample extends TypeDiv {
  className = 'TabsTabPositionExample';

  constructor() {
    super();
    this.addChild(new TdRadioGroup({
      modelValue: 'top',
      isButton: true,
      styleObj: {
        marginBottom: '30px',
      },
      options: [
        {
          label: 'top',
          value: 'top'
        },
        {
          label: 'right',
          value: 'right'
        },
        {
          label: 'bottom',
          value: 'bottom'
        },
        {
          label: 'left',
          value: 'left'
        },
      ],
    }));
    this.addChild(
      new TdTabs({
        type: 'border-card',
        tabPosition: 'top',
        modelValue: 1,
        styleObj: {
          height: 200,
        },
        contentStyle: {
          padding: '32px',
          color: '#6b778c',
          fontSize: '32px',
          fontWeight: 600,
        },
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
