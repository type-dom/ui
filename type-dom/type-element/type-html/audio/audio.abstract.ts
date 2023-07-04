import { TypeHtml } from '../type-html.abstract';
import { ITypeAudio } from './audio.interface';
export abstract class TypeAudio extends TypeHtml implements ITypeAudio {
  nodeName: 'audio';
  dom: HTMLAudioElement;
  protected constructor() {
    super('audio');
    this.nodeName = 'audio';
    this.dom = document.createElement(this.nodeName);
  }
}
