import { Div, TypeDiv } from '@type-dom/framework';
import { TdCol, TdRow } from '@type-dom/ui';

export class LayoutResponsiveExample extends TypeDiv {
  className: string = 'LayoutResponsiveExample';

  constructor() {
    super();
    const $purple = '#d3dce6';
    // const $purpleDark = '#99a9bf';
    const $purpleLight = '#e5e9f2';
    this.addChildren(
      new TdRow({
        gutter: 10,
        styleObj: {
          marginBottom: '20px'
        },
        slot: [
          new TdCol({
            // span: 6,
            xs: 8,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 1,
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
            xs: 4,
            sm: 6,
            md: 8,
            lg: 9,
            xl: 11,
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
            xs: 4,
            sm: 6,
            md: 8,
            lg: 9,
            xl: 11,
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
            xs: 8,
            sm: 6,
            md: 4,
            lg: 3,
            xl: 1,
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
