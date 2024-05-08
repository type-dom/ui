import { TextNode, TypeNode, TypeOption } from '@type-dom/framework';
import { FieldSelect } from '../field-select.class';
import { ISelectOption } from './option.interface';

export class SelectOption extends TypeOption implements ISelectOption {
  className: 'SelectOption';
  override parent?: FieldSelect;
  override childNodes: TypeNode[];
  override textNode: TextNode;

  constructor() {
    super();
    this.className = 'SelectOption';
    this.attrObj = {
      name: 'option'
    };
    this.textNode = new TextNode('一个选项');
    this.childNodes = [this.textNode];
  }

  // render(): void {
  //   console.error('option render . ');
  //   super.render();
  // }
}
