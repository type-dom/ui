import { IStyle } from '@type-dom/css-type';
import { $textColor } from '../../../../styles/var';
import { UI } from '../../../../ui/ui.abstract';
import { TdPopperContentInjectionContext, POPPER_CONTENT_INJECTION_KEY } from '../td-popper.const';
import { ITdPopperArrow, ITdPopperArrowConfig } from './arrow.interface';

export class TdPopperArrow extends UI implements ITdPopperArrow {
  className: 'TdPopperArrow';
  override props: ITdPopperArrowConfig;
  private arrowOffset?: number;
  arrowRef?: HTMLElement;
  private arrowStyle?: IStyle;

  constructor(params: ITdPopperArrowConfig = {}) {
    super();
    this.useTag('span');
    this.className = 'TdPopperArrow';
    this.attr.addName('td-popper-arrow');
    this.style.addObj({
      position: 'absolute',
      width: '10px',
      height: '10px',
      zIndex: -1,
      //   todo next is ::before style
      //   &::before {
      //   position: absolute;
      //   width: 10px;
      //   height: 10px;
      //   z-index: -1;
      content: ' ',
      transform: 'rotate(45deg)',
      // background: getCssVar('text-color', 'primary'),
      backgroundColor: $textColor.primary,
      boxSizing: 'border-box'
      // }
    });
    this.buildProps<ITdPopperArrowConfig>({
      arrowOffset: 5,
    });
    this.props = this.useParams(params);
  }

  override setup() {
    const { arrowOffset, arrowRef, arrowStyle } = this.inject<TdPopperContentInjectionContext>(
      POPPER_CONTENT_INJECTION_KEY,
      undefined
    )!;
    this.arrowOffset = arrowOffset;
    this.arrowRef = arrowRef;
    this.arrowStyle = arrowStyle;
  }

  override beforeDestroy() {
    this.arrowRef = undefined;
  }

  setArrowOffset(offset: number) {
    this.setProp<ITdPopperArrowConfig>('arrowOffset', offset);
    if (offset) {
      this.arrowOffset = offset;
    }
  }
}
