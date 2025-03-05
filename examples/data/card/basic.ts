import { Div, P, Span, TypeDiv } from '@type-dom/framework';
import { TdCard } from '@type-dom/ui';

export class CardBasicExample extends TypeDiv {
  className = 'CardBasicExample';

  constructor() {
    super();
    const pList = [];
    for (let i = 1; i < 5; i++) {
      // 这里是你希望重复执行的代码
      console.log(i); // 举例：打印当前循环的次数
      pList.push(
        new P({
          slot: 'List item ' + i,
          styleObj: {
            marginBottom: '10px'
          }
        })
      );
    }
    this.addChild(
      new TdCard({
        styleObj: {
          maxWidth: '480px'
        },
        slot: pList,
        slots: {
          header: new Div({
            slot: [new Span({ slot: 'Card name' })]
          }),
          footer: 'Footer Content'
        }
      })
    );
  }
}
