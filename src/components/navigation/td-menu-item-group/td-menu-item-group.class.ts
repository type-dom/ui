import { Div, TypeLI, UL } from '@type-dom/framework';
import { useNamespace } from '../../../hooks/use-namespace';
import { ITdMenuItemGroup, MenuItemGroupProps } from './td-menu-item-group.interface';
import './style';

export class TdMenuItemGroup extends TypeLI implements ITdMenuItemGroup {
  className: 'TdMenuItemGroup';
  override props: MenuItemGroupProps;

  constructor(props: MenuItemGroupProps = {}) {
    super();
    this.className = 'TdMenuItemGroup';
    this.props = this.useParams(props);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('menu-item-group');
    this.attr.addClass(ns.b());
    this.addChildren(
      new Div({
        class: ns.e('title'),
        slot: props.slots?.title ?? props.title
      }),
      new UL({
        slot: props.slot ?? props.slots?.default,
      })
    );
  }
}
