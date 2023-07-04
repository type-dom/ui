import { fromEvent } from 'rxjs';
import { TypeButton } from '../../../../../type-dom/type-element/type-html/button/button.abstract';
import { OverlayFooter } from '../footer';

export class CancelButton extends TypeButton {
  className: 'CancelButton';
  constructor(public parent: OverlayFooter) {
    super();
    this.className = 'CancelButton';
    this.addStyleObj({
      // backgroundColor: '#f00',
      // color: '#FFF',
      margin: 'auto 10px',
      // outline: 'none',
      // border: '1px solid #f00',
    });
    this.addAttrName('cancel-button');
    this.setTitle('取消');
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
