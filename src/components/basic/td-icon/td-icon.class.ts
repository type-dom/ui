import { TypeI, TypeSvgSvg } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { addUnit, isUndefined } from '@type-dom/utils';
import { useNamespace } from '../../../hooks/use-namespace';
import { ITdIcon, IconProps } from './td-icon.interface';

/**
 * TdIcon 类继承自 TypeI 类，实现了 ITdIcon 接口。
 * 该类用于创建和管理图标，支持配置不同的图标样式和SVG图形。
 */
export class TdIcon extends TypeI implements ITdIcon {
  className: 'TdIcon';
  override props: IconProps;

  /**
   * TdIcon 类的构造函数。
   * @param params
   */
  constructor(params: IconProps = {}) {
    super();
    this.className = 'TdIcon';
    this.props = this.useParams(params);
  }

  /**
   * 根据配置更新图标的状态和样式。
   */
  override setup(): void {
    const props = this.props;
    const ns = useNamespace('icon');

    const style = computed<IStyle>(() => {
      const { size, color } = props;
      if (!size && !color) {
        return {};
      }
      return {
        fontSize: isUndefined(size) ? undefined : addUnit(size),
        '--color': color,
      };
    });
    this.attr.addClass(ns.b());
    this.style.addObj(style);
    this.slotChildren(props.slot);
  }

  /**
   * todo delete
   * 替换子节点中的SVG元素。
   *
   * 此方法用于查找并替换当前节点中指定的SVG元素。如果找不到指定的SVG元素，则将新SVG元素添加为子节点。
   * 这对于动态更新SVG内容特别有用，比如在用户交互或数据变化时更新图表。
   *
   * @param toSvg 要替换为的新SVG元素。
   * @param fromSvg 可选参数，指定要替换的SVG元素。如果不提供，则替换所有实例化的SVG元素。
   */
  replaceSvg(toSvg: TypeSvgSvg, fromSvg?: TypeSvgSvg) {
    console.log('replaceSvg ');
    // 查找要替换的SVG元素的索引。
    const svgIndex = this.childNodes?.findIndex((child) => {
      // 如果指定了要替换的SVG元素，则判断当前元素是否是待替换的元素。
      if (fromSvg) {
        return child === fromSvg;
      } else if (child instanceof TypeSvgSvg) {
        // 如果没有指定具体的SVG元素，则查找所有实例化的SVG元素的第一个。
        fromSvg = child;
        return true;
      }
      return false;
    });

    // 如果找不到指定的SVG元素，则将新SVG元素添加为子节点。
    if (svgIndex === -1) {
      this.addChild(toSvg);
    } else {
      // 替换找到的SVG元素为新SVG元素。
      if (fromSvg) {
        fromSvg !== toSvg && this.replaceChild(toSvg, fromSvg);
      } else {
        this.addChild(toSvg);
      }
    }

    // // 设置新SVG元素的父节点为当前节点。
    // 更新渲染，以显示替换或添加的新SVG元素。
    // toSvg?.mount(this.dom);
    toSvg?.update();
    // this.mount(this.elementParent?.dom);
  }
}
