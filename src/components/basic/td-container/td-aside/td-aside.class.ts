import { computed } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { TypeAside } from '@type-dom/framework';
import { useNamespace } from '../../../../hooks/use-namespace';
import { ITdAside, TdAsideProps } from './td-aside.interface';

export class TdAside extends TypeAside implements ITdAside {
  className: 'TdAside';
  override props: TdAsideProps;

  constructor(params: TdAsideProps = {}) {
    super();
    this.className = 'TdAside';
    this.attr.addName('td-aside');
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('aside');
    const style = computed(
      () =>
        (props.width
          ? ns.cssVarBlock({ width: props.width.toString() })
          : {}) as IStyle
    );
    // this.assignProps({
    //   attrObj: {
    //     class: ns.b(), // todo 不生效
    //   },
    //   // styleObj: style,
    // });
    this.attr.addClass(ns.b());
    this.style.addObj(style);
    this.slotChildren(props.slot || props.slots?.default);
  }
}
