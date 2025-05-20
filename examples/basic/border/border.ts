import { Table, TableBody, TableRow, TableDataCell, TypeFragment, Div, createStyle } from '@type-dom/framework';

export class BorderExample extends TypeFragment {
  className = 'BorderExample';
  override setup() {
    createStyle(`
      .demo-border .text {
        width: 15%;
      }
      .demo-border .line {
        width: 70%;
      }
      .demo-border .line div {
        width: 100%;
        height: 0;
        border-top: 1px solid var(--td-border-color);
      }
      .demo-border .line .dashed {
        border-top: 2px dashed var(--td-border-color);
      }    
    `)
    this.addChild(
      new Table({
        class: 'demo-border',
        slot: new TableBody({
          slot: [
            new TableRow({
              slot: [
                new TableDataCell({
                  class: 'text',
                  slot: 'Name'
                }),
                new TableDataCell({
                  class: 'text',
                  slot: 'Thickness',
                }),
                new TableDataCell({
                  class: 'line',
                  slot: 'Demo'
               }),
              ]
            }),
            new TableRow({
              slot: [
                new TableDataCell({
                  class: 'text',
                  slot: 'Solid'
                }),
                new TableDataCell({
                  class: 'text',
                  slot: '1px'
                }),
                new TableDataCell({
                  class: 'line',
                  slot: new Div(),
                })
              ]
            }),
            new TableRow({
              slot: [
                new TableDataCell({
                  class: 'text',
                  slot: 'Dashed'
                }),
                new TableDataCell({
                  class: 'text',
                  slot: '2px'
                }),
                new TableDataCell({
                  class: 'line',
                  slot: new Div({
                    class: 'dashed'
                  }),
                })
              ]
            }),
          ]
        })
      })
    )
  }
}