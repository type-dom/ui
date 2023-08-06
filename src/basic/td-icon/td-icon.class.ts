import { Slot, TypeHtml, TypeI, TypeSvgSvg } from 'type-dom.ts';
import { $iconLeft, $iconLoading, $iconRight, $tdIcon } from '../../style/td-icon.style';
import { ITdIcon, ITdIconConfig } from './td-icon.interface';
export class TdIcon extends TypeI implements ITdIcon {
  className: 'TdIcon';
  constructor(public parent: TypeHtml, config?: Partial<ITdIconConfig>) {
    super();
    this.className = 'TdIcon';
    const slot = new Slot(this);
    this.childNodes = [slot];
    this.setConfig(config);
  }
  setConfig(config?: Partial<ITdIconConfig>): void {
    this.addStyleObj($tdIcon);
    if (config?.SvgClass) {
      const svg = new config.SvgClass(this) as TypeSvgSvg;
      svg.resetSize('1em', '1em');
      this.addChild(svg);
    }
    if (config?.color) {
      this.addStyleObj({
        color: config.color,
      });
    }
    if (config?.size) {
      this.addStyleObj({
        fontSize: config.size,
      });
    }
    if (config?.loading) {
      this.addStyleObj($iconLoading);
    }
    // if (config?.position === 'right') { // 位置应该是引用的对象中设置，自身应该不需要设置。
    //   this.addStyleObj($iconRight);
    // } else {
    //   // this.addStyleObj($iconLeft);
    // }
    // this.addStyleObj(sizeOpts[size]);
    // this.addAttrObj({
    //   type: 'primary', // success warn danger primary
    //   size: 'middle' // small middle, large
    // });
  }
}
