import { Div, P, SvgCircle, SvgG, SvgSvg, TypeDiv } from '@type-dom/framework';
import { TdIcon, TdOption, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

interface ListItem {
  value: string
  label: string
}

export class SelectCustomLoadingExample extends TypeDiv {
  className: 'SelectCustomLoadingExample';

  constructor() {
    super();
    this.className = 'SelectCustomLoadingExample';

    const list = signal<ListItem[]>([])
    const options = signal<ListItem[]>([])
    const value = signal<string[]>([])
    const loading = signal(false)

    this.onMounted(() => {
      list.set(states.map((item) => {
        return { value: `value:${item}`, label: `label:${item}` }
      }));
    });


    const remoteMethod = (query: string) => {
      if (query) {
        loading.set(true)
        setTimeout(() => {
          loading.set(false)
          options.set(list.get().filter((item) => {
            return item.label.toLowerCase().includes(query.toLowerCase())
          }))
        }, 3000)
      } else {
        options.set([]);
      }
    }

    const states = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ]
    this.style.addObj({
      display: 'flex',
      flexWrap: 'wrap',
    });
    this.addChildren(
      new Div({
        styleObj: {
          marginRight: '12px',
        },
        slot: [
          new P({
            slot: 'loading icon1',
          }),
          new TdSelect({
            vModel: value,
            multiple: true,
            filterable: true,
            remote: true,
            reserveKeyword: true,
            placeholder: 'Please enter a keyword',
            remoteMethod: remoteMethod,
            loading: loading,
            styleObj: {
              width: 240,
            },
            slots: {
              loading: new SvgSvg({
                attrObj: {
                  viewBox: '0, 0, 50, 50'
                },
                styleObj: {
                  marginRight: '6px',
                  width: '18px',
                  height: '18px',
                  animation: 'loading-rotate 2s linear infinite'
                },
                slot: [
                  new SvgCircle({
                    attrObj: {
                      cx: 25,
                      cy: 25,
                      r: 20,
                      fill: 'none',
                    }
                  })
                ]
              })
            },
            slot: options.get().map(opt => new TdOption({
              label: opt.label,
              value: opt.value,
            })),
            // init: (element: TdSelect) => {
            //   for (const opt of options) {
            //     element.addChildren(
            //       new TdOption({
            //         label: opt.label,
            //         value: opt.value,
            //       }),
            //     );
            //   }
            // }
          }),
        ]
      }),
      new Div({
        styleObj: {
          marginRight: '12px',
        },
        slot: [
          new P({
            slot: 'loading icon2',
          }),
          new TdSelect({
            vModel: value,
            multiple: true,
            filterable: true,
            remote: true,
            reserveKeyword: true,
            placeholder: 'Please enter a keyword',
            remoteMethod: remoteMethod,
            loading: loading,
            styleObj: {
              width: 240,
            },
            slots: {
              loading: new TdIcon({
                slot: new SvgSvg({
                  attrObj: {
                    viewBox: '0, 0, 20, 20'
                  },
                  slot: [
                    new SvgG({
                      attrObj: {
                        strokeWidth: '0'
                      },
                      styleObj: {
                        animation: 'none',
                        stroke: 'none',
                      },
                      slot: [
                        new SvgCircle({
                          name: 'dot1',
                          attrObj: {
                            rx: 0,
                            ry: 0,
                            r: 3.375,
                          }
                        }),
                        new SvgCircle({
                          name: 'dot2',
                          attrObj: {
                            rx: 0,
                            ry: 0,
                            r: 3.375,
                          }
                        }),
                        new SvgCircle({
                          name: 'dot3',
                          attrObj: {
                            rx: 0,
                            ry: 0,
                            r: 3.375,
                          }
                        }),
                        new SvgCircle({
                          name: 'dot4',
                          attrObj: {
                            rx: 0,
                            ry: 0,
                            r: 3.375,
                          }
                        })
                      ]
                    })
                  ]
                })
              })
            },
            slot: options.get().map(opt => new TdOption({
              label: opt.label,
              value: opt.value,
            })),
            // init: (element: TdSelect) => {
            //   for (const opt of options) {
            //     element.addChildren(
            //       new TdOption({
            //         label: opt.label,
            //         value: opt.value,
            //       }),
            //     );
            //   }
            // }
          }),
        ]
      }),
    );
  }
}
