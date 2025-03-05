import { TypeDiv } from '@type-dom/framework';
import { toRef } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdButton } from '../td-button/td-button.class';
import { buttonGroupContextKey } from '../td-button/constants';
import {
  ITdButtonGroup,
  TdButtonGroupProps,
} from './td-button-group.interface';
import './style/index';

export class TdButtonGroup extends TypeDiv implements ITdButtonGroup {
  className: 'TdButtonGroup';
  override props: TdButtonGroupProps;
  override childNodes: TdButton[];

  constructor(params: TdButtonGroupProps = {}) {
    super();
    this.className = 'TdButtonGroup';
    this.childNodes = [];
    this.props = this.useParams(params);
  }

  override setup(): void {
    // console.log('td-button-group setup . ');
    const props = this.props;
    this.attr.addName('td-button-group');
    const ns = useNamespace('button');
    this.attr.addClass(ns.b('group'));
    this.slotChildren(props.slot);
    this.provide(buttonGroupContextKey, {
      size: toRef(props, 'size'),
      type: toRef(props, 'type'),
    });
  }
}
