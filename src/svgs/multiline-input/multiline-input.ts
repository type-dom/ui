import { SvgPath, TypeHtml, TypeSvgSvg } from 'type-dom.ts';
export class MultilineInputSvg extends TypeSvgSvg {
  className: 'MultilineInputSvg';
  childNodes: [SvgPath];
  constructor(public parent: TypeHtml) {
    super();
    this.className = 'MultilineInputSvg';
    const path = new SvgPath(this);
    path.setData('M896 160H128c-35.2 0-64 28.8-64 64v576c0 35.2 28.8 64 64 64h768c35.2 0 64-28.8 64-64V224c0-35.2-28.8-64-64-64z m0 608c0 16-12.8 32-32 32H160c-19.2 0-32-12.8-32-32V256c0-16 12.8-32 32-32h704c19.2 0 32 12.8 32 32v512z',
      'M224 288c-19.2 0-32 12.8-32 32v256c0 16 12.8 32 32 32s32-12.8 32-32V320c0-16-12.8-32-32-32z m608 480c19.2 0 32-12.8 32-32V608L704 768h128z');
    this.childNodes = [path];
  }
}
