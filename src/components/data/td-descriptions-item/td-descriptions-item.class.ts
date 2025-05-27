import { TextNode, TypeFragment, TypeNode } from '@type-dom/framework';
import { ITdDescriptionsItem, DescriptionsItemProps, } from './td-descriptions-item.interface';
import { descriptionsItemProps } from './td-descriptions-item.const';
import './style/index';

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
    this.assignProps(descriptionsItemProps);
    this.props = this.useParams(params);
  }
}
