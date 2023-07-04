import { TextNode } from '../../../text-node/text-node.class';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeLabel } from '../../../type-element/type-html/label/label.abstract';
import { ILabel } from './label.interface';
export class Label extends TypeLabel implements ILabel {
  className: 'Label';
  childNodes: TextNode[];
  constructor(public parent: TypeHtml) {
    super();
    this.className = 'Label';
    this.propObj.attrObj = {
      name: 'label'
    };
    this.childNodes = [];
  }

  createInstance(labelLiteral: ILabel): void {
    this.setPropObj(labelLiteral.propObj);
    for (const idx in labelLiteral.childNodes) {
      if (this.childNodes[idx]) {
        this.childNodes[0].setText(labelLiteral.childNodes[0].nodeValue);
      } else {
        const child = new TextNode(this, labelLiteral.childNodes[0].nodeValue);
        this.appendChild(child);
      }
    }
  }
}
