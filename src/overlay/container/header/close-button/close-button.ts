import { fromEvent } from 'rxjs';
import { TypeButton } from 'type-dom.ts';
// import { TypeButton } from '../../../../../type-dom/type-element/type-html/button/button.abstract';
import { Cursor, StylePosition } from '../../../../style/style.enum';
import { CloseSvg } from '../../../../svgs/close/close';
import { OverlayHeader } from '../header';

export class CloseButton extends TypeButton {
  className: 'CloseButton';
  childNodes: [CloseSvg];
  private readonly svg: CloseSvg;

  constructor(public parent: OverlayHeader) {
    super();
    this.className = 'CloseButton';
    this.propObj = {
      styleObj: {
        cursor: Cursor.pointer,
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

    this.svg = new CloseSvg(this);
    this.childNodes = [this.svg];

    this.initEvents();
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'click').subscribe(() => {
        this.parent.parent.parent.hide();
      }),
    );
  }
}
