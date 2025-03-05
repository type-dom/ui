import { Div, SvgPath, TypeDiv } from '@type-dom/framework';
import { $button, TdButton } from '@type-dom/ui';
import { ElElemeSvg, ElLoadingSvg, SvgSvg } from '@type-dom/svgs';

export class ButtonLoadingExample extends TypeDiv {
  className = 'ButtonLoadingExample';

  constructor() {
    super();
    this.addChild(this.createLoadingButton());
  }

  createLoadingButton() {
    return new Div({
      slot: [
        new TdButton({
          name: 'loading-btn',
          type: 'primary',
          slot: 'Loading',
          loading: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'loading-btn',
          type: 'primary',
          slot: 'Loading',
          loading: true,
          // loadingText: 'Loading...',
          loadingIcon: new ElElemeSvg(),
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'loading-btn',
          type: 'primary',
          slot: 'Loading',
          loading: true,
          styleObj: {
            margin: '3px 10px'
          },
          slots: {
            loading: new Div({
              slot: [
                new SvgSvg({
                  class: 'circular',
                  attrObj: {
                    viewBox: '-10, -10, 50, 50'
                  },
                  styleObj: {
                    marginRight: '6px',
                    width: '18px',
                    height: '18px',
                    animation: 'loading-rotate 2s linear infinite'
                  },
                  slot: [
                    new SvgPath({
                      styleObj: {
                        animation: 'loading-dash 1.5s ease-in-out infinite',
                        strokeDasharray: '90, 150',
                        strokeDashoffset: 0,
                        // strokeWidth: 2,
                        // stroke: var(--el-button-text-color),
                        stroke: $button.textColor,
                        strokeLinecap: 'round',
                        strokeWidth: '4px; fill: rgba(0, 0, 0, 0)'
                      },
                      attrObj: {
                        fill: 'currentColor',
                        d: `
                          M 30 15
                          L 28 17
                          M 25.61 25.61
                          A 15 15, 0, 0, 1, 15 30
                          A 15 15, 0, 1, 1, 27.99 7.5
                          L 15 15
                        `
                      }
                    })
                  ]
                })
              ]
            })
          }
        })
      ]
    });
  }
}
