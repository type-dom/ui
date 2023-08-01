import { fromEvent } from 'rxjs';
import { TypeDiv, StylePosition } from 'type-dom.ts';
import { Overlay } from '../overlay.abstract';
import { OverlayHeader } from './header/header';
import { OverlayBody } from './body/body';
import { OverlayFooter } from './footer/footer';
export class OverlayContainer extends TypeDiv {
  className: 'OverlayContainer';
  childNodes: [OverlayHeader, OverlayBody, OverlayFooter];
  header: OverlayHeader;
  body: OverlayBody;
  footer: OverlayFooter;
  constructor(public parent: Overlay) {
    super();
    this.className = 'OverlayContainer';
    this.propObj = {
      styleObj: {
        position: StylePosition.relative,
        margin: '15vh auto 50px',
        width: '50%',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        borderRadius: '4px',
        backgroundColor: '#FFF',
        padding: '20px',
      },
      attrObj: {
        name: 'overlay-container'
      }
    };
    this.header = new OverlayHeader(this);
    this.body = new OverlayBody(this);
    this.footer = new OverlayFooter(this);
    this.childNodes = [this.header, this.body, this.footer];
    this.initEvents();
  }

  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'click').subscribe((e) => {
        e.stopPropagation();
      })
    );
  }
}
