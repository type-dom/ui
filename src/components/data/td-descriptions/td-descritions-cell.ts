import {
  Span,
  TableDataCell,
  TextNode,
  TypeElement
} from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { IUIConfig } from '../../../ui/ui.interface';
import { ITdDescriptionsItemConfig } from '../td-descriptions-item/td-descriptions-item.interface';
import {
  $descriptionsBodyTableCellStyle,
  $descriptionsCellContentStyle,
  $descriptionsCellLabelStyle,
  useBordered,
  useSize
} from './td-descriptions.style';
import { TdDescriptions } from './td-descriptions.class';
import { Property } from '@type-dom/css-type';

export interface ITdDescriptionsCellConfig extends IUIConfig {
  cell?: ITdDescriptionsItemConfig;
  tag?: string; // default: 'td',
  type?: string; // label content other
  span?: number; // add by me
}

export class TdDescriptionsCell extends UI {
  className: 'TdDescriptionsCell';
  override props: ITdDescriptionsCellConfig;

  constructor(params: ITdDescriptionsCellConfig = {}) {
    super();
    this.useTag(params?.tag || 'td');
    this.className = 'TdDescriptionsCell';
    this.props = this.useParams(params);
  }

  override created() {
    const descriptions = this.up<TdDescriptions>('TdDescriptions');
    // console.log('descriptions is ', descriptions);
    if (!descriptions) {
      throw Error('TdDescriptionsRow need TdDescriptions as parent. ');
    }
    const descriptionsConfig = descriptions.props;
    const isVertical = descriptionsConfig?.direction === 'vertical';
    // useSize(descriptionsConfig);
    // useBordered(descriptionsConfig);
    this.style.addObj($descriptionsBodyTableCellStyle);
    const props = this.props;
    const span =  props.cell?.span || 1;
    // console.log('span is ', span);
    switch (props.type) {
      case 'label':
        console.log('label . ');
        this.attr.addObj({
          colspan: isVertical ? span : 1,
          // colspan: span * 2 - 1 || 1
        });
        this.style.addObj($descriptionsCellLabelStyle);
        if (props.cell?.slots?.label) {
          this.addChild(props?.cell.slots.label);
        } else if (props.cell?.label) {
          this.addChild(new TextNode(props.cell.label));
          if (props.cell.labelStyle) {
            this.style.addObj(props.cell?.labelStyle);
          }
        }
        if (props.cell?.labelAlign) {
          this.style.addObj({
            textAlign: props.cell.labelAlign as Property.TextAlign
          });
        }
        if (props.cell?.width) {
          this.style.addObj({
            width: props.cell.width
          });
        }
        break;
      case 'content':
        // debugger;
        console.log('content . ');
        this.attr.addObj({
          colspan: span * 2 - 1 || 1
        });
        this.style.addObj($descriptionsCellContentStyle);
        if (typeof props.cell?.text === 'string') {
          this.addChild(new TextNode(props.cell.text));
        } else if (props.cell?.slot) {
          this.slotChild(props.cell.slot);
        }
        if (props.cell?.contentStyle) {
          this.style.addObj(props.cell.contentStyle);
        }
        if (props.cell?.align) {
          this.style.addObj({
            textAlign: props.cell.align as Property.TextAlign
          });
        }
        if (props.cell?.width) {
          this.style.addObj({
            width: props.cell.width
          });
        }
        break;
      default:
        this.attr.addObj({
          colspan: span
        });
        if (props.cell?.slots?.label) {
          props.cell.slots.label.style.setObj($descriptionsCellLabelStyle);
          this.addChild(props.cell?.slots?.label);
        } else if (props.cell?.label) {
          this.addChild(
            new Span({
              text: props.cell.label,
              styleObj: Object.assign(
                $descriptionsCellLabelStyle,
                props.cell.labelStyle
              )
            })
          );
        }
        if (props.cell?.text) {
          this.addChild(
            new Span({
              text: props.cell.text,
              styleObj: $descriptionsCellContentStyle
            })
          );
        } else if (props.cell?.slot) {
          this.slotChild(props.cell.slot);
        }
        break;
    }
  }
}
