import { createClass, TypeDiv } from '@type-dom/framework';
import { TdProgress } from '@type-dom/ui';


export class InternalPercentage extends TypeDiv {
      className = 'InternalPercentage';

      setup() {
            this.attr.addClass('demo-progress');
            this.addChildren(
              new TdProgress({
                    textInside: true,
                    strokeWidth: 26,
                    percentage: 70
              }),
              new TdProgress({
                    textInside: true,
                    strokeWidth: 24,
                    percentage: 100,
                    status: 'success'
              }),
              new TdProgress({
                    textInside: true,
                    strokeWidth: 22,
                    percentage: 80,
                    status: 'warning'
              }),
              new TdProgress({
                    textInside: true,
                    strokeWidth: 20,
                    percentage: 50,
                    status: 'exception'
              })
            )

            createClass('demo-progress td-progress--line', {
                  marginBottom: '15px',
                  maxWidth: '600px'
            })
      }
}
