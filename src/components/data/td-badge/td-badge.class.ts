import { addUnit, isNumber } from '@type-dom/utils';
import { SlotNode, Sup, TextNode, Transition } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { $bgColor, $colors, $colorWhite, $zIndex } from '../../../styles/var';
import type { ITdBadge, ITdBadgeConfig } from './td-badge.interface';
import { $badge } from './td-badge.style';

export class TdBadge extends UI implements ITdBadge {
  className: 'TdBadge';
  override props: ITdBadgeConfig;
  private sup: Sup;
  constructor(params: ITdBadgeConfig = {}) {
    super();
    console.log('TdBadge constructor . ');
    this.className = 'TdBadge';
    this.attr.addName('td-badge');
    this.style.addObj({
      position: 'relative',
      verticalAlign: 'middle',
      display: 'inline-block',
      width: 'fit-content'
    });
    // this.addChild(this.getSlotNode());
    this.sup = new Sup({
      styleObj: {
        // background-color: getCssVar('badge', 'bg-color'),
        backgroundColor: params?.color ? params.color : $badge.bgColor,
        // border-radius: getCssVar('badge', 'radius'),
        borderRadius: $badge.radius,
        // color: getCssVar('color', 'white'),
        color: $colorWhite,
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        // font-size: getCssVar('badge', 'font-size'),
        fontSize: $badge.fontSize,
        // height: getCssVar('badge', 'size'),
        height: $badge.size,
        // padding: 0 getCssVar('badge', 'padding'),
        padding: '0 ' + $badge.padding,
        whiteSpace: 'nowrap',
        // border: 1px solid getCssVar('bg-color'),
        border: '1px solid ' + $bgColor,
        marginRight: addUnit(-(params?.offset?.[0] ?? 0)),
        marginTop: addUnit(params?.offset?.[1] ?? 0)
      }
    });
    this.addChild(this.getSlotNode());
    this.addChild(
      new Transition({
        name: 'td-badge',
        parent: this,
        slot: this.sup
      })
    );
    this.props = this.useParams(params);
  }

  override setup() {
    console.log('TdBadge setup');
    const props = this.props;
    let content = props?.isDot ? '' : props?.value;
    console.warn('TdBadge setup content is ', content);
    this.sup.getTextNode().setText(content || '');
    // this.sup.addChild(new TextNode(content))
    if (
      props?.max &&
      props?.value &&
      isNumber(props?.value) &&
      isNumber(props?.max)
    ) {
      if (props.max < props.value) {
        content = props.max + '+';
      } else {
        content = props.value === 0 && !props.showZero ? '' : props.value;
      }
      this.sup.getTextNode().setText(content);
    }

    if (props?.slot) {
      this.sup.style.addObj({
        // 默认样式
        position: 'absolute',
        top: '0',
        // right: calc(1px + #{getCssVar('badge', 'size')} / 2),
        right: props?.isDot ? '5px' : 'calc(1px + ' + $badge.size + ' / 2)',
        transform: 'translateY(-50%) translateX(100%)',
        // z-index: getCssVar('index', 'normal'),
        zIndex: $zIndex.normal
      });
    }
    if (props?.isDot) {
      this.sup.style.addObj({
        height: 8,
        width: 8,
        padding: 0,
        // right: '0',
        borderRadius: '50%'
      });
    }
    if (props?.type) {
      this.sup.style.addObj({
        backgroundColor: $colors[props.type].base
      });
    }
    if (props?.dotStyle) {
      this.sup.style.addObj(props.dotStyle);
    }
  }

  changeValue(value: number | string) {
    this.props.value = value;
  }
}
