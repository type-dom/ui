import { Div, Span, TypeDiv } from '@type-dom/framework';
import {
  ElArrowRightSvg,
  ElCaretBottomSvg,
  ElCaretTopSvg,
  ElWarningSvg
} from '@type-dom/svgs';
import { TdCol, TdIcon, TdRow, TdStatistic, TdTooltip } from '@type-dom/ui';
import './card.scss';

export class StatisticCardExample extends TypeDiv {
  className = 'StatisticCardExample';

  constructor() {
    super();
    //
    // createClass('td-statistic', {
    //   '--td-statistic-content-font-size': '28px'
    // })
    // createClass('statistic-card', {
    //   height: '100%',
    //   padding: '20px',
    //   borderRadius: '4px',
    //   backgroundColor: 'var(--td-bg-color-overlay)'
    // });
    // createClass('statistic-footer', {
    //   display: 'flex',
    //   justifyContent: 'space-between',
    //   alignItems: 'center',
    //   flexWrap: 'wrap',
    //   fontSize: '12px',
    //   color: 'var(--td-text-color-regular)',
    //   marginTop: '16px'
    // })
    // // createClass('')
    // const $cardFooterItem: Partial<IStyle> = {
    //   display: 'flex',
    //   justifyContent: 'space-between',
    //   alignItems: 'center'
    // };
    // const $cardFooterItemLastSpan: Partial<IStyle> = {
    //   display: 'inline-flex',
    //   alignItems: 'center',
    //   marginLeft: '4px'
    // };

    this.addChild(
      new TdRow({
        gutter: 16,
        slot: [
          new TdCol({
            span: 8,
            slot: [
              new Div({
                class: 'statistic-card',
                // styleObj: $card,
                slot: [
                  new TdStatistic({
                    value: 98500,
                    valueStyle: {
                      fontSize: '28px'
                    },
                    slots: {
                      title: new Div({
                        styleObj: {
                          display: 'inline-flex',
                          alignItems: 'center'
                        },
                        slot: [
                          'Daily active users',
                          new TdTooltip({
                            effect: 'dark',
                            content: 'Number of users who logged into the product in one day',
                            placement: 'top',
                            slot:  new TdIcon({
                              size: 12,
                              styleObj: {
                                marginLeft: '4px'
                              },
                              slot: new ElWarningSvg()
                            })
                          }),
                        ]
                      })
                    }
                  }),
                  new Div({
                    class: 'statistic-footer',
                    // styleObj: $cardFooter,
                    slot: [
                      new Div({
                        class: 'footer-item',
                        // styleObj: $cardFooterItem,
                        slot: [
                          new Span({
                            slot: 'than yesterday'
                          }),
                          new Span({
                            class: 'green',
                            // styleObj: {
                            //   ...$cardFooterItemLastSpan,
                            //   color: $colors.success.base // green
                            // },
                            slot: [
                              '24%',
                              new TdIcon({
                                slot: new ElCaretTopSvg()
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          new TdCol({
            span: 8,
            slot: [
              new Div({
                class: 'statistic-card',
                // styleObj: $card,
                slot: [
                  new TdStatistic({
                    value: 693700,
                    valueStyle: {
                      fontSize: '28px'
                    },
                    slots: {
                      title: new Div({
                        styleObj: {
                          display: 'inline-flex',
                          alignItems: 'center'
                        },
                        slot: [
                          'Monthly Active Users',
                          new TdTooltip({
                            effect: 'dark',
                            content: 'Number of users who logged into the product in one month',
                            placement: 'top',
                            slot: new TdIcon({
                              size: 12,
                              styleObj: {
                                marginLeft: '4px'
                              },
                              slot: new ElWarningSvg()
                            })
                          }),
                        ]
                      })
                    }
                  }),
                  new Div({
                    class: 'statistic-footer',
                    // styleObj: $cardFooter,
                    slot: [
                      new Div({
                        class: 'footer-item',
                        // styleObj: $cardFooterItem,
                        slot: [
                          new Span({
                            slot: 'month on month'
                          }),
                          new Span({
                            class: 'red',
                            // styleObj: {
                            //   ...$cardFooterItemLastSpan,
                            //   color: $colors.error.base // red
                            // },
                            slot: [
                              '12%',
                              new TdIcon({
                                slot: new ElCaretBottomSvg()
                              })
                            ]
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          new TdCol({
            span: 8,
            slot: [
              new Div({
                class: 'statistic-card',
                // styleObj: $card,
                slot: [
                  new TdStatistic({
                    value: 72000,
                    valueStyle: {
                      fontSize: '28px'
                    },
                    slots: {
                      title: new Div({
                        styleObj: {
                          display: 'inline-flex',
                          alignItems: 'center'
                        },
                        slot: 'New transactions today',
                      })
                    }
                  }),
                  new Div({
                    class: 'statistic-footer',
                    // styleObj: $cardFooter,
                    slot: [
                      new Div({
                        class: 'footer-item',
                        // styleObj: $cardFooterItem,
                        slot: [
                          new Span({
                            slot: 'than yesterday'
                          }),
                          new Span({
                            class: 'green',
                            // styleObj: {
                            //   ...$cardFooterItemLastSpan,
                            //   color: $colors.success.base // green
                            // },
                            slot: [
                              '16%',
                              new TdIcon({
                                slot: new ElCaretTopSvg()
                              })
                            ]
                          })
                        ]
                      }),
                      new Div({
                        class: 'footer-item',
                        // styleObj: $cardFooterItem,
                        slot: new TdIcon({
                          size: 14,
                          slot: new ElArrowRightSvg()
                        })
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      })
    );
  }
}
