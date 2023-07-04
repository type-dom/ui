import { TypeHtml } from '../type-html.abstract';
import { ITypeTrack } from './track.interface';
export abstract class TypeTrack extends TypeHtml implements ITypeTrack {
  nodeName: 'track';
  dom: HTMLTrackElement;
  protected constructor() {
    super('track');
    this.nodeName = 'track';
    this.dom = document.createElement(this.nodeName);
  }
}
