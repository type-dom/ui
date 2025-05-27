import {
  inject,
  Fragment,
  ITypeFragment,
  TypeFragmentProps,
  TableRow,
  TypeFragment,
} from '@type-dom/framework';
import { TdDescriptionsItem } from '../td-descriptions-item/td-descriptions-item.class';
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

export const descriptionsRowProps: DescriptionsRowProps = {
  row: [],
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
  // override childNodes: TableRow[];

  constructor(params: DescriptionsRowProps = {}) {
    super();
    this.className = 'TdDescriptionsRow';
    this.assignProps(descriptionsRowProps);
    // this.childNodes = [];
    this.props = this.useParams(params);
  }

  override setup() {
    // todo  descriptions.direction === 'vertical'
    //     descriptions.border 根据这两个条件判断，创建cell.
    console.log('TdDescriptionsRow setup . ');
    const props = this.props;
    const descriptions = inject(descriptionsKey, {} as IDescriptionsInject);
    if (!descriptions) {
      throw Error('TdDescriptionsRow need TdDescriptions as parent. ');
    }
    if (descriptions?.direction === 'vertical') {
      console.log('vertical . ');
      this.addChildren(
        new TableRow({
          slot: props.row?.map((cell, _index) =>  new TdDescriptionsCell({
            cell: cell.props,
            tag: 'th',
            type: 'label',
          }))
        }),
        new TableRow({
          slot: props.row?.map((cell, _index) =>  new TdDescriptionsCell({
            cell: cell.props,
            tag: 'td',
            type: 'content',
          }))
        })
      );
    } else {
      console.warn('horizontal . ');
      this.addChild(new TableRow({
        slot: props.row?.map((cell, _index) => {
          if (descriptions.border) {
            return new Fragment({
              slot: [
                new TdDescriptionsCell({
                  cell: cell.props,
                  tag: 'td',
                  type: 'label'
                }),
              new TdDescriptionsCell({
                cell: cell.props,
                tag: 'td',
                type: 'content'
              })
          ]
          });
          } else {
            return new TdDescriptionsCell({
              cell: cell.props,
              tag: 'td',
              type: 'both',
            });
          }
        })
      }));
    }
  }
}
