import { SlotNode, Span, TextNode } from '@type-dom/framework';
import { ElLoadingSvg } from '@type-dom/svgs';
import { UI } from '../../../ui/ui.abstract';
import { $borderColor, $borderRadius, $button, $disabled, $fillColor } from '../../../styles/var';
import { $inputHeight } from '../../form/td-input/td-input.style';
// import { $iconLeft, $iconLoading, $iconRight } from '../td-icon/td-icon.style';
import { TdIcon } from '../td-icon/td-icon.class';
import { IButtonSize, IButtonType, ITdButtonAbstract, ITdButtonConfig } from './td-button.interface';
import {
  $buttonPaddingVertical,
  $buttonPlainColors,
  $buttonStateColors,
  $sizeOpts,
  $tdButtonBase
} from './td-button.style';

// import '../../styles/style.css';
export abstract class TdButtonAbstract extends UI implements ITdButtonAbstract {
  abstract override className: 'TdButton' | string;
  override childNodes: (Span | TdIcon)[];
  override textNode?: TextNode;
  override props: ITdButtonConfig;
  span?: Span;
  icon?: TdIcon | SlotNode;
  // template: Template;
  private type?: IButtonType;
  private plain?: boolean;
  private disabled?: boolean;

  protected constructor(params: ITdButtonConfig = {}) {
    super();
    this.useTag(params.tag || 'button');
    this.attr.addObj({
      type: 'button' // 默认
    });
    this.style.addObj($tdButtonBase);
    this.childNodes = [];
    this.props = this.useParams(params); // 这里的config赋值是要替换掉上面的config的预置值的。
  }

  override setup(): void {
    const props = this.props;
    if (props?.loading) {
      if (props?.slots?.loading) {
        // 如果插槽有 loading
        // this.icon = props.slots.loading as TdIcon;
        // this.loadingSlot = new SlotNode('loading', props.slots.loading);
        this.icon = this.getSlotNode('loading');
        this.addChild(this.icon);
      } else {
        this.icon = new TdIcon({
          name: 'loading-icon',
          svgObj: new ElLoadingSvg() // 默认的 loading 图标
        });
        console.warn('then add icon . icon is ', this.icon);
        this.addChild(this.icon)
      }
    } else if (props?.svgObj || props?.slots?.icon) {
      this.icon = new TdIcon({
        name: 'icon-expand',
        // svgObj: props.svgObj
      });
      if (props.svgObj) {
        (this.icon as TdIcon).getSlotNode().addSlot(props.svgObj);
      } else if (props?.slots?.icon) {
        // this.icon = props.slots.icon;
        // this.iconSlot = new SlotNode('icon', props.slots.icon);
        (this.icon as TdIcon).getSlotNode().addSlot(props.slots.icon);
      }
      this.addChild(this.icon);
    }
    // this.useIcon(props);
    if (props?.slot) {
      // this.defaultSlot = new SlotNode('default', props.slot);
      // this.icon?.style.addObj($iconLeft);
      // todo 会运行 2 次；
      const span = new Span({
        name: 'text-expand',
        styleObj: {
          display: 'inline-flex',
          alignItems: 'center',
          marginLeft: this.icon ? '6px' : undefined,
          // letterSpacing: '0.3em',
          // marginRight: '-0.3em',
        },
        childNodes: [this.getSlotNode()]
      });
      this.addChild(span);
    }

    this.useType(props);

    if (props?.disabled) {
      this.disabled = props.disabled;
      this.style.addObj({
        // color: $button.disabled.textColor,
        // backgroundColor: $button.disabled.bgColor,
        // borderColor: $button.disabled.borderColor,
      });
    }

    const size: IButtonSize = props?.size ? props.size : 'default';
    this.style.addObj($sizeOpts[size]);
    if (props?.round) {
      this.style.addObj({
        borderRadius: $borderRadius.round
      });
    } else if (props?.circle) {
      this.style.addObj({
        width: $inputHeight[props.size || 'default'], // map.get($input-height, 'default');
        borderRadius: $borderRadius.circle,
        padding: $buttonPaddingVertical.default
      });
    }
    // 悬浮、聚焦、激活状态样式
    // console.log('then td-button add events . ');
    this.addEvents({
      mouseenter: (evt) => {
        // console.log('td-button mouseenter . ');
        if (this.disabled) {
          this.style.setObj({
            cursor: 'not-allowed'
          });
        } else {
          if (this.type) {
            this.style.setObj($buttonStateColors[this.type].hover);
          } else {
            this.style.setObj({
              color: $button.hover.textColor,
              backgroundColor: $button.hover.borderColor, // $colors['primary']['light-3'],
              borderColor: $button.hover.borderColor
            });
          }
        }
      },
      mouseleave: () => {
        // console.log('td-button mouseout . ');
        if (this.disabled) {
          this.style.setObj({
            cursor: 'auto'
          });
        } else {
          if (this.type) {
            if (this.plain) {
              this.style.setObj($buttonPlainColors[this.type].default);
            } else {
              this.style.setObj($buttonStateColors[this.type].default);
            }
          } else {
            this.style.setObj({
              color: $button.textColor,
              backgroundColor: $button.bgColor,
              borderColor: $button.borderColor
            });
          }
        }
      }
    });
  }

  useType(params?: ITdButtonConfig) {
    // const type = params?.type ? params.type : 'default';
    // this.type = type;
    if (params?.type) {
      this.type = params.type;
      if (params?.plain) {
        console.log('params.plain . ');
        this.plain = params.plain;
        if (params.disabled) {
          this.disabled = params.disabled;
          this.style.addObj($buttonPlainColors[params.type].disabled);
        } else {
          console.log($buttonPlainColors[params.type].default);
          this.style.addObj($buttonPlainColors[params.type].default);
        }
      } else {
        if (params?.disabled) {
          console.log(
            'params?.disabled is true . $button.disabled is ',
            $button.disabled
          );
          this.disabled = params.disabled;
          this.style.addObj($buttonStateColors[params.type].disabled);
        } else {
          this.style.addObj($buttonStateColors[params.type].default);
        }
      }
    }
  }
}
