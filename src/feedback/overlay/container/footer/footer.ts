import { fromEvent } from 'rxjs';
import { TypeDiv } from 'type-dom.ts';
import { OverlayContainer } from '../container';
import { TdButton } from '../../../../basic/td-button/td-button.class';
// import { CancelButton } from './cancel-button/cancel-button';
// import { ConfirmButton } from './confirm-button/confirm-button';
export class OverlayFooter extends TypeDiv {
  className: 'OverlayFooter';
  parent?: OverlayContainer;
  cancelBtn: TdButton;
  confirmBtn: TdButton;
  constructor() {
    super();
    this.className = 'OverlayFooter';
    this.addStyleObj({
      padding: '20px',
      paddingTop: '10px',
      textAlign: 'right',
      boxSizing: 'border-box',
    });
    this.addAttrName('overlay-foot');
    // this.cancelBtn = new CancelButton(this);
    this.cancelBtn = new TdButton({
      title: '取消',
    });
    // cancelBtn.hide();
    // this.cancelBtn.setTitle('取消');
    this.confirmBtn = new TdButton({
      title: '确定',
      type: 'primary'
    });
    this.confirmBtn.parent = this;
    this.confirmBtn.addStyleObj({
      marginLeft: '10px',
    });
    // this.confirmBtn.setTitle('确定');
    this.childNodes = [this.cancelBtn, this.confirmBtn];
  }
  initEvents() {
    this.events.push(
      fromEvent(this.cancelBtn.dom, 'click').subscribe(() => {
        console.log('cancelBtn click . ');
        this.parent?.parent?.hide();
      }),
      fromEvent(this.confirmBtn.dom, 'click').subscribe(() => {
        console.log('confirmBtn click . ');
        this.parent?.parent?.hide();
      }),
    );
  }
}
