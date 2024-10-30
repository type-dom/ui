import { createClass, Div, TypeElement } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { $transitionDuration } from '../../../styles/transition';
import { $boxShadow, $textColor } from '../../../styles/var';
import { ITdCard, ITdCardConfig } from './td-card.interface';
import { $card, $cardFooter, $cardHeader } from './td-card.style';

export class TdCard extends UI implements ITdCard {
  className: 'TdCard';
  override props: ITdCardConfig;
  body: Div;
  header?: Div;
  footer?: Div;

  constructor(params: ITdCardConfig = {}) {
    super();
    this.className = 'TdCard';
    this.attr.addName('td-card');
    this.style.addObj({
      //   border-radius: getCssVar('card', 'border-radius'),
      borderRadius: $card.borderRadius,
      // border: 1px solid getCssVar('card', 'border-color'),
      border: '1px solid ' + $card.borderColor,
      // background-color: getCssVar('card', 'bg-color'),
      backgroundColor: $card.bgColor,
      overflow: 'hidden',
      // color: getCssVar('text-color', 'primary'),
      color: $textColor.primary,
      // transition: getCssVar('transition-duration'),
      transition: $transitionDuration.default
    });
    this.addShadow(params);
    this.addHeader(params);
    this.body = new Div({
      styleObj: {
        // padding: getCssVar('card', 'padding'),
        padding: $card.padding
      }
    });
    if (params.bodyStyle) {
      this.body.style.addObj(params.bodyStyle);
    }
    if (params.bodyClass) {
      this.body.attr.addClass(params.bodyClass);
    }
    if (params.slot) {
      this.body.slotChild(params.slot);
    }
    this.addChild(this.body);
    this.addFooter(params);
    this.props = this.useParams(params);
  }

  addShadow(params: ITdCardConfig) {
    const shadow = params.shadow || 'always';
    if (shadow === 'always') {
      this.style.addObj({
        boxShadow: $boxShadow.light
      });
    } else if (shadow === 'hover') {
      //   todo :hover :focus boxShadow: $boxShadow.light
      this.attr.addClass('hover-shadow');
      createClass('hover-shadow:hover', {
        boxShadow: $boxShadow.light
      });
      createClass('hover-shadow:focus', {
        boxShadow: $boxShadow.light
      });
    }
  }

  addHeader(params?: ITdCardConfig) {
    if (params?.slots?.header) {
      this.header = new Div({
        styleObj: $cardHeader
      });
      this.header.slotChild(params.slots.header);
      this.addChild(this.header);
    } else if (params?.header) {
      // 文本
      this.header = new Div({
        text: params.header,
        styleObj: $cardHeader
      });
      this.addChild(this.header);
    }
  }

  addFooter(params: ITdCardConfig) {
    if (params.slots?.footer) {
      this.footer = new Div({
        styleObj: $cardFooter
      });
      this.footer.slotChild(params.slots.footer);
      this.addChild(this.footer);
    } else if (params.footer) {
      this.footer = new Div({
        slot: params.footer,
        styleObj: $cardFooter
      });
      this.addChild(this.footer);
    }
  }
}
