import { fromEvent } from 'rxjs';
import { TextNode, TypeButton } from 'type-dom.ts';
import { OverlayFooter } from '../footer';
export class ConfirmButton extends TypeButton {
  className: 'ConfirmButton';
  parent?: OverlayFooter;
  childNodes: [TextNode];
  constructor() {
    super();
    this.className = 'ConfirmButton';
    this.propObj = {
      styleObj: {
        backgroundColor: '#1890ff',
        color: '#fff',
        borderColor: '#1890ff',
        margin: 'auto 10px',
      },
      attrObj: {
        name: 'confirm-button',
      }
    };
    this.setTitle('确认');
    this.childNodes = [this.textNode];
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
