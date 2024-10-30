import { TypeDiv } from '@type-dom/framework';
import { CollapsibleBox } from '../collapsible-box';

export class CollapsibleBoxContents extends TypeDiv {
  className: 'CollapsibleBoxContents' | string;
  public override parent?: CollapsibleBox;

  // childNodes: ControlMenu[];
  constructor() {
    super();
    this.className = 'CollapsibleBoxContents';
    this.style.addObj({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      // width: '194px',
      border: '1px solid #a0a0a0'
    });
    this.attr.addName('collapsible-box-contents');
    this.childNodes = [];
  }
}
