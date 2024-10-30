import { Div, Table, TableBody } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { ISize } from '../../../styles/size';
import { TdDescriptionsItem } from '../td-descriptions-item/td-descriptions-item.class';
import { ITdDescriptionsItemConfig } from '../td-descriptions-item/td-descriptions-item.interface';
import {
  ITdDescriptions,
  ITdDescriptionsConfig
} from './td-descriptions.interface';
import { TdDescriptionsRow } from './td-descriptions-row';
import {
  $descriptionsBodyStyle, $descriptionsBodyTableCellStyle,
  $descriptionsBodyTableStyle,
  $descriptionsHeaderStyle,
  $descriptionsHeaderTitleStyle,
  $descriptionsStyle,
  useBordered,
  useSize
} from './td-descriptions.style';

export class TdDescriptions extends UI implements ITdDescriptions {
  className: 'TdDescriptions';
  private header?: Div;
  private body?: Div;
  private rows?: TdDescriptionsRow[];
  private headerTitle?: Div;
  private bodyTable?: Table;
  override props: ITdDescriptionsConfig;

  constructor(params: ITdDescriptionsConfig) {
    super();
    this.className = 'TdDescriptions';
    this.props = this.useParams(params);
  }

  override created() {
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
          childNodes: [props.slots.title],
        });
      } else {
        this.headerTitle = new Div({
          name: 'title',
          text: props.title,
          styleObj: $descriptionsHeaderTitleStyle,
        });
      }
      this.header.addChild(this.headerTitle);
      if (props?.slots?.extra) {
        this.header.addChild(
          new Div({
            name: 'extra',
            childNodes: [props.slots.extra],
          })
        );
      } else {
        this.header.addChild(
          new Div({
            name: 'extra',
            text: props.extra,
          })
        );
      }
    }
    if (!props?.slot) {
      throw Error('slot is required . ');
    }
    const items = this.getRows();
    console.log('items is ', items);
    const rows: TdDescriptionsRow[] = [];
    for (const item of items) {
      rows.push(new TdDescriptionsRow({ row: item }));
    }
    console.log('rows is ', rows);
    this.rows = rows;
    this.body = new Div({
      name: 'body',
      styleObj: $descriptionsBodyStyle,
    });
    this.bodyTable = new Table({
      name: 'table',
      styleObj: $descriptionsBodyTableStyle,
      childNodes: [
        new TableBody({
          name: 'table-body',
          childNodes: rows,
        }),
      ],
    });
    this.body.addChild(this.bodyTable);
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
      node.props = {} as ITdDescriptionsItemConfig;
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
    const children = props.slot.filter(
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

  setSize(size: ISize) {
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
