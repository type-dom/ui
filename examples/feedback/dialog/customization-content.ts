import { Div, Span, Table, TableDataCell, TableRow, TypeDiv } from '@type-dom/framework';
import { TdButton, TdDialog, TdForm, TdFormItem, TdInput } from '@type-dom/ui';
import { signal, toRefs } from '@type-dom/signals';

export class DialogCustomizationContentExample extends TypeDiv {
  className = 'DialogCustomizationContentExample';

  constructor() {
    super();

    const dialogTableVisible = signal(false)
    const dialogFormVisible = signal(false)
    const formLabelWidth = '140px'

    const form = toRefs({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    })

    // const gridData = [
    //   {
    //     date: '2016-05-02',
    //     name: 'John Smith',
    //     address: 'No.1518,  Jinshajiang Road, Putuo District',
    //   },
    //   {
    //     date: '2016-05-04',
    //     name: 'John Smith',
    //     address: 'No.1518,  Jinshajiang Road, Putuo District',
    //   },
    //   {
    //     date: '2016-05-01',
    //     name: 'John Smith',
    //     address: 'No.1518,  Jinshajiang Road, Putuo District',
    //   },
    //   {
    //     date: '2016-05-03',
    //     name: 'John Smith',
    //     address: 'No.1518,  Jinshajiang Road, Putuo District',
    //   },
    // ]

    this.addChildren(
      new TdButton({
        slot: 'Open a Table nested Dialog',
        plain: true,
        events: {
          click: () => {
            console.log('click . ')
            dialogTableVisible.set(true);
          },
        },
      }),
      new TdButton({
        slot: 'Open a Form nested Dialog',
        events: {
          click: () => {
            console.log('click . ');
            dialogFormVisible.set(true)
          }
        },
      }),
      new TdDialog({
        title: 'Shipping address',
        vModel: dialogTableVisible,
        width: 800,
        slot: new Table({
          name: 'table',
          slot: [
            new TableRow({
              slot: [
                new TableDataCell({
                  slot: [
                    new Span({
                      slot: 'Name',
                    }),
                  ],
                }),
                new TableDataCell({
                  slot: [
                    new Span({
                      slot: 'Address',
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              slot: [
                new TableDataCell({
                  slot: [
                    new Span({
                      slot: 'John Smith',
                    }),
                  ],
                }),
                new TableDataCell({
                  slot: [
                    new Span({
                      slot: 'Suzhou',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      new TdDialog({
        vModel: dialogFormVisible,
        title: 'Shipping address',
        width: 500,
        slot: new TdForm({
          name: 'form',
          model: form,
          slot: [
            new TdFormItem({
              label: 'Promotion name',
              labelWidth: formLabelWidth,
              slot: [
                new TdInput({
                  vModel: form.name,
                  autocomplete: 'off',
                }),
              ],
            }),
            new TdFormItem({
              label: 'Zones',
              labelWidth: formLabelWidth,
              slot: [
                // new TdSelect({
                //   slot: [
                //     new TdOption({
                //       label: 'Zone No.1',
                //       value: 'shanghai'
                //     }),
                //     new TdOption({
                //       label: 'Zone No.2',
                //       value: 'beijing'
                //     })
                //   ]
                // }),
              ],
            }),
          ],
        }),
        slots: {
          footer: new Div({
            class: 'dialog-footer',
            slot: [
              new TdButton({
                slot: 'Cancel',
                events: {
                  click: () => dialogFormVisible.set(false),
                },
              }),
              new TdButton({
                type: 'primary',
                slot: 'Confirm',
                events: {
                  click: () => dialogFormVisible.set(false),
                },
              }),
            ],
          }),
        },
      })
    );
  }
}
