import { TypeDiv } from 'type-dom.ts';
import { OverlayContainer } from '../container';
import { TdButton } from '../../../../basic/td-button/td-button.class';
import {fromEvent} from "rxjs";
// import { CancelButton } from './cancel-button/cancel-button';
// import { ConfirmButton } from './confirm-button/confirm-button';
export class OverlayFooter extends TypeDiv {
  className: 'OverlayFooter';
  cancelBtn: TdButton;
  confirmBtn: TdButton;
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
    // this.cancelBtn = new CancelButton(this);
    this.cancelBtn = new TdButton(this, {
      title: '取消',
    });
    // cancelBtn.hide();
    // this.cancelBtn.setTitle('取消');
    this.confirmBtn = new TdButton(this, {
      title: '确定',
      type: 'primary'
    });
    this.confirmBtn.addStyleObj({
      marginLeft: '10px',
    });
    // this.confirmBtn.setTitle('确定');
    this.childNodes = [this.cancelBtn, this.confirmBtn];
    this.initEvents();
  }
  initEvents() {
    this.events.push(
      fromEvent(this.cancelBtn.dom, 'click').subscribe(() => {
        console.log('cancelBtn click . ');
        this.parent.parent.hide();
      }),
      fromEvent(this.confirmBtn.dom, 'click').subscribe(() => {
        console.log('confirmBtn click . ');
        this.parent.parent.hide();
      }),
    );
  }
}
