import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { createClass, Div, TypeDiv } from '@type-dom/framework';
import { TdButton, TdCol, TdCountDown, TdIcon, TdRow } from '@type-dom/ui';
import { ElCalendarSvg } from '@type-dom/svgs';
import { signal } from '@type-dom/signals';

export class CountDownExample extends TypeDiv {
  className = 'StatisticCountDownExample';

  constructor() {
    super();
    const value = signal(Date.now() + 1000 * 60 * 60 * 7);
    const value1 = signal(Date.now() + 1000 * 60 * 60 * 24 * 2);
    const value2 = signal(dayjs().add(1, 'month').startOf('month') as Dayjs);

    // function reset() {
    //   value1.set(Date.now() + 1000 * 60 * 60 * 24 * 2);
    // }
    createClass('td-col', {
      textAlign: 'center',
    })
    createClass('countdown-footer', {
      marginTop: '8px'
    });
    this.addChild(
      new TdRow({
        slot: [
          new TdCol({
            span: 8,
            slot: [
              new TdCountDown({
                title: 'Start to grab',
                value: value
              })
            ]
          }),
          new TdCol({
            span: 8,
            slot: [
              new TdCountDown({
                title: 'Remaining VIP time',
                format: 'HH:mm:ss',
                value: value1,
              }),
              new TdButton({
                class: 'countdown-footer',
                type: 'primary',
                slot: 'Reset',
                events: {
                  click: () => {
                    // 要用箭头函数，否则this指向有问题
                    console.log('click reset button');
                    value1.set(Date.now() + 1000 * 60 * 60 * 24 * 2);
                  }
                }
              })
            ]
          }),
          new TdCol({
            span: 8,
            slot: [
              new TdCountDown({
                format: 'DD [days] HH:mm:ss',
                value: value2,
                slots: {
                  title: new Div({
                    styleObj: {
                      display: 'inline-flex',
                      alignItems: 'center'
                    },
                    slot: [
                      new TdIcon({
                        size: '12',
                        styleObj: {
                          marginRight: '4px'
                        },
                        slot: new ElCalendarSvg()
                      }),
                      'Still to go until preview month'
                    ]
                  })
                }
              }),
              new Div({
                class: 'countdown-footer',
                slot: value2.get().format('YYYY-MM-DD'),
              })
            ]
          })
        ]
      })
    );
  }
}
