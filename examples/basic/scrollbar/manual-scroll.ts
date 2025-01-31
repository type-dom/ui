import { Div, P, TypeDiv } from '@type-dom/framework';
import { $colorPrimary, $colors, TdScrollbar } from '@type-dom/ui';
import { IStyle } from '@type-dom/css-type';

export class ScrollbarManualExample extends TypeDiv {
  className: 'ScrollbarManualExample';
  private inner: Div;

  constructor() {
    super();
    this.className = 'ScrollbarManualExample';
    this.attr.addName('scrollbar-manual-example');
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
    this.inner =  new Div({
      slot: contents
    });
    this.addChildren(
      new TdScrollbar({
        refId: 'scrollbar',
        height: 400,
        always: true,
        slot: this.inner,
        events: {
          // scroll: ({ scrollTop }) => {
          //   value = scrollTop
          // }
        }
      }),
      // new TdSlider({
      //
      // })
    );
  }
  override setup() {
    let max = 0;
    let value = 0;
    const innerRef = this.inner.dom;
    const scrollbarRef = this.down<TdScrollbar>('refId', 'scrollbar');

    this.onMounted(() => {
      max = innerRef.clientHeight - 380
    })

    const inputSlider = (value: number) => {
      scrollbarRef.setScrollTop(value)
    }
    const scroll = ({ scrollTop }) => {
      value = scrollTop
    }
    const formatTooltip = (value: number) => {
      return `${value} px`
    }
  }
}
