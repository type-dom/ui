import { Slot, TypeHtml, TypeI, TypeSvgSvg } from '@type-dom/framework';
import { $iconLeft, $iconLoading, $iconRight, $tdIcon } from './td-icon.style';
import { ITdIcon, ITdIconConfig } from './td-icon.interface';
export class TdIcon extends TypeI implements ITdIcon {
  className: 'TdIcon';
  parent?: TypeHtml;
  svg?: TypeSvgSvg;
  constructor(config?: Partial<ITdIconConfig>) {
    super();
    this.className = 'TdIcon';
    const slot = new Slot({ parent: this });
    this.childNodes = [slot];
    this.addStyleObj($tdIcon);
    this.setConfig(config);
    this.resetConfig(config);
  }
  // todo
  createSvg(className: string) {
    return;
  }
  resetConfig(config?: Partial<ITdIconConfig>): void {
    if (config?.SvgClass) { // todo 直接作为 childNodes的子元素更合理；
      const svg = new config.SvgClass(this) as TypeSvgSvg;
      // svg.resetSize('1em', '1em');
      this.addChild(svg);
      this.svg = svg;
    }
    if (config?.svgObj) { // 直接作为 childNodes的子元素更合理；
      this.addChild(config.svgObj);
      this.svg = config.svgObj;
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
    if (config?.position === 'right') { // 位置应该是引用的对象中设置，自身应该不需要设置。
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
  replaceSvg(svg: TypeSvgSvg) {
    this.childNodes.splice(1, 1, svg);
    svg.parent = this;
    this.render();
  }
}
