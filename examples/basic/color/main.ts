import { TypeFragment, useCssVar, Div } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { TdRow, TdCol } from '@type-dom/ui'
import { useCopyColor } from '../../../utils/colors';

export class MainColorExample extends TypeFragment {
  className = 'MainColorExample';
  override setup() {
    const primary = useCssVar('--td-color-primary')
    console.warn('primary.get() is ', primary.get())
    const colorLevel = [3, 5, 7, 8, 9].map((i) => `light-${i}`)
    colorLevel.unshift('dark-2')

    const { copyColor } = useCopyColor()
    this.addChildren(
      new TdRow({
        gutter: 12,
        slot: new TdCol({
          span: 10,
          xs: { span: 12 },
          slot: new Div({
            class: 'demo-color-box',
            styleObj: { background: primary },
            slot: [
              'Brand Color',
              new Div({
                class: 'value',
                slot: computed(() => primary.get()?.toUpperCase()),
                attrObj: {
                  text: 'xs',
                },
              }),
              new Div({
                class: 'bg-color-sub',
                styleObj: { background: primary },
                slot: colorLevel.map((level) => {
                  return new Div({
                    class: 'bg-blue-sub-item cursor-pointer hover:shadow',
                    styleObj: {
                      width: `${100 / 6}%`,
                      background: 'var(--td-color-primary-' + level + ')',
                    },
                    events: {
                      click: () => {
                        copyColor('primary-' + level)
                      }
                   }
                  })
                })
              })
            ]
          }),
        }),
      })
    )
  }
}