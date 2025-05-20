import { TypeFragment, Div, useDark } from '@type-dom/framework';
import { watch, signal } from '@type-dom/signals';
import { TdWatermark } from '@type-dom/ui';

export class WatermarkMultiLineExample extends TypeFragment {
  className: 'WatermarkMultiLineExample';
  constructor() {
    super();
    this.className = 'WatermarkMultiLineExample';
  }
  override setup() {
    const font = {
      color: signal('rgba(0, 0, 0, .15)'),
    }

    const isDark = useDark({
      storageKey: 'vitepress-theme-appearance',
    })
    watch(
      () => isDark.get(),
      () => {
        font.color.set(isDark.get()
          ? 'rgba(255, 255, 255, .15)'
          : 'rgba(0, 0, 0, .15)')
      },
      {
        immediate: true,
      }
    )

    this.addChildren(
      new TdWatermark({
        font: font,
        content: ['Element+', 'Element Plus'],
        slot: new Div({
          styleObj: {
            height: '500px',
          }
        })
      })
    )
  }
}