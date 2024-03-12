import { TypeDiv } from '@type-dom/framework';
import { OverlayContainer } from '../container';
export class OverlayBody extends TypeDiv {
  className: 'OverlayBody';
  parent?: OverlayContainer;
  constructor() {
    super();
    this.className = 'OverlayBody';
    this.propObj = {
      styleObj: {
        padding: '30px 20px',
        fontSize: '14px',
        wordBreak: 'break-all',
      },
      attrObj: {
        name: 'overlay-body',
      }
    };
  }
}
