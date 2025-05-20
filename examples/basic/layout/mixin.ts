import { Div, TypeDiv } from '@type-dom/framework';
import { TdCol, TdRow } from '@type-dom/ui';

export class LayoutMixinExample extends TypeDiv {
  className = 'LayoutMixinExample';

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
            span: 16,
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
            span: 8,
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
      }),
      new TdRow({
        gutter: 20,
        styleObj: {
          marginBottom: '20px'
        },
        slot: [
          new TdCol({
            span: 8,
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
            span: 8,
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
            span: 4,
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
            span: 4,
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
      }),
      new TdRow({
        gutter: 20,
        styleObj: {
          marginBottom: '20px'
        },
        slot: [
          new TdCol({
            span: 4,
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
            span: 16,
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
            span: 4,
            slot: [
              new Div({
                styleObj: {
                  borderRadius: '4px',
                  minHeight: '36px',
                  background: $purple
                }
              })
            ]
          })
        ]
      })
    );
  }
}
