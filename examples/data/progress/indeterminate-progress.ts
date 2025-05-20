import { createClass, TypeDiv } from '@type-dom/framework';
import { TdProgress } from '@type-dom/ui';

export class IndeterminateProgress extends TypeDiv {
  className = 'IndeterminateProgress';

 override  setup() {
    const format = (percentage: any) => (percentage === 100 ? 'Full' : `${percentage}%`)
    this.attr.addClass('demo-progress');
    this.addChildren(
      new TdProgress({
        percentage: 50,
        indeterminate: true,
      }),
      new TdProgress({
        percentage: 100,
        format: format,
        indeterminate: true,
      }),
      new TdProgress({
        percentage: 100,
        status: 'success',
        indeterminate: true,
        format: format,
      }),
      new TdProgress({
        percentage: 100,
        status: 'warning',
        indeterminate: true,
        duration: 1
      }),
      new TdProgress({
        percentage: 50,
        status: 'exception',
        indeterminate: true,
      })
    )

    createClass('demo-progress td-progress--line', {
      marginBottom: '15px',
      maxWidth: '600px'
    })
  }
}
