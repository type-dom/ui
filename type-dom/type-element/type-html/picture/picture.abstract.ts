import { TypeHtml } from '../type-html.abstract';
import { ITypePicture } from './picture.interface';
export abstract class TypePicture extends TypeHtml implements ITypePicture {
  nodeName: 'picture';
  dom: HTMLPictureElement;
  protected constructor() {
    super('picture');
    this.nodeName = 'picture';
    this.dom = document.createElement(this.nodeName);
  }
}
