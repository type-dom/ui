import { IStyle, ITypeFooter, TextNode, TypeElement } from '@type-dom/framework';
export interface ITdFooter extends ITypeFooter {
  className: 'TdFooter',
}
export interface ITdFooterConfig {
  height: string;
  name: string;
  text: string;
  styleObj: Partial<IStyle>;
  childNodes: (TypeElement | TextNode)[];
}
