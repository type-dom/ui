import { TypeHtml } from '../../../type-dom/type-element/type-html/type-html.abstract';
import { TypeSvgSvg } from '../../../type-dom/type-element/type-svg/svg/svg.abstract';
import { TypeI } from '../../../type-dom/type-element/type-html/i/i.abstract';
import { Slot } from '../../../type-dom/element/html-element/slot/slot.class';
import { $iconLeft, $iconLoading, $iconRight, $tdIcon } from '../../../type-dom/style/td-icon.style';
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
    if (config?.position === 'right') {
      this.addStyleObj($iconRight);
    } else {
      this.addStyleObj($iconLeft);
    }
    // this.addStyleObj(sizeOpts[size]);
    // this.addAttrObj({
    //   type: 'primary', // success warn danger primary
    //   size: 'middle' // small middle, large
    // });
  }
}
