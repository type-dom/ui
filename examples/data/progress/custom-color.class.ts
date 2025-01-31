import { createClass, Div, TypeDiv } from '@type-dom/framework';
import { signal } from '@type-dom/signals';
import { TdButton, TdButtonGroup, TdProgress } from '@type-dom/ui';
import { ElMinusSvg, ElPlusSvg } from '@type-dom/svgs';


export class CustomColor extends TypeDiv {
  className = 'CustomColor';

  override setup() {
    const percentage = signal(20)
    const customColor = signal('#409eff')

    const customColors = [
      { color: '#f56c6c', percentage: 20 },
      { color: '#e6a23c', percentage: 40 },
      { color: '#5cb87a', percentage: 60 },
      { color: '#1989fa', percentage: 80 },
      { color: '#6f7ad3', percentage: 100 },
    ]

    const customColorMethod = (percentage: number) => {
      if (percentage < 30) {
        return '#909399'
      }
      if (percentage < 70) {
        return '#e6a23c'
      }
      return '#67c23a'
    }
    const increase = () => {
      percentage.set(percentage.get() + 10);
      if (percentage.get() > 100) {
        percentage.set(100)
      }
    }
    const decrease = () => {
      percentage.set(percentage.get() - 10)
      if (percentage.get() < 0) {
        percentage.set(0)
      }
    }

    createClass('demo-progress', {
      marginBottom: '15px',
      maxWidth: '600px'
    })

    this.addChild(new Div({
      class: 'demo-progress',
      slot: [
        new TdProgress({
          percentage: percentage,
          color: customColor,
        }),
        new TdProgress({
          percentage: percentage,
          color: customColorMethod,
        }),
        new TdProgress({
          percentage: percentage,
          color: customColors,
        }),
        new TdProgress({
          percentage: percentage,
          color: customColors,
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
  }
}
