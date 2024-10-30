import { Div, P, SvgCircle, Transition } from '@type-dom/framework';
import { SvgSvg } from '@type-dom/svgs';
import { UI } from '../../../ui/ui.abstract';
import { ITdLoading, ITdLoadingConfig } from './td-loading.interface';

export class TdLoading extends UI<undefined> implements ITdLoading {
  className: 'TdLoading';
  override props: ITdLoadingConfig;
  private transition: Transition;
  private mask: Div;
  private svg: boolean | string | undefined;
  private spinner: SvgSvg;
  private spinnerText?: P;

  constructor(params: ITdLoadingConfig = {}) {
    super();
    this.useTag('fragment');
    this.className = 'TdLoading';

    this.transition = new Transition({
      name: 'td-loading-fade',
      emits: {
        afterLeave: () => {
          console.log('afterLeave');
        }
      }
    });
    this.svg = params?.spinner || params?.svg;
    this.spinner = new SvgSvg({
      name: 'spinner',
      attrObj: {
        viewBox: params?.svgViewBox ? params.svgViewBox : '0 0 50 50'
      },
      childNodes: [
        new SvgCircle({
          attrObj: {
            cx: '25',
            cy: '25',
            r: '20',
            fill: 'none'
          }
        })
      ]
    });
    if (params?.text) {
      this.spinnerText = new P({
        text: params.text
      });
    }

    this.mask = new Div({
      name: 'mask',
      styleObj: {
        display: params?.visible ? 'block' : 'none'
      },
      childNodes: [
        new Div({
          name: 'spinner',
          init: (element) => {
            console.log('element is ', element);
            element?.addChild(this.spinner);
            if (this.spinnerText) {
              element?.addChild(this.spinnerText);
            }
          },
        })
      ]
    });
    this.transition.addChild(this.mask);
    this.addChild(this.transition);
    this.props = this.useParams(params);
  }

  static service(params: ITdLoadingConfig) {
    return new TdLoading(params);
  }

  close() {
  //   todo close
  }
}
