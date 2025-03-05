import { TypeHeader } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { useNamespace } from '../../../../hooks/use-namespace';
import { TdContainer } from '../td-container.class';
import type { ITdHeader, TdHeaderProps } from './td-header.interface';

export class TdHeader extends TypeHeader implements ITdHeader {
  className: 'TdHeader';
  override props: TdHeaderProps;
  override parent?: TdContainer;

  constructor(params: TdHeaderProps = {}) {
    super();
    this.className = 'TdHeader';
    this.attr.addName('td-header');
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('header');
    const style = computed(() => {
      return props.height
        ? (ns.cssVarBlock({
            height: props.height.toString(),
          }) as IStyle)
        : {};
    });
    this.attr.addClass(ns.b());
    this.style.addObj(style);
    this.slotChildren(props.slot || props.slots?.default);
  }
}
