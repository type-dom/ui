import { TextNode, TypeNode } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import {
  ITdDescriptionsItem,
  ITdDescriptionsItemConfig
} from './td-descriptions-item.interface';

export class TdDescriptionsItem extends UI implements ITdDescriptionsItem {
  className: 'TdDescriptionsItem';
  override props: ITdDescriptionsItemConfig
  label?: TypeNode;
  content?: TextNode;

  constructor(params: ITdDescriptionsItemConfig = {}) {
    super();
    this.className = 'TdDescriptionsItem';
    // if (config?.slots?.label) {
    //   this.label = config.slots.label
    // } else if (config?.label) {
    //   this.label = new TextNode(config.label);
    // }

    this.addChild(this.getSlotNode());
    this.props = this.useParams(params);
  }
}
