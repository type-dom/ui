import { P, TypeDiv } from '@type-dom/framework';
import { $colorPrimary, $colors, TdButton, TdScrollbar } from '@type-dom/ui';
import { IStyle } from '@type-dom/css-type';
import { computed, signal } from '@type-dom/signals';

export class ScrollbarMaxHeightExample extends TypeDiv {
  className: 'ScrollbarMaxHeightExample';

  constructor() {
    super();
    this.className = 'ScrollbarMaxHeightExample';
    this.attr.addName('scrollbar-max-height-example');
    this.style.addObj({
      width: '100%',
      height: '100%',
      overflow: 'auto',
    });

  }

  setup() {
    const count = signal(3)

    const add = () => {
      console.log('count is ', count);
      count.set(count.get() + 1)
    }
    const onDelete = () => {
      if (count.get() > 0) {
        count.set(count.get() - 1)
      }
    }

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

    this.addChildren(
      new TdButton({
        slot: 'Add Item',
        events: {
          click: add,
        },
      }),
      new TdButton({
        slot: 'Delete Item',
        events: {
          click: onDelete,
        },
      }),
      new TdScrollbar({
        maxHeight: 400,
        slot: computed(() => {
          const contents: P[] = [];
          for (let i = 0; i < count.get(); i++) {
            contents.push(
              new P({
                slot: i + 1,
                styleObj: scrollbarItem,
              })
            );
          }
          return contents;
        }),
      })
    );
  }
}
