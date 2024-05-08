import { TypeComponent } from '@type-dom/framework';
import { CollapsibleBoxContents } from './contents/contents';
import { ExpandHeading } from './heading/expand-heading';

/**
 * 可收缩盒子组件
 */
export class CollapsibleBox extends TypeComponent {
  className: 'CollapsibleBox' | string;
  public parent?: TypeComponent;
  override childNodes: [ExpandHeading, CollapsibleBoxContents];
  heading: ExpandHeading;
  contents: CollapsibleBoxContents;

  constructor() {
    super('div');
    this.className = 'CollapsibleBox';
    this.styleObj = {
      // borderTop: '1px solid #dddddd',
      // borderBottom: '1px solid #dddddd',
      listStyle: 'none',
      padding: '3px',
      marginBottom: '5px'
    };
    this.attrObj = {
      name: 'collapsible-box'
    };
    this.heading = new ExpandHeading('标题');
    this.heading.parent = this;
    this.contents = new CollapsibleBoxContents();
    // 继承的类不能赋值this.contents;只能给this.contents添加子元素
    this.contents.parent = this;
    this.childNodes = [this.heading, this.contents];
  }

  // contents重新赋值后，children刷新。render渲染会变。
  override get children() {
    return [this.heading, this.contents];
  }
}
