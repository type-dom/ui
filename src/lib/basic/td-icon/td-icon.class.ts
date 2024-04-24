import { Slot, TypeHtml, TypeSvgSvg } from '@type-dom/framework';
import { UI } from '../../ui.abstract';
import { $iconLeft, $iconLoading, $iconRight, $tdIcon } from './td-icon.style';
import { ITdIcon, ITdIconConfig } from './td-icon.interface';
import { createRotatableElement } from '@type-dom/utils';


export class TdIcon extends UI implements ITdIcon {
  className: 'TdIcon';
  svg?: TypeSvgSvg;
  override parent?: TypeHtml;
  override config?: ITdIconConfig;

  constructor(config?: Partial<ITdIconConfig>) {
    super({ tag: 'i' });
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
    if (config?.SvgClass) {
      // todo 直接作为 childNodes的子元素更合理；
      const svg = new config.SvgClass(this) as TypeSvgSvg;
      // svg.resetSize('1em', '1em');
      this.addChild(svg);
      this.svg = svg;
    }
    if (config?.svgObj) {
      // 直接作为 childNodes的子元素更合理；
      this.addChild(config.svgObj);
      this.svg = config.svgObj;
    }
    if (config?.color) {
      this.addStyleObj({
        color: config.color
      });
    }
    if (config?.size) {
      this.addStyleObj({
        fontSize: config.size
      });
    }
    if (config?.position === 'right') {
      // 位置应该是引用的对象中设置，自身应该不需要设置。
      this.addStyleObj($iconRight);
    } else if (config?.position === 'left') {
      this.addStyleObj($iconLeft);
    }
    // this.addStyleObj(sizeOpts[size]);
    // this.addAttrObj({
    //   type: 'primary', // success warn danger primary
    //   size: 'middle' // small middle, large
    // });
  }

  override created() {
    if (this.config?.loading) {
      this.addStyleObj($iconLoading);
    }
  }

  replaceSvg(svg: TypeSvgSvg) {
    this.childNodes.splice(1, 1, svg);
    svg.parent = this;
    this.render();
  }

  override mounted() {
    /**
     * loading 效果
     * todo css 中配置 @keyframes rotating {
     *   0% {
     *     transform: rotateZ(0deg);
     *   }
     *   100% {
     *     transform: rotateZ(360deg);
     *   }
     * }
     * 现在配置的不生效 ？？？？  shadowRoot 会隔离了样式。
     * 而打包时，样式会在最外层的项目中生成，导致样式失效。
     */
    // if (this.config?.loading) {
    //   const a = createRotatableElement(this.dom, 0, 60);
    //   a.start();
    // }
  }
}
