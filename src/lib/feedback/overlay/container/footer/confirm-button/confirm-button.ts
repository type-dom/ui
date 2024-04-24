import { fromEvent } from 'rxjs';
import { TextNode, TypeButton } from '@type-dom/framework';
import { OverlayFooter } from '../footer';

export class ConfirmButton extends TypeButton {
  className: 'ConfirmButton';
  override parent?: OverlayFooter;
  override childNodes: [TextNode];

  constructor() {
    super();
    this.className = 'ConfirmButton';
    this.styleObj = {
      backgroundColor: '#1890ff',
      color: '#fff',
      borderColor: '#1890ff',
      margin: 'auto 10px'
    };
    this.attrObj = {
      name: 'confirm-button'
    };
    this.setTitle('确认');
    this.childNodes = [this.textNode];
  }

  override initEvents(): void {
    if (!this.parent?.parent?.parent) {
      console.error('this.parent?.parent?.parent is undefined . ');
    }
    this.subscriptions.push(
      fromEvent(this.dom, 'click').subscribe(() => {
        this.parent?.parent?.parent?.hide();
      })
    );
  }
}
