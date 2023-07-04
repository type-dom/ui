import { TextNode } from '../../../text-node/text-node.class';
import { XElement } from '../../../x-element/x-element.class';
import { TypeHtml } from '../type-html.abstract';
import { buttonStyle } from './button.const';
import { ITypeButton } from './button.interface';
// todo 所有继承的具体类，应该统一成一个封装的自定义Button组件。而不是象现在这样，各自定义新的具体类。
export abstract class TypeButton extends TypeHtml implements ITypeButton {
  abstract className: string;
  abstract parent: TypeHtml | XElement;
  nodeName: 'button';
  dom: HTMLButtonElement;
  textNode: TextNode;
  protected constructor() {
    super('button');
    this.nodeName = 'button';
    this.dom = document.createElement(this.nodeName);
    this.propObj = {
      styleObj: Object.assign({}, buttonStyle),
      attrObj: {
        type: 'button'
      }
    };
    this.textNode = new TextNode(this, '按钮');
    this.childNodes = [this.textNode]; // 默认值
  }
  setTitle(title: string): void {
    this.textNode.setText(title);
  }
}
