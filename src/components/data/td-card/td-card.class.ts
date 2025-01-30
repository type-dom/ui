import { Div, TypeDiv } from '@type-dom/framework';
import { useNamespace } from '../../../hooks/use-namespace';
import { ITdCard, CardProps } from './td-card.interface';
import { cardProps } from './td-card.const';
import './style/index';

export class TdCard extends TypeDiv implements ITdCard {
  className: 'TdCard';
  override props: CardProps;

  constructor(params: CardProps = {}) {
    super();
    this.className = 'TdCard';
    this.attr.addName('td-card');

    this.assignProps(cardProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;

    const ns = useNamespace('card');
    this.attr.addClass([ns.b(), ns.is(`${props.shadow}-shadow`)]);

    if (props.slots?.header || props.header) {
      this.addChild(
        new Div({
          class: ns.e('header'),
          slot: props.slots?.header ?? props.header,
        })
      );
    }
    this.addChild(
      new Div({
        class: [ns.e('body'), props.bodyClass],
        styleObj: props.bodyStyle,
        slot: props.slots?.default ?? props.slot,
      })
    );
    if (props.slots?.footer || props.footer) {
      this.addChild(
        new Div({
          class: ns.e('footer'),
          slot: props.slots?.footer ?? props.footer,
        })
      );
    }
  }
}
