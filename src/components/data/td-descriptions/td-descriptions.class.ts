import {
  Div,
  provide,
  Table,
  TableBody,
  TypeDiv,
  useSlots,
} from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { useNamespace } from '../../../hooks';
import { useFormSize } from '../../form/td-form';
import { TdDescriptionsItem } from '../td-descriptions-item/td-descriptions-item.class';
import { DescriptionsItemProps } from '../td-descriptions-item/td-descriptions-item.interface';
import { IDescriptionsInject, ITdDescriptions, DescriptionsProps, } from './td-descriptions.interface';
import { TdDescriptionsRow } from './td-descriptions-row';
import { descriptionProps, descriptionsKey } from './token';
import './style/index';

export class TdDescriptions extends TypeDiv implements ITdDescriptions {
  className: 'TdDescriptions';
  override props: DescriptionsProps;
  // private header?: Div;
  // private body?: Div;
  private rows?: TdDescriptionsRow[];
  // private headerTitle?: Div;
  // private bodyTable?: Table;

  constructor(params: DescriptionsProps) {
    super();
    this.className = 'TdDescriptions';
    this.assignProps(descriptionProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;

    const ns = useNamespace('descriptions');

    const descriptionsSize = useFormSize();

    const slots = useSlots();

    provide(descriptionsKey, props as IDescriptionsInject)

    const descriptionKls = computed(() => [ns.b(), ns.m(descriptionsSize.get())])

    const filledNode = (
      node: TdDescriptionsItem,
      span: number,
      count: number,
      isLast = false
    ) => {
      if (!node.props) {
        node.props = {} as DescriptionsItemProps;
      }
      if (span > count) {
        node.props.span = count;
      }
      if (isLast) {
        // set the last span
        node.props.span = span;
      }
      return node;
    }

    const getRows = () => {
      const props = this.props;
      if (!slots?.default && !props.slot) return [];
      const children = props.slot?.filter(
        (item) => item instanceof TdDescriptionsItem
      ) as TdDescriptionsItem[];
      const rows: TdDescriptionsItem[][] = [];
      let temp: TdDescriptionsItem[] = [];
      let count = props.column || 3;
      let totalSpan = 0; // all spans number of item
      const rowspanTemp: number[] = [] // the number of row spans

      children.forEach((child, index) => {
        const span = child.props.span || 1;
        const rowspan = child.props?.rowspan || 1
        const rowNo = rows.length
        rowspanTemp[rowNo] ||= 0

        if (rowspan > 1) {
          for (let i = 1; i < rowspan; i++) {
            rowspanTemp[rowNo + i] ||= 0
            rowspanTemp[rowNo + i]++
            totalSpan++
          }
        }
        if (rowspanTemp[rowNo] > 0) {
          count -= rowspanTemp[rowNo]
          rowspanTemp[rowNo] = 0
        }

        if (index < children.length - 1) {
          totalSpan += span > count ? count : span;
        }

        if (index === children.length - 1) {
          // calculate the last item span
          const lastSpan =
            (props.column || 3) - (totalSpan % (props.column || 3));
          // const lastSpan = count - (totalSpan % count)
          temp.push(filledNode(child, lastSpan, count, true));
          rows.push(temp);
          return;
        }

        if (span < count) {
          count -= span;
          temp.push(child);
        } else {
          temp.push(filledNode(child, span, count));
          rows.push(temp);
          count = props.column || 3;
          temp = [];
        }
      });
      console.log('rows is ', rows);
      return rows;
    }

    // useSize(props);
    // useBordered(props);
    this.attr.addClass(descriptionKls);
    if (
      props?.title ||
      props?.extra ||
      props?.slots?.title ||
      props?.slots?.extra
    ) {
      this.addChild(new Div({
        name: 'header',
        class: ns.e('header'),
        // styleObj: $descriptionsHeaderStyle,
        slot: [
          new Div({
            name: 'title',
            class: ns.e('title'),
            // styleObj: $descriptionsHeaderTitleStyle,
            slot: props.slots?.title ?? props.title,
          }),
          new Div({
            name: 'extra',
            class: ns.e('extra'),
            slot: props.slots?.extra ?? props.extra,
          })
        ]
      }));
    }

    const rows = getRows(); // 获取数据排列的行数；
    console.log('rows is ', rows);
    this.rows = rows.map((row) => new TdDescriptionsRow({ row: row }));
    console.log('TdDescriptionsRow rows is ', this.rows);
    this.addChild(new Div({
      name: 'body',
      class: ns.e('body'),
      // styleObj: $descriptionsBodyStyle,
      slot: new Table({
        name: 'table',
        class: [ns.e('table'), ns.is('bordered', props.border)],
        // styleObj: $descriptionsBodyTableStyle,
        slot: [
          new TableBody({
            name: 'table-body',
            slot: this.rows,
          }),
        ],
      }),
    }));
    // this.useParams(props); // todo ????
  }
}
