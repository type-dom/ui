import { TypeFragment, Div, Code, Span } from '@type-dom/framework';
import { signal } from '@type-dom/signals';

export class ShadowExample extends TypeFragment {
  className = 'ShadowExample';
  override setup() {
    const shadowGroup = signal([
      {
        name: 'Basic Shadow',
        type: '',
      },
      {
        name: 'Light Shadow',
        type: 'light',
      },
      {
        name: 'Lighter Shadow',
        type: 'lighter',
      },
      {
        name: 'Dark Shadow',
        type: 'dark',
      },
    ])

    const getCssVarName = (type: string) => {
      return `--td-box-shadow${type ? '-' : ''}${type}`
    }
    this.addChild(new Div({
      class: 'flex justify-between items-center flex-wrap',
      slot: shadowGroup.get().map((shadow) => new Div({
        class: 'flex flex-col justify-center items-center',
        attrObj: {
          m: 'auto',
          w: 46
        },
        slot: [
          new Div({
            class: 'inline-flex',
            attrObj: {
              h: 30,
              w: 30,
              m: 2,
            },
            styleObj: {
              boxShadow: `var(${getCssVarName(shadow.type)})`,
            }
          }),
          new Span({
            class: 'demo-shadow-text',
            attrObj: {
              p: 'y-4',
              text: 'sm',
            },
            slot: shadow.name,
          }),
          new Code({
            attrObj: {
              text: 'xs',
            },
            slot: getCssVarName(shadow.type)
          })
        ]
      }))
    }))
  }
}