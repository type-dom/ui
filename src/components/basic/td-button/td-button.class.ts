import { Span, Slot, StyleCursor, TextNode } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { $borderRadius, $button, $paddingVerticalMap } from '../../../styles/var';
import { $inputHeight } from '../../form/td-input/td-input.style';
import { $iconLeft, $iconLoading, $iconRight } from '../td-icon/td-icon.style';
import { TdIcon } from '../td-icon/td-icon.class';
import { IButtonSize, IButtonType, ITdButton, ITdButtonConfig } from './td-button.interface';
import { $buttonPlainColors, $buttonStateColors, sizeOpts, tdButtonBase } from './td-button.style';

// import '../../styles/style.css';
export class TdButton extends UI implements ITdButton {
  className: 'TdButton';
  override childNodes: (Span | TdIcon)[];
  override textNode: TextNode;
  span: Span;
  // template: Template;
  private type?: IButtonType;
  private plain?: boolean;
  private disabled?: boolean;
  private icon?: TdIcon;

  constructor(config?: ITdButtonConfig) {
    super({ tag: config?.tag || 'button' });
    if (config?.title === 'Create') {
      console.log('config.title is Create . ');
    }
    this.className = 'TdButton';
    this.textNode = new TextNode();
    this.addAttrObj({
      type: 'button' // 默认
    });
    // this.template = new Template(this);
    // this.textNode = new TextNode();
    this.span = new Span({
      parent: this,
      styleObj: {
        display: 'inline-flex',
        alignItems: 'center'
      },
      childNodes: [this.textNode, new Slot()]
    });
    this.addStyleObj(tdButtonBase);
    this.childNodes = [this.span];
    this.setConfig(config);
  }

  override setConfig(config?: ITdButtonConfig): void {
    super.setConfig(config);
    if (config?.title) {
      this.textNode.setText(config.title);
    } else {
      this.clearChildren();
    }
    if (config?.svgObj) {
      this.icon = new TdIcon({
        childNodes: [config.svgObj]
      });
      if (config.iconPosition === 'right') {
        this.icon.addStyleObj($iconRight);
        this.addChild(this.icon);
      } else {
        if (config.title) { // 如果后面有文字
          this.icon.addStyleObj($iconLeft);
        }
        this.unshiftChild(this.icon); // 前面插入
      }
      if (config.circle) {
        this.icon.addStyleObj({
          margin: undefined,
          float: undefined
        });
      }
    }
    // const type = config?.type ? config.type : 'default';
    // this.type = type;
    if (config?.type) {
      this.type = config.type;
      if (config?.plain) {
        console.log('config.plain . ');
        this.plain = config.plain;
        if (config.disabled) {
          this.disabled = config.disabled;
          this.addStyleObj($buttonPlainColors[config.type].disabled);
        } else {
          console.log($buttonPlainColors[config.type].default);
          this.addStyleObj($buttonPlainColors[config.type].default);
        }
      } else {
        if (config?.disabled) {
          console.log(
            'config?.disabled is true . $button.disabled is ',
            $button.disabled
          );
          this.disabled = config.disabled;
          this.addStyleObj($buttonStateColors[config.type].disabled);
        } else {
          this.addStyleObj($buttonStateColors[config.type].default);
        }
      }
    }

    if (config?.loading) {
      if (this.icon) {
        this.icon.addStyleObj($iconLoading);
      }
      this.disabled = config.disabled;
      if (config.type) {
        this.addStyleObj($buttonStateColors[config.type].disabled);
      } else {
        this.addStyleObj($button.disabled);
      }
      this.addStyleObj({
        position: 'relative',
        pointerEvents: 'none',
      })
    }
    if (config?.disabled) {
      this.disabled = config.disabled;
      this.addStyleObj($button.disabled);
    }

    const size: IButtonSize = config?.size ? config.size : 'default';
    this.addStyleObj(sizeOpts[size]);
    if (config?.round) {
      this.addStyleObj({
        borderRadius: $borderRadius.round
      });
    } else if (config?.circle) {
      this.addStyleObj({
        width: $inputHeight[config.size || 'default'], // map.get($input-height, 'default');
        borderRadius: $borderRadius.circle,
        padding: $paddingVerticalMap.default
      });
    }
  }

  // 悬浮、聚焦、激活状态样式
  override initEvents() {
    this.addEvents({
      mouseover: evt => {
        // console.log('td-button mouseover . ');
        if (this.disabled) {
          this.setStyleObj({
            cursor: StyleCursor.notAllowed
          });
        } else {
          if (this.type) {
            this.setStyleObj($buttonStateColors[this.type].hover);
          } else {
            this.setStyleObj({
              color: $button.hover.textColor,
              backgroundColor: $button.hover.borderColor, // $colors['primary']['light-3'],
              borderColor: $button.hover.borderColor
            });
          }
        }
      },
      mouseout: () => {
        // console.log('td-button mouseout . ');
        if (this.disabled) {
          this.setStyleObj({
            cursor: StyleCursor.auto
          });
        } else {
          if (this.type) {
            if (this.plain) {
              this.setStyleObj($buttonPlainColors[this.type].default);
            } else {
              this.setStyleObj($buttonStateColors[this.type].default);
            }
          } else {
            this.setStyleObj({
              color: $button.textColor,
              backgroundColor: $button.bgColor,
              borderColor: $button.borderColor
            });
          }
        }
      }
    });
  }
}
