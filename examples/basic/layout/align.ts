import { Div, TypeDiv } from '@type-dom/framework';
import { TdCol, TdRow } from '@type-dom/ui';

export class LayoutAlignExample extends TypeDiv {
  className = 'LayoutAlignExample';

  constructor() {
    super();
    const $purple = '#d3dce6';
    const $purpleDark = '#99a9bf';
    const $purpleLight = '#e5e9f2';
    this.addChildren(
      new TdRow({
        // 默认；
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
          })
        ]
      }),
      new TdRow({
        // 居中；
        justify: 'center',
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
          })
        ]
      }),
      new TdRow({
        // 靠后；
        justify: 'end',
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
          })
        ]
      }),
      new TdRow({
        // 两端对齐;
        justify: 'space-between',
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
          })
        ]
      }),
      new TdRow({
        // ;
        justify: 'space-around',
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
          })
        ]
      }),
      new TdRow({
        //
        justify: 'space-evenly',
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
          })
        ]
      })
    );
  }
}
