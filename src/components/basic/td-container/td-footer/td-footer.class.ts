import { TypeFooter } from '@type-dom/framework';
import type { ITdFooter, FooterProps } from './td-footer.interface';
import { useNamespace } from '../../../../hooks/use-namespace';
import { computed } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';

export class TdFooter extends TypeFooter implements ITdFooter {
  className: 'TdFooter';
  override props: FooterProps;

  constructor(params: FooterProps = {}) {
    super();
    this.className = 'TdFooter';
    this.attr.addName('td-footer');
    this.props = this.useParams(params);
  }

  override setup(): void {
    const props = this.props;
    const ns = useNamespace('footer');

    const style = computed(
      () =>
        (props.height
          ? ns.cssVarBlock({ height: props.height.toString() })
          : {}) as IStyle
    );
    this.assignProps({
      attrObj: {
        class: ns.b(),
      },
      styleObj: style,
    });
    this.slotChildren(props.slot || props.slots?.default);
  }
}
