import { Property } from '@type-dom/css-type';
import { TypeProps, Span, TextNode, TypeHtml } from '@type-dom/framework';
import { DescriptionsItemProps } from '../td-descriptions-item/td-descriptions-item.interface';
import {
  $descriptionsBodyTableCellStyle,
  $descriptionsCellContentStyle,
  $descriptionsCellLabelStyle,
} from './td-descriptions.style';
import { IDescriptionsInject } from './td-descriptions.interface';
import { descriptionsKey } from './token';
import { Computed, Signal } from '@type-dom/signals';

export interface DescriptionsCellProps extends TypeProps {
  cell?: DescriptionsItemProps;
  tag?: string; // default: 'td',
  type?: string; // label content other
  span?: number; // add by me
}

export class TdDescriptionsCell extends TypeHtml {
  className: 'TdDescriptionsCell';
  override props: DescriptionsCellProps;
  dom?: HTMLElement;

  constructor(params: DescriptionsCellProps = {}) {
    super();
    this.className = 'TdDescriptionsCell';
    this.assignProps({
      nodeName: params.tag || 'td',
    });
    this.props = this.useParams(params);
  }

  override setup() {
    const descriptionsConfig =
      this.inject<IDescriptionsInject>(descriptionsKey);
    if (!descriptionsConfig) {
      throw Error('TdDescriptionsRow need TdDescriptions as parent. ');
    }
    const isVertical = descriptionsConfig?.direction === 'vertical';
    // useSize(descriptionsConfig);
    // useBordered(descriptionsConfig);
    this.style.addObj($descriptionsBodyTableCellStyle);
    const props = this.props;
    const span = props.cell?.span || 1;
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
            textAlign: props.cell.labelAlign as Property.TextAlign,
          });
        }
        if (props.cell?.width) {
          this.style.addObj({
            width: props.cell.width,
          });
        }
        break;
      case 'content':
        // debugger;
        console.log('content . ');
        this.attr.addObj({
          colspan: span * 2 - 1 || 1,
        });
        this.style.addObj($descriptionsCellContentStyle);
        if (props.cell?.slot) {
          this.slotChildren(props.cell.slot);
        }
        if (props.cell?.contentStyle) {
          this.style.addObj(props.cell.contentStyle);
        }
        if (props.cell?.align) {
          this.style.addObj({
            textAlign: props.cell.align as Property.TextAlign,
          });
        }
        if (props.cell?.width) {
          this.style.addObj({
            width: props.cell.width,
          });
        }
        break;
      default: // both
        this.attr.addObj({
          colspan: span,
        });
        if (props.cell?.slots?.label) {
          props.cell.slots.label.style.setObj($descriptionsCellLabelStyle);
          this.addChild(props.cell.slots.label);
        } else if (props.cell?.label) {
          this.addChild(
            new Span({
              slot: props.cell.label,
              styleObj: Object.assign(
                {},
                $descriptionsCellLabelStyle,
                props.cell.labelStyle
              ),
            })
          );
        }
        if (
          typeof props.cell?.slot === 'string' ||
          props.cell?.slot instanceof Signal ||
          props.cell?.slot instanceof Computed
        ) {
          this.addChild(
            new Span({
              slot: props.cell.slot,
              styleObj: $descriptionsCellContentStyle,
            })
          );
        } else if (props.cell?.slot) {
          this.slotChildren(props.cell.slot);
        }
        break;
    }
  }
}
