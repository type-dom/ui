import { TypeDiv } from '../../../../type-dom/type-element/type-html/div/div.abstract';
import { OverlayContainer } from '../container';
import { OverlayTitle } from './title/title';
import { CloseButton } from './close-button/close-button';

export class OverlayHeader extends TypeDiv {
  className: 'OverlayHeader';
  childNodes: [OverlayTitle, CloseButton];
  title: OverlayTitle;
  closeBtn: CloseButton;

  constructor(public parent: OverlayContainer) {
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
    this.title = new OverlayTitle(this);
    this.closeBtn = new CloseButton(this);
    this.childNodes = [this.title, this.closeBtn];
  }
}
