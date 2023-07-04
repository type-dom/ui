import { TypeDiv } from '../../../../type-dom/type-element/type-html/div/div.abstract';
import { OverlayContainer } from '../container';
import { CancelButton } from './cancel-button/cancel-button';
import { ConfirmButton } from './confirm-button/confirm-button';

export class OverlayFooter extends TypeDiv {
  className: 'OverlayFooter';
  cancelBtn: CancelButton;
  confirmBtn: ConfirmButton;

  constructor(public parent: OverlayContainer) {
    super();
    this.className = 'OverlayFooter';
    this.addStyleObj({
      padding: '20px',
      paddingTop: '10px',
      textAlign: 'right',
      boxSizing: 'border-box',
    });
    this.addAttrName('overlay-foot');
    this.cancelBtn = new CancelButton(this);
    // cancelBtn.hide();
    // this.cancelBtn.setTitle('取消');
    this.confirmBtn = new ConfirmButton(this);
    // this.confirmBtn.setTitle('确定');
    this.childNodes = [this.cancelBtn, this.confirmBtn];
  }
}
