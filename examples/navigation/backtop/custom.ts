import { Div, TextNode, TypeDiv } from '@type-dom/framework';
import { $bgColor, $boxShadow, TdBackTop } from '@type-dom/ui';

export class BackTopCustomExample extends TypeDiv {
  className = 'BackTopCustomExample';

  constructor() {
    super();
    this.addChildren(
      new TextNode('Scroll down to see the bottom-right button.'),
      new TdBackTop({
        bottom: 100,
        slot: new Div({
          slot: 'UP',
          styleObj: {
            height: '100%',
            width: '100%',
            // background-color: var(--el-bg-color-overlay),
            backgroundColor: $bgColor.overlay,
            // box-shadow: var(--el-box-shadow-lighter),
            boxShadow: $boxShadow.lighter,
            textAlign: 'center',
            lineHeight: '40px',
            color: '#1989fa'
          }
        })
      })
    );
  }
}
