import { ITypeHeader, TextNode, TypeElement } from '@type-dom/framework';
export interface ITdHeader extends ITypeHeader {
  className: 'TdHeader';
}
export interface ITdHeaderConfig {
  name: string;
  text: string;
  height: string; // default 60px
  childNodes: (TypeElement | TextNode)[];
}
