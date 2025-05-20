import { TypeFragment, Div } from '@type-dom/framework';
import { TdRow, TdCol } from '@type-dom/ui'
import { getCssVarValue, getCssVarName } from '../../../utils/colors';
import { isDark } from '../../../composables/dark';

export class NeutralColorExample extends TypeFragment {
  className = 'NeutralColorExample';
  override setup() {

    const backgroundTypes = ['page', '', 'overlay']
    const backgroundColors = backgroundTypes.map((type) => {
      return {
        name: type
          ? `${type[0].toUpperCase() + type.slice(1)} Background`
          : 'Base Background',
        var: getCssVarValue(getCssVarName('bg-color', type)),
      }
    })

    const borderTypes = ['darker', 'dark', '', 'light', 'lighter', 'extra-light']
    const borderColors = borderTypes.map((type) => {
      return {
        name: type
          ? `${type[0].toUpperCase() + type.slice(1)} Border`
          : 'Base Border',
        var: getCssVarValue(getCssVarName('border-color', type)),
      }
    })

    const fillTypes = [
      'darker',
      'dark',
      '',
      'light',
      'lighter',
      'extra-light',
      'blank',
    ]
    const fillColors = fillTypes.map((type) => {
      return {
        name: type ? `${type[0].toUpperCase() + type.slice(1)} Fill` : 'Base Fill',
        var: getCssVarValue(getCssVarName('fill-color', type)),
      }
    })

    const textTypes = ['primary', 'regular', 'secondary', 'placeholder', 'disabled']
    const textColors = textTypes.map((type) => {
      return {
        name: `${type[0].toUpperCase() + type.slice(1)} Text`,
        var: getCssVarValue(getCssVarName('text-color', type)),
      }
    })

    const black = '#000000'
    const white = '#FFFFFF'
    this.addChildren(
      new TdRow({
        gutter: 12,
        slot: [
          new TdCol({
            span: 6,
            xs: { span: 12 },
            slot: new Div({
              class: 'demo-color-box-group',
              slot: textColors.map(text => new Div({
                class: 'demo-color-box demo-color-box-other',
                styleObj: {
                  color: 'var(--td-bg-color)',
                  background: text.var.get(),
                },
                slot: [
                  text.name,
                  new Div({
                    class: 'value',
                    slot: text.var.get().toUpperCase(),
                    attrObj: {
                      text: 'xs',
                    },
                  }),
                ]
              })),
            })
          }),
          new TdCol({
            span: 6,
            xs: { span: 12 },
            slot: new Div({
              class: 'demo-color-box-group',
              slot: borderColors.map(border => new Div({
                class: 'demo-color-box demo-color-box-other demo-color-box-lite',
                styleObj: {
                  background: border.var.get(),
                },
                slot: [
                  border.name,
                  new Div({
                    class: 'value',
                    slot: border.var.get().toUpperCase(),
                    attrObj: {
                      text: 'xs',
                    },
                  }),
                ]
              })),
            })
          }),
          new TdCol({
            span: 6,
            xs: { span: 12 },
            slot: new Div({
              class: 'demo-color-box-group',
              slot: fillColors.map(fill => new Div({
                class: 'demo-color-box demo-color-box-other demo-color-box-lite',
                styleObj: {
                  background: fill.var.get(),
                  border: `1px solid ${
                    fill.name === 'Blank Fill'
                      ? 'var(--el-border-color-light)'
                      : 'transparent'
                  }`,
                },
                slot: [
                  fill.name,
                  new Div({
                    class: 'value',
                    slot: fill.var.get().toUpperCase(),
                    attrObj: {
                      text: 'xs',
                    },
                  }),
                ]
              })),
            })
          }),
          new TdCol({
            span: 6,
            xs: { span: 12 },
            slot: new Div({
              class: 'demo-color-box-group',
              slot: [
                new Div({
                  class: 'demo-color-box demo-color-box-other',
                  styleObj: { background: black },
                  slot: [
                    'Basic Black',
                    new Div({
                      class: 'value',
                      slot: black,
                      attrObj: {
                        text: 'xs'
                      }
                    })
                  ]
                }),
                new Div({
                  class: 'demo-color-box demo-color-box-other',
                  styleObj: {
                    background: white,
                    color: '#303133',
                    border: '1px solid #eee',
                  },
                  slot: [
                    'Basic White',
                    new Div({
                      class: 'value',
                      slot: white,
                      attrObj: {
                        text: 'xs'
                      }
                    })
                  ]
                }),
                new Div({
                  class: 'demo-color-box demo-color-box-other demo-color-box-lite bg-transparent',
                  slot: [
                    'Transparent',
                    new Div({
                      class: 'value',
                      slot: 'Transparent',
                      attrObj: {
                        text: 'xs'
                      }
                    })
                  ]
                }),
                ...backgroundColors.map(bg => new Div({
                  class: 'demo-color-box demo-color-box-other demo-color-box-lite',
                  styleObj: {
                    background: bg.var.value,
                      border:
                    '1px solid ' +
                    (!isDark || bg.name === 'Base Background'
                      ? 'var(--el-border-color-light)'
                      : 'transparent'),
                  },
                  slot: [
                    bg.name,
                    new Div({
                      class: 'value',
                      slot: bg.var.get().toUpperCase(),
                      attrObj: {
                        text: 'xs'
                      }
                    })
                  ]
                }))
              ]
            })
          })
        ]
      })
    )
  }
}