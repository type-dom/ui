import { createClass, Div, TypeDiv, useTransition } from '@type-dom/framework';
import { ElChatLineRoundSvg, ElMaleSvg } from '@type-dom/svgs';
import { TdCol, TdIcon, TdRow, TdStatistic } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class StatisticBasicExample extends TypeDiv {
  className = 'StatisticBasicExample';

  constructor() {
    super();
    const source = signal(0);
    const outputValue = useTransition(source, {
      duration: 1500,
    });
    source.set(17200);
    createClass('td-col', {
      textAlign: 'center',
    })
    this.addChild(
      new TdRow({
        slot: [
          new TdCol({
            span: 6,
            slot: [
              new TdStatistic({
                title: 'Daily active users',
                value: 268500
              })
            ]
          }),
          new TdCol({
            span: 6,
            slot: [
              new TdStatistic({
                value: 138,
                slots: {
                  title: new Div({
                    styleObj: {
                      display: 'inline-flex',
                      alignItems: 'center'
                    },
                    slot: [
                      'Ratio of men to women',
                      new TdIcon({
                        size: 12,
                        slot: new ElMaleSvg(),
                        styleObj: {
                          marginLeft: '4px'
                        }
                      })
                    ]
                  }),
                  suffix: '/ 100',
                }
              })
            ]
          }),
          new TdCol({
            span: 6,
            slot: [
              new TdStatistic({
                title: 'Total Transactions',
                value: outputValue
              })
            ]
          }),
          new TdCol({
            span: 6,
            slot: new TdStatistic({
              title: 'Feedback number',
              value: 562,
              slots: {
                suffix: new TdIcon({
                  slot: new ElChatLineRoundSvg(),
                  styleObj: {
                    verticalAlign: '-0.125em'
                  }
                })
              }
            })
          })
        ]
      })
    );
  }
}
