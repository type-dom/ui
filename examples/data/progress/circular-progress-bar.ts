import { Div, TypeDiv } from '@type-dom/framework';
import { TdProgress } from '@type-dom/ui';


export class CircularProgressBar extends TypeDiv {
  className = 'CircularProgressBar';

  constructor() {
    super();

  }

 override  setup() {
    // const props = this.props;
    this.style.addObj({
      marginRight: '15px'
    })
    this.addChild(new Div({
      class: 'demo-progress',
      slot: [
        new TdProgress({
          type: 'circle',
          percentage: 0,
        }),
        new TdProgress({
          type: 'circle',
          percentage: 25,
        }),
        new TdProgress({
          type: 'circle',
          percentage: 100,
          status: 'success'
        }),
        new TdProgress({
          type: 'circle',
          percentage: 70,
          status: 'warning'
        }),
        new TdProgress({
          type: 'circle',
          percentage: 50,
          status: 'exception'
        })
      ]
    }))
  }
}

