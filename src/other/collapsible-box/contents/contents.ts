import { StyleDisplay, TypeComponent } from 'type-dom.ts';
import { CollapsibleBox } from '../collapsible-box';
export class CollapsibleBoxContents extends TypeComponent {
  className: 'CollapsibleBoxContents' | string;
  public parent?: CollapsibleBox;
  // childNodes: ControlMenu[];
  constructor() {
    super('div');
    this.className = 'CollapsibleBoxContents';
    this.propObj = {
      styleObj: {
        display: StyleDisplay.flex,
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        // width: '194px',
        border: '1px solid #a0a0a0',
      },
      attrObj: {
        name: 'collapsible-box-contents',
      }
    };
    this.childNodes = [];
  }
}
