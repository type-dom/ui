import { fromEvent } from 'rxjs';
import { TypeButton } from '@type-dom/framework';
import { OverlayFooter } from '../footer';
export class CancelButton extends TypeButton {
  className: 'CancelButton';
  parent?: OverlayFooter;
  constructor() {
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
  }
  initEvents(): void {
    if (!this.parent?.parent?.parent) {
      console.error('this.parent?.parent?.parent is undefined . ');
    }
    this.events.push(
      fromEvent(this.dom, 'click').subscribe(() => {
        this.parent?.parent?.parent?.hide();
      }),
    );
  }
}
