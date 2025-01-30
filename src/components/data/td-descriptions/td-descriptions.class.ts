import { Div, Table, TableBody, TypeDiv } from '@type-dom/framework';
import { ComponentSize } from '../../../constants/size';
import { TdDescriptionsItem } from '../td-descriptions-item/td-descriptions-item.class';
import { DescriptionsItemProps } from '../td-descriptions-item/td-descriptions-item.interface';
import {
  IDescriptionsInject,
  ITdDescriptions,
  DescriptionsProps,
} from './td-descriptions.interface';
import { TdDescriptionsRow } from './td-descriptions-row';
import {
  $descriptionsBodyStyle,
  $descriptionsBodyTableCellStyle,
  $descriptionsBodyTableStyle,
  $descriptionsHeaderStyle,
  $descriptionsHeaderTitleStyle,
  $descriptionsStyle,
  useBordered,
  useSize,
} from './td-descriptions.style';
import { descriptionProps, descriptionsKey } from './token';

export class TdDescriptions extends TypeDiv implements ITdDescriptions {
  className: 'TdDescriptions';
  override props: DescriptionsProps;
  private header?: Div;
  private body?: Div;
  private rows?: TdDescriptionsRow[];
  private headerTitle?: Div;
  private bodyTable?: Table;

  constructor(params: DescriptionsProps) {
    super();
    this.className = 'TdDescriptions';
    this.assignProps(descriptionProps);
    this.props = this.useParams(params);
    this.provide(descriptionsKey, this.props as IDescriptionsInject);
  }

  override setup() {
    const props = this.props;
    useSize(props);
    useBordered(props);
    if (
      props?.title ||
      props?.extra ||
      props?.slots?.title ||
      props?.slots?.extra
    ) {
      this.header = new Div({
        name: 'header',
        styleObj: $descriptionsHeaderStyle,
      });
      this.addChild(this.header);
      this.headerTitle = new Div({
        name: 'title',
        styleObj: $descriptionsHeaderTitleStyle,
      });
      if (props?.slots?.title) {
        this.headerTitle = new Div({
          name: 'title',
          styleObj: $descriptionsHeaderTitleStyle,
          slot: [props.slots.title],
        });
      } else {
        this.headerTitle = new Div({
          name: 'title',
          slot: props.title,
          styleObj: $descriptionsHeaderTitleStyle,
        });
      }
      this.header.addChild(this.headerTitle);
      if (props?.slots?.extra) {
        this.header.addChild(
          new Div({
            name: 'extra',
            slot: [props.slots.extra],
          })
        );
      } else {
        this.header.addChild(
          new Div({
            name: 'extra',
            slot: props.extra,
          })
        );
      }
    }
    if (!props?.slot) {
      throw Error('slot is required . ');
    }
    const rows = this.getRows(); // 获取数据排列的行数；
    console.log('rows is ', rows);
    this.rows = rows.map((row) => new TdDescriptionsRow({ row: row }));
    console.log('TdDescriptionsRow rows is ', this.rows);
    this.bodyTable = new Table({
      name: 'table',
      styleObj: $descriptionsBodyTableStyle,
      slot: [
        new TableBody({
          name: 'table-body',
          slot: this.rows,
        }),
      ],
    });
    this.body = new Div({
      name: 'body',
      styleObj: $descriptionsBodyStyle,
      slot: this.bodyTable,
    });
    this.addChild(this.body);
    this.useParams(props); // todo ????
  }

  filledNode(
    node: TdDescriptionsItem,
    span: number,
    count: number,
    isLast = false
  ) {
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

  getRows() {
    const props = this.props;
    const children = props.slot?.filter(
      (item) => item instanceof TdDescriptionsItem
    ) as TdDescriptionsItem[];
    const rows: TdDescriptionsItem[][] = [];
    let temp: TdDescriptionsItem[] = [];
    let count = props.column || 3;
    let totalSpan = 0; // all spans number of item
    children.forEach((child, index) => {
      const span = child.props.span || 1;

      if (index < children.length - 1) {
        totalSpan += span > count ? count : span;
      }

      if (index === children.length - 1) {
        // calculate the last item span
        const lastSpan =
          (props.column || 3) - (totalSpan % (props.column || 3));
        // const lastSpan = count - (totalSpan % count)
        temp.push(this.filledNode(child, lastSpan, count, true));
        rows.push(temp);
        return;
      }

      if (span < count) {
        count -= span;
        temp.push(child);
      } else {
        temp.push(this.filledNode(child, span, count));
        rows.push(temp);
        count = props.column || 3;
        temp = [];
      }
    });
    console.log('rows is ', rows);
    return rows;
  }

  setSize(size: ComponentSize) {
    this.props.size = size;
    useSize(this.props);
    useBordered(this.props);
    this.style.setObj($descriptionsStyle);
    this.header?.style.setObj($descriptionsHeaderStyle);
    this.headerTitle?.style.setObj($descriptionsHeaderTitleStyle);
    this.body?.style.setObj($descriptionsBodyStyle);
    this.bodyTable?.style.setObj($descriptionsBodyTableStyle);
    this.rows?.forEach((row) => {
      row.childNodes.forEach((tr) => {
        tr.childNodes.forEach((td) => {
          td.style.setObj($descriptionsBodyTableCellStyle);
        });
      });
    });
  }
}
