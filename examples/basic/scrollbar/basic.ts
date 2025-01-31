import { P, TypeDiv } from '@type-dom/framework';
import { $colorPrimary, $colors, TdScrollbar } from '@type-dom/ui';
import { IStyle } from '@type-dom/css-type';

export class ScrollbarBasicExample extends TypeDiv {
  className: 'ScrollbarBasicExample';

  constructor() {
    super();
    this.className = 'ScrollbarBasicExample';
    this.attr.addName('scrollbar-basic-example');
    this.style.addObj({
      width: '100%',
      height: '100%',
      overflow: 'auto',
    });
    const scrollbarItem: IStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50px',
      margin: '10px',
      textAlign: 'center',
      borderRadius: '4px',
      // background: var(--el-color-primary-light-9),
      background: $colors.primary['light-9'],
      // color: var(--el-color-primary),
      color: $colorPrimary,
    };
    const contents: P[] = [];
    for (let i = 0; i < 20; i++) {
      contents.push(
        new P({
          slot: 'item ' + (i + 1),
          styleObj: scrollbarItem,
        })
      );
    }
    this.addChild(
      new TdScrollbar({
        height: 400,
        slot: contents,
      })
    );
  }
}
