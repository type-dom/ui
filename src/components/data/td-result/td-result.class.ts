import { Div, P, TypeDiv } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { ITdResult, ResultProps } from './td-result.interface';
import { IconComponentMap, IconMap, resultProps } from './td-result.const';
import './style/index';

export class TdResult extends TypeDiv implements ITdResult {
  className: 'TdResult';
  override props: ResultProps;

  constructor(params: ResultProps = {}) {
    super();
    this.className = 'TdResult';
    this.attr.addName('td-result');
    this.assignProps(resultProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;

    const ns = useNamespace('result');

    const resultIcon = computed(() => {
      const icon = props.icon;
      const iconClass = icon && IconMap[icon] ? IconMap[icon] : 'icon-info';
      const iconComponent =
        IconComponentMap[iconClass] || IconComponentMap['icon-info'];

      return {
        class: iconClass,
        component: iconComponent,
      };
    });

    this.attr.addClass(ns.b());
    this.addChild(
      new Div({
        attrObj: {
          class: ns.e('icon'),
        },
        slot:
          props.slots?.icon ??
          new (resultIcon.get().component as any)({
            class: resultIcon.get().class,
          }),
      })
    );
    this.addChild(
      new Div({
        vIf: props.title || props.slots?.title,
        class: ns.e('title'),
        slot:
          props.slots?.title ??
          new P({
            slot: props.title,
          }),
      })
    );
    this.addChild(
      new Div({
        vIf: props.subTitle || props.slots?.subTitle,
        class: ns.e('subtitle'),
        slot:
          props.slots?.subTitle ??
          new P({
            slot: props.subTitle,
          }),
      })
    );
    this.addChild(
      new Div({
        vIf: props.slots?.extra,
        class: ns.e('extra'),
        slot: props.slots?.extra,
      })
    );
  }
}
