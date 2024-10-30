import { Span } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import {
  $linkStyle,
  $linkStateColors,
  useType,
  $linkInnerStyle
} from '../td-link/td-link.style';
import { ITdLink, ITdLinkConfig } from './td-link.interface';

export class TdLink extends UI implements ITdLink {
  className: 'TdLink';
  override props: ITdLinkConfig
  // icon?: TdIcon;
  private inner?: Span;

  constructor(params: ITdLinkConfig) {
    super();
    this.useTag('a');
    this.className = 'TdLink';
    useType(params);
    this.style.addObj($linkStyle);
    this.props = this.useParams(params);
  }

  // override beforeCreate() {
  //   this.style.addObj($linkStyle);
  // }

  override setup() {
    const props = this.props;
    this.attr.addObj({
      href: props?.href,
      target: props?.target,
      disabled: props?.disabled
    });

    if (props?.type) {
      if (props?.disabled) {
        this.style.addObj($linkStateColors[props.type].disabled);
      } else {
        this.style.addObj($linkStateColors[props.type].default);
      }
    } else {
      this.style.addObj($linkStateColors.default.default);
    }
    if (props?.icon) {
      this.unshiftChild(props.icon);
    }
    this.inner = new Span({
      name: 'inner',
      styleObj: $linkInnerStyle
    });
    this.inner.addChild(this.getSlotNode());
    this.addChild(this.inner);

    this.addEvents({
      click: (evt) => {
        this.handleClick(evt as MouseEvent);
      },
      mouseenter: () => {
        if (this.props.type) {
          if (this.props.disabled) {
            this.style.setObj({
              cursor: 'not-allowed'
            });
          } else {
            this.style.setObj($linkStateColors[this.props.type].hover);
          }
        } else {
          this.style.setObj($linkStateColors.default.hover);
        }
        if (this.props.underline === false) {
          // 设置 false 的情况下，不显示下划线
          this.style.setObj({
            textDecoration: 'none'
          });
        } else {
          // 1. 默认显示下划线
          // 2. 默认显示下划线，如果设置了 underline 为 true，则显示下划线
          this.style.setObj({
            textDecoration: 'underline'
          });
        }
      },
      mouseleave: (evt) => {
        this.style.setObj({
          textDecoration: 'none'
        });
        if (this.props.type) {
          this.style.removeObj($linkStateColors[this.props.type].hover);
          if (this.props.disabled) {
            evt?.preventDefault();
            this.style.setObj($linkStateColors[this.props.type].disabled);
          } else {
            this.style.setObj($linkStateColors[this.props.type].default);
          }
        } else {
          this.style.removeObj($linkStateColors.default.hover);
        }
      }
    });
  }

  handleClick(event: MouseEvent) {
    // this.emit('click', event); // 会死循环的
  }
}
