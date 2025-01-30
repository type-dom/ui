import { Div, TypeDiv } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { dividerProps } from './td-divider.const';
import { ITdDivider, DividerProps } from './td-divider.interface';
import './style/index';

export class TdDivider extends TypeDiv implements ITdDivider {
  className: 'TdDivider';
  override props: DividerProps;

  constructor(params: DividerProps = {}) {
    super();
    this.className = 'TdDivider';

    this.assignProps(dividerProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('divider');
    const dividerStyle = computed(() => {
      return ns.cssVar({
        borderStyle: props.borderStyle!,
      });
    });

    this.attr.addObj({
      class: [ns.b(), ns.m(props.direction)],
      role: 'separator',
    });
    this.style.addObj(dividerStyle);
    if (
      (props.slot || props.slots?.default) &&
      props.direction !== 'vertical'
    ) {
      this.addChild(
        new Div({
          class: [ns.e('text'), ns.is(props.contentPosition!)],
          slot: props.slot ?? props.slots?.default,
        })
      );
    }
  }
}
