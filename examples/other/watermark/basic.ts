import { TypeFragment, Div, useDark } from '@type-dom/framework';
import { watch, signal } from '@type-dom/signals';
import { TdWatermark } from '@type-dom/ui';

export class WatermarkBasicExample extends TypeFragment {
  className: 'WatermarkBasicExample';
  constructor() {
    super();
    this.className = 'WatermarkBasicExample';
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
        slot: new Div({
          styleObj: {
            height: '500px',
          }
        })
      })
    )
  }
}