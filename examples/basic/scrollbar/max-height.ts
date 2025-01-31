import { P, TypeDiv } from '@type-dom/framework';
import { $colorPrimary, $colors, TdButton, TdScrollbar } from '@type-dom/ui';
import { IStyle } from '@type-dom/css-type';

export class ScrollbarMaxHeightExample extends TypeDiv {
  className: 'ScrollbarMaxHeightExample';
  count: number;
  constructor() {
    super();
    this.className = 'ScrollbarMaxHeightExample';
    this.attr.addName('scrollbar-max-height-example');
    this.style.addObj({
      width: '100%',
      height: '100%',
      overflow: 'auto',
    });
    this.count = 3;
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
    for (let i = 0; i < this.count; i++) {
      contents.push(
        new P({
          slot: 'item ' + (i + 1),
          styleObj: scrollbarItem,
        })
      );
    }
    this.addChildren(
      new TdButton({
        slot: 'Add Item',
        events: {
          click: this.add,
        }
      }),
      new TdButton({
        slot: 'Delete Item',
        events: {
          click: this.onDelete,
        }
      }),
      new TdScrollbar({
        height: 400,
        slot: contents,
      })
    );
  }

  add = () => {
    this.count++
  }

  onDelete = () => {
    if (this.count > 0) {
      this.count--
    }
  }
}
