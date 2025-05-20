import { TypeFragment, Code, Div, useCssVar, createStyle } from '@type-dom/framework';
import { TdRow, TdCol } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class RadiusExample extends TypeFragment {
  className = 'RadiusExample';
  override setup(){
    createStyle(`
      .demo-radius .title {
        color: var(--td-text-color-regular);
        font-size: 18px;
        margin: 10px 0;
      }
      .demo-radius .value {
        color: var(--td-text-color-primary);
        font-size: 16px;
        margin: 10px 0;
      }
      .demo-radius .radius {
        height: 40px;
        width: 70%;
        border: 1px solid var(--td-border-color);
        border-radius: 0;
        margin-top: 20px;
      }
    `)
    const radiusGroup = signal([
      {
        name: 'No Radius',
        type: '',
      },
      {
        name: 'Small Radius',
        type: 'small',
      },
      {
        name: 'Large Radius',
        type: 'base',
      },
      {
        name: 'Round Radius',
        type: 'round',
      },
    ])
    this.addChild(new TdRow({
        gutter: 12,
        class: 'demo-radius',
        slot: radiusGroup.get().map((radius) => new TdCol({
          span: 6,
          xs: { span: 12 },
          slot: [
            new Div({
              class: 'title',
              slot: radius.name
            }),
            new Div({
              class: `value`,
              slot: new Code({
                slot: 'border-radius:' + (radius.type ? useCssVar(`--td-border-radius-${ radius.type }`).get() : '0px'),
              })
            }),
            new Div({
              class: 'radius',
              styleObj: {
                borderRadius: radius.type ? `var(--td-border-radius-${radius.type})` : '',
              },
            })
          ]
        })),
      })
    )
  }
}