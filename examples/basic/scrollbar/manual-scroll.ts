import { createClass, Div, nextFrame, onMounted, P, TypeDiv } from '@type-dom/framework';
import { $colorPrimary, $colors, TdScrollbar, TdSlider } from '@type-dom/ui';
import { IStyle } from '@type-dom/css-type';
import { signal } from '@type-dom/signals';
import { genNumArr } from '@type-dom/utils';

type Arrayable<T> = T | T[]
export class ScrollbarManualExample extends TypeDiv {
  className: 'ScrollbarManualExample';

  constructor() {
    super();
    this.className = 'ScrollbarManualExample';
    this.attr.addName('scrollbar-manual-example');
  }
  override setup() {

    const max = signal(0)
    const value = signal(0)
    const innerRef = signal<HTMLDivElement>()
    const scrollbarRef = signal<TdScrollbar>()

    onMounted(() => {
      nextFrame(() => {
        console.warn('innerRef is ', innerRef);
        max.set(innerRef.get().clientHeight - 380)
        console.warn('max is ', max);
      })
    })

    const inputSlider = (value: Arrayable<number>) => {
      console.error('inputSlider', value);
      scrollbarRef.get()!.setScrollTop(value)
    }
    const scroll = ({ scrollTop }) => {
      console.warn('scroll', scrollTop);
      value.set(scrollTop)
    }
    const formatTooltip = (value: number) => {
      return `${value} px`
    }

    createClass('scrollbar-demo-item', {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50px',
      margin: '10px',
      textAlign: 'center',
      borderRadius: '4px',
      background: 'var(--td-color-primary-light-9)',
      // background: $colors.primary['light-9'],
      color: 'var(--td-color-primary)',
      // color: $colorPrimary,
    })
    createClass('td-slider', {
      marginTop: '20px'
    })

    this.addChildren(
      new TdScrollbar({
        refEl: scrollbarRef,
        height: 400,
        always: true,
        slot: new Div({
          refDom: innerRef,
          slot: genNumArr(20).map(item => {
            return new P({
              slot: item + 1,
              class: 'scrollbar-demo-item',
            })
          })
        }),
        emits: {
          scroll: scroll
        }
      }),
      new TdSlider({
        vModel: value,
        max: 810, // max,
        formatTooltip: formatTooltip,
        emits: {
          input: inputSlider
        }
      })
    );
  }
}
