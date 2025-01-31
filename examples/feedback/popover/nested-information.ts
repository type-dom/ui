import { Div, P, Table, TypeDiv } from '@type-dom/framework';
import { $bgColor, $colors, TdAvatar, TdButton, TdPopover } from '@type-dom/ui';

export class PopoverNestedInformationExample extends TypeDiv {
  className = 'PopoverNestedInformationExample';
  constructor() {
    super();
    this.addChild(
      new Div({
        name: 'popover-information',
        styleObj: {
          display: 'flex',
          alignItems: 'center',
        },
        slot: [
          new TdPopover({
            placement: 'right',
            width: 400,
            trigger: 'click',
            slot: new Table({
              styleObj: {
                backgroundColor: $bgColor.default,
                // width: 600,
                height: 300,
              }
            }),
            slots: {
              reference: new TdButton({
                slot: 'Click to activate',
                styleObj: {
                  marginRight: '16px',
                }
              }),
            }
          }),
          new TdPopover({
            width: 300,
            popperStyle: {
              boxShadow: 'rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px',
              padding: '20px'
            },
            slot: new Div({
              slot: [
                new TdAvatar({
                  size: 60,
                  src: 'https://avatars.githubusercontent.com/u/72015883?v=4',
                  styleObj: {
                    marginBottom: '8px',
                  }
                }),
                new Div({
                  styleObj: {
                    marginBottom: '8px',
                  },
                  slot: [
                    new P({
                      slot: 'TypeDom ui',
                      styleObj: {
                        margin: 0,
                        fontWeight: 500
                      }
                    }),
                    new P({
                      slot: '@type-dom',
                      styleObj: {
                        margin: 0,
                        fontSize: '14px',
                        color: $colors.info.base,
                      }
                    })
                  ]
                }),
                new P({
                  slot: 'TypeDom is a modern and flexible UI library for building modern web applications.',
                  styleObj: {
                    margin: 0,
                  }
                })
              ]
            }),
            slots: {
              reference: new TdAvatar({
                src: 'https://avatars.githubusercontent.com/u/72015883?v=4'
              })
            }
          })
        ]
      }),
    );
    // const gridData = [
    //   {
    //     date: '2016-05-02',
    //     name: 'Jack',
    //     address: 'New York City',
    //   },
    //   {
    //     date: '2016-05-04',
    //     name: 'Jack',
    //     address: 'New York City',
    //   },
    //   {
    //     date: '2016-05-01',
    //     name: 'Jack',
    //     address: 'New York City',
    //   },
    //   {
    //     date: '2016-05-03',
    //     name: 'Jack',
    //     address: 'New York City',
    //   },
    // ]
  }
}
