import { createClass, Div, P, TypeDiv } from '@type-dom/framework';
import { $colorDanger, $colorPrimary, $colors, TdScrollbar } from '@type-dom/ui';
import { IStyle } from '@type-dom/css-type';

export class ScrollbarHorizontalExample extends TypeDiv {
  className: 'ScrollbarHorizontalExample';

  constructor() {
    super();
    this.className = 'ScrollbarHorizontalExample';
    this.attr.addName('scrollbar-horizontal-example');
    this.style.addObj({
      width: '100%',
      height: '100%',
      overflow: 'auto',
    });
    // createClass('scrollbar-demo-item', {
    //   flexShrink: 0,
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   width: '100px',
    //   height: '50px',
    //   margin: '10px',
    //   textAlign: 'center',
    //   borderRadius: '4px',
    //   // background: var(--el-color-danger-light-9),
    //   background: $colors.danger['light-9'],
    //   // color: var(--el-color-danger),
    //   color: $colorDanger,
    // })
    const scrollbarItem: IStyle = {
      'flex-shrink': '0', // todo no effect valid
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100px',
      height: '50px',
      margin: '10px',
      textAlign: 'center',
      borderRadius: '4px',
      // background: var(--el-color-danger-light-9),
      background: $colors.danger['light-9'],
      // color: var(--el-color-danger),
      color: $colorDanger,
    };
    const contents: P[] = [];
    for (let i = 0; i < 50; i++) {
      contents.push(
        new P({
          slot: i + 1,
          styleObj: scrollbarItem,
        })
      );
    }
    this.addChild(
      new TdScrollbar({
        // height: 400,
        slot: new Div({
          styleObj: {
            display: 'flex'
          },
          slot: contents
        }),
      })

    );
  }
}
