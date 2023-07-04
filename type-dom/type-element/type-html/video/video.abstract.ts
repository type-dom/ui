import { TypeHtml } from '../type-html.abstract';
import { ITypeVideo } from './video.interface';
export abstract class TypeVideo extends TypeHtml implements ITypeVideo {
  nodeName: 'video';
  dom: HTMLVideoElement;
  protected constructor() {
    super('video');
    this.nodeName = 'video';
    this.dom = document.createElement(this.nodeName);
  }
}
