import { TextNode, TypeNode, TypeOption } from '@type-dom/framework';
import { FieldSelect } from '../field-select.class';
import { ISelectOption } from './option.interface';

export class SelectOption extends TypeOption implements ISelectOption {
  className: 'SelectOption';
  override parent?: FieldSelect;
  override childNodes: TypeNode[];

  constructor() {
    super();
    this.className = 'SelectOption';
    this.attr.addName('option');
    this.childNodes = [new TextNode('一个选项')];
  }
}
