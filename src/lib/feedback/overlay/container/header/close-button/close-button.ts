import { fromEvent } from 'rxjs';
import { TypeButton, StyleCursor, StylePosition } from '@type-dom/framework';
import { TdCloseSvg } from '@type-dom/svgs';
import { OverlayHeader } from '../header';

export class CloseButton extends TypeButton {
  className: 'CloseButton';
  override parent?: OverlayHeader;
  override childNodes: [TdCloseSvg];
  private readonly svg: TdCloseSvg;

  constructor() {
    super();
    this.className = 'CloseButton';
    this.styleObj = {
      cursor: StyleCursor.pointer,
      position: StylePosition.absolute,
      top: '20px',
      right: '20px',
      padding: '0',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      fontSize: '16px'
    };
    this.attrObj = {
      name: 'close-button'
    };
    this.svg = new TdCloseSvg({ parent: this });
    this.childNodes = [this.svg];
  }

  override initEvents(): void {
    this.subscriptions.push(
      fromEvent(this.dom, 'click').subscribe(() => {
        this.parent?.parent?.parent?.hide();
      })
    );
  }
}
