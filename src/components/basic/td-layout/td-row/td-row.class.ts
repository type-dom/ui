import { provide, TypeDiv } from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';
import { computed } from '@type-dom/signals';
import { useNamespace } from '../../../../hooks/use-namespace';
import { TdCol } from '../td-col/td-col.class';
import { rowContextKey, rowProps } from './td-row.const';
import { ITdRow, RowProps } from './td-row.interface';
import './style/index';

export class TdRow extends TypeDiv implements ITdRow {
  className: 'TdRow';
  override props: RowProps;
  override childNodes: TdCol[];

  constructor(params: RowProps = {}) {
    super();
    this.className = 'TdRow';
    this.attr.addName('td-row');
    this.childNodes = [];
    this.assignProps(rowProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;

    const ns = useNamespace('row');
    const gutter = computed(() => props.gutter);

    provide(rowContextKey, {
      gutter,
    });

    const style = computed(() => {
      const styles: IStyle = {};
      if (!props.gutter) {
        return styles;
      }

      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
      return styles;
    });

    const rowKls = computed(() => [
      ns.b(),
      ns.is(`justify-${props.justify}`, props.justify !== 'start'),
      ns.is(`align-${props.align}`, !!props.align),
    ]);
    this.assignProps({
      attrObj: {
        class: rowKls,
      },
    });
    // this.attr.addClass(rowKls); todo 会不显示
    this.style.addObj(style);
    this.slotChildren(props.slot || props.slots?.default);
  }
}
