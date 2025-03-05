import { createClass, Div, TypeDiv } from '@type-dom/framework';
import { TdProgress } from '@type-dom/ui';

export class LinearProgressBar extends TypeDiv {
  className = 'LinearProgressBar';

  setup() {
    const format = (percentage: number) => (percentage === 100 ? 'Full' : `${percentage}%`)
    this.addChildren(
      new Div({
        class: 'demo-progress',
        slot: [
          new TdProgress({
            percentage: 50,
          }),
          new TdProgress({
            percentage: 100,
            format: format,
          }),
          new TdProgress({
            percentage: 100,
            status: 'success',
          }),
          new TdProgress({
            percentage: 100,
            status: 'warning'
          }),
          new TdProgress({
            percentage: 50,
            status: 'exception'
          })
        ]
      })
    )

    createClass('demo-progress td-progress--line', {
      marginBottom: '15px',
      maxWidth: '600px',
    })
  }
}
