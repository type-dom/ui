import { TypeDiv, Div, onMounted, createClass } from '@type-dom/framework';
import { TdButton, TdButtonGroup, TdProgress } from '@type-dom/ui';
import { ElMinusSvg, ElPlusSvg } from '@type-dom/svgs';
import { computed, signal } from '@type-dom/signals';


export class StripedProgress extends TypeDiv {
  className = 'StripedProgress';
  setup() {
    this.attr.addClass('demo-progress');

    const percentage = signal<number>(70)
    const duration = computed(() => Math.floor(percentage.get() / 10))

    const increase = () => {
      percentage.set(percentage.get() + 10); // += 10
      if (percentage.get() > 100) {
        percentage.set(100)
      }
    }
    const decrease = () => {
      percentage.set(percentage.get() - 10); // -= 10
      if (percentage.get() < 0) {
        percentage.set(0)
      }
    }
    this.addChildren(
      new TdProgress({
        percentage: 50,
        strokeWidth: 15,
        striped: true,
      }),
      new TdProgress({
        percentage: 30,
        strokeWidth: 15,
        status: 'warning',
        striped: true,
        stripedFlow: true,
      }),
      new TdProgress({
        percentage: 100,
        strokeWidth: 15,
        status: 'success',
        striped: true,
        stripedFlow: true,
        duration: 10,
      }),
      new TdProgress({
        percentage: percentage,
        strokeWidth: 15,
        status: 'exception',
        striped: true,
        stripedFlow: true,
        duration: duration,
      }),
      new TdButtonGroup({
        slot: [
          new TdButton({
            icon: new ElMinusSvg(),
            events: {
              click: decrease,
            }
          }),
          new TdButton({
            icon: new ElPlusSvg(),
            events: {
              click: increase,
            }
          })
        ]
      })
    )
    createClass('demo-progress td-progress--line', {
      marginBottom: '15px',
      maxWidth: '600px'
    })
  }
}
