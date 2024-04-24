import { StyleDisplay, TypeComponent } from '@type-dom/framework';
import { CollapsibleBox } from '../collapsible-box';

export class CollapsibleBoxContents extends TypeComponent {
  className: 'CollapsibleBoxContents' | string;
  public parent?: CollapsibleBox;

  // childNodes: ControlMenu[];
  constructor() {
    super('div');
    this.className = 'CollapsibleBoxContents';
    this.styleObj = {
      display: StyleDisplay.flex,
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      // width: '194px',
      border: '1px solid #a0a0a0'
    };
    this.attrObj = {
      name: 'collapsible-box-contents'
    };
    this.childNodes = [];
  }
}
