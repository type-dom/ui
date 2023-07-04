import { TypeHtml } from '../type-html/type-html.abstract';
import { IComponent, ITypeComponent } from './type-component.interface';
import { TypeNode } from '../../type-node/type-node.abstract';
/**
 * 组件基类
 */
export abstract class TypeComponent extends TypeHtml implements ITypeComponent {
  abstract parent: TypeHtml;
  // childNodes: TypeNode[];
  abstract setConfig(config: any): void
  protected constructor(nodeName: string) {
    super(nodeName);
    this.childNodes = [];
  }
  createItem(parent: TypeHtml, node: IComponent) {
    console.log('type-component createItem . ');
    if (node.TypeClass === undefined) {
      console.error('node.TypeClass is undefined . ');
      return;
    }
    // XElement 必须有nodeName,默认为div。
    const item = new node.TypeClass() as TypeComponent; // 创建类实例
    item.parent = parent;
    console.log('item is ', item);
    if (node.propObj) {
      item.addStyleObj(node.propObj.styleObj);
      item.addAttrObj(node.propObj.attrObj);
    }
    if (node.config) {
      item.setConfig(node.config);
    }
    return item;
  }
  createItems(parent: TypeHtml, nodes: IComponent[]) {
    console.log('type-component createItems . ');
    const items: TypeNode[] = [];
    for (const node of nodes) {
      if (node.TypeClass === undefined) {
        console.error('node.TypeClass is undefined . ');
        continue;
      }
      const item = this.createItem(parent, node);
      if (item) {
        items.push(item);
      }
    }
    return items;
  }
}
