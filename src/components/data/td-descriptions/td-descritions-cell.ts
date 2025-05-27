import { IStyle } from '@type-dom/css-type';
import {
  TypeProps,
  Span,
  TextNode,
  TypeHtml,
  inject,
} from '@type-dom/framework';
import { addUnit } from '@type-dom/utils';
import { useNamespace } from '../../../hooks/use-namespace/index';
import { DescriptionsItemProps } from '../td-descriptions-item/td-descriptions-item.interface';
import { IDescriptionsInject } from './td-descriptions.interface';
import { descriptionsKey } from './token';

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
    const descriptions = inject(descriptionsKey, {} as IDescriptionsInject);
    if (!descriptions) {
      throw Error('TdDescriptionsRow need TdDescriptions as parent. ');
    }
    const props = this.props;
    const item = props.cell!;

    const { border } = descriptions;
    const isVertical = descriptions?.direction === 'vertical';
    // useSize(descriptionsConfig);
    // useBordered(descriptionsConfig);
    // this.style.addObj($descriptionsBodyTableCellStyle);
    const span = item.span || 1;
    // console.log('span is ', span);
    const rowspan = item.rowspan || 1;
    const align = item.align ? `is-${item.align}` : ''
    const labelAlign = item.labelAlign ? `is-${item.labelAlign}` : align
    const className = item.className
    const labelClassName = item.labelClassName
    let width =
      props.type === 'label'
        ? item.labelWidth || descriptions.labelWidth || item.width
        : item.width

    const style = {
      width: addUnit(width),
      minWidth: addUnit(item.minWidth),
    }
    const ns = useNamespace('descriptions')
    const labelStyle = {} as IStyle;

    switch (props.type) {
      case 'label':
        console.log('label . ');
        this.style.addObj(style);
        this.attr.addObj({
          colspan: isVertical ? span : 1,
        });
        this.attr.addClass([
          ns.e('cell'),
          ns.e('label'),
          ns.is('bordered-label', border),
          ns.is('vertical-label', isVertical),
          labelAlign,
          labelClassName,
        ])
        this.attr.addObj({
          colspan: isVertical ? span : 1,
          rowspan: isVertical ? 1 : rowspan,
        })
        if (props.cell?.slots?.label) {
          this.addChild(props?.cell.slots.label);
        } else if (props.cell?.label) {
          this.addChild(new TextNode(props.cell.label));
          // if (props.cell?.labelStyle) {
          //   this.style.addObj(props.cell?.labelStyle);
          // }
        }
        // if (props.cell?.labelAlign) {
        //   this.style.addObj({
        //     textAlign: props.cell.labelAlign as Property.TextAlign,
        //   });
        // }
        // if (props.cell?.width) {
        //   this.style.addObj({
        //     width: props.cell.width,
        //   });
        // }
        break;
      case 'content':
        console.log('content . ');
        this.attr.addClass([
          ns.e('cell'),
          ns.e('content'),
          ns.is('bordered-content', border),
          ns.is('vertical-content', isVertical),
          align,
          className,
        ]);
        this.attr.addObj({
          // colspan: span * 2 - 1 || 1,
          colspan: isVertical ? span : span * 2 - 1,
          rowspan: isVertical ? rowspan * 2 - 1 : rowspan,
        });
        this.style.addObj(style);
        // this.style.addObj($descriptionsCellContentStyle);

        if (props.cell?.slot) {
          this.slotChildren(props.cell.slot);
        }
        // if (props.cell?.contentStyle) {
        //   this.style.addObj(props.cell.contentStyle);
        // }
        // if (props.cell?.align) {
        //   this.style.addObj({
        //     textAlign: props.cell.align as Property.TextAlign,
        //   });
        // }
        // if (props.cell?.width) {
        //   this.style.addObj({
        //     width: props.cell.width,
        //   });
        // }
        break;
      default: // both
        width = addUnit(item.labelWidth || descriptions.labelWidth)
        if (width) {
          labelStyle.width = width
          labelStyle.display = 'inline-block'
        }
        this.style.addObj(style);
        this.attr.addClass([ns.e('cell'), align]);
        this.attr.addObj({
          colspan: span,
          rowspan
        });
        // if (props.cell?.slots?.label) {
          this.addChild(new Span({
            styleObj: labelStyle,
            class: [ns.e('label'), labelClassName],
            slot: props.cell?.slots?.label ?? props.cell?.label
          }))
          // props.cell.slots.label.style.setObj($descriptionsCellLabelStyle);
          // this.addChild(props.cell.slots.label);
        // } else if (props.cell?.label) {
        //   this.addChild(
        //     new Span({
        //       styleObj: style,
        //       class: [ns.e('label'), labelClassName],
        //       slot: props.cell.label,
        //     })
        //   );
        // }
        // if (
        //   typeof props.cell?.slot === 'string' ||
        //   props.cell?.slot instanceof Signal ||
        //   props.cell?.slot instanceof Computed
        // ) {
          this.addChild(
            new Span({
              class: [ns.e('content'), className],
              slot: props.cell?.slot,
            })
          );
        // } else if (props.cell?.slot) {
        //   this.slotChildren(props.cell.slot);
        // }
        break;
    }
  }
}
