import {
  createClass,
  createStyle,
  TypeHtml,
  TypeSvgSvg,
  vHash
} from '@type-dom/framework';
import { addUnit /*createRotatableElement*/ } from '@type-dom/utils';
import { UI } from '../../../ui/ui.abstract';
import { $iconLeft, $iconLoading, $iconRight, $tdIcon } from './td-icon.style';
import { ITdIcon, ITdIconConfig } from './td-icon.interface';

/**
 * TdIcon 类继承自 UI 类，实现了 ITdIcon 接口。
 * 该类用于创建和管理图标，支持配置不同的图标样式和SVG图形。
 */
export class TdIcon extends UI implements ITdIcon {
  className: 'TdIcon';
  override props: ITdIconConfig;
  svg?: TypeSvgSvg;
  override parent?: TypeHtml;
  static initCalled = false;

  /**
   * TdIcon 类的构造函数。
   * @param params
   */
  constructor(params: ITdIconConfig = { }) {
    super();
    this.className = 'TdIcon';
    this.useTag('i');
    this.style.addObj($tdIcon);
    if (params?.loading) {
      this.style.addObj($iconLoading);
    }
    // 首次创建时，添加style标签；避免重复创建
    if (!TdIcon.initCalled) {
      TdIcon.initCalled = true;
      const cssText = `
/* 选择所有带有 data-v-366071 属性的元素 */
/* 在这里添加您的样式规则 */
@keyframes rotating-${vHash} {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
      `;
      createStyle(cssText);
      // createClass('td-icon', $tdIcon);
    }
    this.attr.addClass('td-icon');

    this.addChild(this.getSlotNode());
    this.props = this.useParams(params);
  }

  /**
   * 根据配置更新图标的状态和样式。
   * @param config 图标的配置对象，可选参数。
   */
  override setup(): void {
    const props = this.props;
    if (props?.svgObj) {
      // 直接作为 childNodes的子元素更合理；
      this.getSlotNode().resetSlot(props.svgObj);
      this.svg = props.svgObj;
      this.svg.attr.addObj({
        height: '1em',
        width: '1em',
      });
    }
    if (props?.color) {
      this.style.addObj({
        color: props.color,
      });
    }
    if (props?.size) {
      this.style.addObj({
        fontSize: addUnit(props.size),
      });
      this.svg?.resetSize(props.size, props.size);
    }
    if (props?.position === 'right') {
      // 位置应该是引用的对象中设置，自身应该不需要设置。
      this.style.addObj($iconRight);
    } else if (props?.position === 'left') {
      this.style.addObj($iconLeft);
    }
  }

  /**
   * 替换子节点中的SVG元素。
   *
   * 此方法用于查找并替换当前节点中指定的SVG元素。如果找不到指定的SVG元素，则将新SVG元素添加为子节点。
   * 这对于动态更新SVG内容特别有用，比如在用户交互或数据变化时更新图表。
   *
   * @param toSvg 要替换为的新SVG元素。
   * @param fromSvg 可选参数，指定要替换的SVG元素。如果不提供，则替换所有实例化的SVG元素。
   */
  replaceSvg(toSvg: TypeSvgSvg, fromSvg?: TypeSvgSvg) {
    const slotNode = this.getSlotNode('default');
    console.log('replaceSvg slotNode is ', slotNode);
    // 查找要替换的SVG元素的索引。
    const svgIndex = slotNode.childNodes?.findIndex((child) => {
      // 如果指定了要替换的SVG元素，则判断当前元素是否是待替换的元素。
      if (fromSvg) {
        return child === fromSvg;
      } else if (child instanceof TypeSvgSvg) { // 如果没有指定具体的SVG元素，则查找所有实例化的SVG元素的第一个。
        fromSvg = child;
        return true;
      }
      return false;
    });

    // 如果找不到指定的SVG元素，则将新SVG元素添加为子节点。
    if (svgIndex === -1) {
      slotNode.addChild(toSvg);
    } else {
      // 替换找到的SVG元素为新SVG元素。
      if (fromSvg) {
        fromSvg !== toSvg && slotNode.replaceChild(toSvg, fromSvg);
      } else {
        slotNode.addChild(toSvg);
      }
      // slotNode.childNodes.splice(svgIndex, 1, toSvg);
      this.clearChildrenDom();
    }

    // // 设置新SVG元素的父节点为当前节点。
    // toSvg.parent = slotNode;
    // 更新渲染，以显示替换或添加的新SVG元素。
    slotNode.mount(this.dom);
  }

  /**
   * 组件挂载后的钩子函数。
   * 该函数目前用于处理加载状态的动画效果。
   */
  override mounted() {
    /**
     * loading 效果
     * todo css 中配置
     * @keyframes rotating {
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
    // if (this.props.loading) {
    //   const a = createRotatableElement(this.dom, 0, 60);
    //   a.start();
    // }
  }
}
