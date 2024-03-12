import { fromEvent } from 'rxjs';
import { TypeButton, StyleCursor, StylePosition } from '@type-dom/framework';
import { TdCloseSvg } from '@type-dom/svgs';
import { OverlayHeader } from '../header';
export class CloseButton extends TypeButton {
  className: 'CloseButton';
  parent?: OverlayHeader;
  childNodes: [TdCloseSvg];
  private readonly svg: TdCloseSvg;
  constructor() {
    super();
    this.className = 'CloseButton';
    this.propObj = {
      styleObj: {
        cursor: StyleCursor.pointer,
        position: StylePosition.absolute,
        top: '20px',
        right: '20px',
        padding: '0',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        fontSize: '16px',
      },
      attrObj: {
        name: 'close-button',
      }
    };
    this.svg = new TdCloseSvg(this);
    this.childNodes = [this.svg];
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'click').subscribe(() => {
        this.parent?.parent?.parent?.hide();
      }),
    );
  }
}
