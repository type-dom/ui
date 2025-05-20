import { createClass, Div, onMounted, TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdButton, TdButtonGroup, TdProgress } from '@type-dom/ui';
import { ElMinusSvg, ElPlusSvg } from '@type-dom/svgs';

export class DashboardProgressBar extends TypeDiv {
  className = 'DashboardProgressBar';

 override  setup() {

    const percentage = signal(10)
    const percentage2 = signal(0)

    const colors = [
      { color: '#f56c6c', percentage: 20 },
      { color: '#e6a23c', percentage: 40 },
      { color: '#5cb87a', percentage: 60 },
      { color: '#1989fa', percentage: 80 },
      { color: '#6f7ad3', percentage: 100 },
    ]

    const increase = () => {
      percentage.set(percentage.get() + 10)
      if (percentage.get() > 100) {
        percentage.set(100)
      }
    }
    const decrease = () => {
      percentage.set(percentage.get() - 10);
      if (percentage.get() < 0) {
        percentage.set(0)
      }
    }
    onMounted(() => {
      setInterval(() => {
        percentage2.set((percentage2.get() % 100) + 10)
      }, 500)
    })

    this.addChild(new Div({
      class: 'demo-progress',
      slot: [
        new TdProgress({
          type: 'dashboard',
          percentage: percentage,
          color: colors,
        }),
        new TdProgress({
          type: 'dashboard',
          percentage: percentage2,
          color: colors,
        }),
        new Div({
          slot: new TdButtonGroup({
            slot: [
              new TdButton({
                icon: new ElMinusSvg(),
                events: {
                  click: decrease
                }
              }),
              new TdButton({
                icon: new ElPlusSvg(),
                events: {
                  click: increase
                }
              })
            ]
          })
        })
      ]
    }))

    createClass('demo-progress td-progress--line', {
      marginBottom: '15px',
      maxWidth: '600px'
    });
    createClass('demo-progress td-progress--circle', {
      marginBottom: '0'
    });
  }
}
