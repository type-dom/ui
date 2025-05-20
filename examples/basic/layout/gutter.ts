import { Div, TypeDiv } from '@type-dom/framework';
import { TdCol, TdRow } from '@type-dom/ui';

export class LayoutGutterExample extends TypeDiv {
  className = 'LayoutGutterExample';

  constructor() {
    super();

    const $purple = '#d3dce6';
    // const $purpleDark = '#99a9bf';
    const $purpleLight = '#e5e9f2';
    this.addChildren(
      new TdRow({
        gutter: 20,
        styleObj: {
          marginBottom: '20px'
        },
        slot: [
          new TdCol({
            span: 6,
            slot: [
              new Div({
                styleObj: {
                  borderRadius: '4px',
                  minHeight: '36px',
                  background: $purple
                }
              })
            ]
          }),
          new TdCol({
            span: 6,
            slot: [
              new Div({
                styleObj: {
                  borderRadius: '4px',
                  minHeight: '36px',
                  background: $purpleLight
                }
              })
            ]
          }),
          new TdCol({
            span: 6,
            slot: [
              new Div({
                styleObj: {
                  borderRadius: '4px',
                  minHeight: '36px',
                  background: $purple
                }
              })
            ]
          }),
          new TdCol({
            span: 6,
            slot: [
              new Div({
                styleObj: {
                  borderRadius: '4px',
                  minHeight: '36px',
                  background: $purpleLight
                }
              })
            ]
          })
        ]
      })
    );
  }
}
