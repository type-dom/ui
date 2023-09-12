import { Display, TypeComponent } from 'type-dom.ts';
import { CollapsibleBox } from '../collapsible-box';
export class CollapsibleBoxContents extends TypeComponent {
  className: 'CollapsibleBoxContents' | string;
  // childNodes: ControlMenu[];
  constructor(public parent: CollapsibleBox) {
    super('div');
    this.className = 'CollapsibleBoxContents';
    this.propObj = {
      styleObj: {
        display: Display.flex,
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
