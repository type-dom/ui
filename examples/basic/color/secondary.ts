import { TypeFragment, Div } from '@type-dom/framework';
import { TdRow, TdCol } from '@type-dom/ui'
import { getColorValue, useCopyColor } from '../../../utils/colors';

export class SecondaryColorExample extends TypeFragment {
  className = 'SecondaryColorExample';
  override setup() {
    const colorsType = ['success', 'warning', 'danger', 'info']

    const colorLevel = [3, 5, 7, 8, 9].map((item) => `light-${item}`)
    colorLevel.unshift('dark-2')

    const { copyColor } = useCopyColor()
    this.addChildren(
      new TdRow({
        gutter: 12,
        slot: colorsType.map(type => new TdCol({
          span: 6,
          xs: { span: 12 },
          slot: new Div({
            class: 'demo-color-box',
            styleObj: { background: getColorValue(type) },
            slot: [
              type.charAt(0).toUpperCase() + type.slice(1),
              new Div({
                class: 'value',
                slot: getColorValue(type).toUpperCase(),
                attrObj: {
                  text: 'xs',
                },
              }),
              new Div({
                class: 'bg-color-sub',
                slot: colorLevel.map((level) => {
                  return new Div({
                    class: 'bg-secondary-sub-item transition cursor-pointer hover:shadow',
                    styleObj: {
                      width: `${100 / 6}%`,
                      background: `var(--td-color-${type}-` + level + ')',
                    },
                    events: {
                      click: () => {
                        copyColor(type + '-' + level)
                      }
                    }
                  })
                })
              })
            ]
          }),
        })),
      })
    )
  }
}