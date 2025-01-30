import {
  ITypeFragment,
  TypeFragmentProps,
  TableRow,
  TypeFragment,
} from '@type-dom/framework';
import { TdDescriptionsItem } from '../td-descriptions-item/td-descriptions-item.class';
import { TdDescriptions } from './td-descriptions.class';
import { TdDescriptionsCell } from './td-descritions-cell';
import { descriptionsKey } from './token';
import { IDescriptionsInject } from './td-descriptions.interface';

export interface ITdDescriptionsRow extends ITypeFragment {
  className: 'TdDescriptionsRow';
  props: DescriptionsRowProps;
}

export interface DescriptionsRowProps extends TypeFragmentProps {
  row?: TdDescriptionsItem[];
  //   type: definePropType<DescriptionItemVNode[]>(Array),
  //   default: () => [],
  // },
}

/**
 * @name TdDescriptionsRow
 * @description
 * @author darcrand
 */
export class TdDescriptionsRow
  extends TypeFragment
  implements ITdDescriptionsRow
{
  className: 'TdDescriptionsRow';
  override props: DescriptionsRowProps;
  override childNodes: TableRow[];

  constructor(params: DescriptionsRowProps = {}) {
    super();
    this.className = 'TdDescriptionsRow';
    this.childNodes = [];
    this.props = this.useParams(params);
  }

  override setup() {
    // todo  descriptions.direction === 'vertical'
    //     descriptions.border 根据这两个条件判断，创建cell.
    console.log('TdDescriptionsRow setup . ');
    const descriptionsConfig =
      this.inject<IDescriptionsInject>(descriptionsKey);
    if (!descriptionsConfig) {
      throw Error('TdDescriptionsRow need TdDescriptions as parent. ');
    }
    // useSize(descriptionsConfig);
    // useBordered(descriptionsConfig);
    if (descriptionsConfig?.direction === 'vertical') {
      //   todo  要加 两个 tr , 这样就不是 一个 tr 的组件了。
      console.log('vertical . ');
      const labelTr = new TableRow();
      const contentTr = new TableRow();
      const row = this.props?.row || [];
      row.forEach((item, index) => {
        labelTr.addChild(
          new TdDescriptionsCell({
            cell: item.props,
            tag: 'th',
            type: 'label',
          })
        );
      });
      row.forEach((item, index) => {
        contentTr.addChild(
          new TdDescriptionsCell({
            cell: item.props,
            tag: 'td',
            type: 'content',
          })
        );
      });
      this.addChildren(labelTr, contentTr);
    } else {
      console.warn('horizontal . ');
      const tr = new TableRow();
      const row = this.props.row || [];
      row.forEach((item) => {
        if (descriptionsConfig.border) {
          tr.addChildren(
            new TdDescriptionsCell({
              cell: item.props,
              tag: 'td',
              type: 'label',
            }),
            new TdDescriptionsCell({
              cell: item.props,
              tag: 'td',
              type: 'content',
            })
          );
        } else {
          tr.addChild(
            new TdDescriptionsCell({
              cell: item.props,
              tag: 'td',
              type: 'both',
            })
          );
        }
      });
      this.addChild(tr);
    }
  }
}
