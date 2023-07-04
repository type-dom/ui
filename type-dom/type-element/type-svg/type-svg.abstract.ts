import { TextNode } from '../../text-node/text-node.class';
import { TypeElement } from '../type-element.abstract';
import { ITypeSvg } from './type-svg.interface';
export abstract class TypeSvg extends TypeElement implements ITypeSvg {
  abstract className: string;
  abstract nodeName: string;
  abstract dom: SVGElement;
  childNodes: (TypeSvg | TextNode)[];
  protected constructor(nodeName: string) {
    super(nodeName);
    this.childNodes = [];
  }
}
