import { TextNode, TypeFragment, TypeNode } from '@type-dom/framework';
import {
  ITdDescriptionsItem,
  DescriptionsItemProps,
} from './td-descriptions-item.interface';

export class TdDescriptionsItem
  extends TypeFragment
  implements ITdDescriptionsItem
{
  className: 'TdDescriptionsItem';
  override props: DescriptionsItemProps;
  label?: TypeNode;
  content?: TextNode;

  constructor(params: DescriptionsItemProps = {}) {
    super();
    this.className = 'TdDescriptionsItem';
    this.props = this.useParams(params);
  }
}
