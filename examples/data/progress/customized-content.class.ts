import { createClass, Div, Span, TypeDiv } from '@type-dom/framework';
import { TdButton, TdProgress } from '@type-dom/ui';
import { ElCheckSvg } from '@type-dom/svgs';


export class CustomizedContent extends TypeDiv {
  className = 'CustomizedContent';

  setup() {
    this.addChild(new Div({
      class: 'demo-progress',
      slot: [
        new TdProgress({
          percentage: 50,
          slot: new TdButton({
            text: true,
            slot: 'Content'
          })
        }),
        new TdProgress({
          textInside: true,
          strokeWidth: 20,
          percentage: 50,
          status: 'exception',
          slot: new Span({
            slot: 'Content'
          }),
        }),
        new TdProgress({
          type: 'circle',
          percentage: 100,
          status: 'success',
          slot: new TdButton({
            icon: new ElCheckSvg(),
            circle: true,
          })
        }),
        new TdProgress({
          type: 'dashboard',
          percentage: 80,
          slot: [
            new Span({
              class: 'percentage-value',
              slot: 80
            }),
            new Span({
              class: 'percentage-label',
              slot: 'Progressing'
            })
          ]
        })
      ]
    }))
    createClass('percentage-value', {
      display: 'block',
      marginTop: '10px',
      fontSize: '28px',
    });
    createClass('percentage-label', {
      display: 'block',
      marginTop: '10px',
      fontSize: '12px',
    })
    createClass('demo-progress', {
      marginBottom: '15px',
      maxWidth: '600px',
    })
    createClass('demo-progress', {
      marginRight: '15px'
    })
  }
}
