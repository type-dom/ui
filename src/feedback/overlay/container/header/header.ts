import { TypeDiv } from '@type-dom/framework';
import { OverlayContainer } from '../container';
import { OverlayTitle } from './title/title';
import { CloseButton } from './close-button/close-button';
export class OverlayHeader extends TypeDiv {
  className: 'OverlayHeader';
  parent?: OverlayContainer;
  childNodes: [OverlayTitle, CloseButton];
  title: OverlayTitle;
  closeBtn: CloseButton;
  constructor() {
    super();
    this.className = 'OverlayHeader';
    this.addStyleObj({
      padding: '20px',
      paddingBottom: '10px',
      boxSizing: 'border-box',
    });
    this.addAttrObj({
      name: 'overlay-header',
    });
    this.title = new OverlayTitle();
    this.closeBtn = new CloseButton();
    this.closeBtn.parent = this;
    this.childNodes = [this.title, this.closeBtn];
  }
}
