import { Div, Span, TextNode, TypeElement } from '@type-dom/framework';
import { isFunction, isNumber } from '@type-dom/utils';
import { UI } from '../../../ui/ui.abstract';
import {
  ITdStatisticConfig,
  ITdStatisticAbstract
} from './td-statistic.interface';
import { $statistic } from './td-statistic.style';
import { Dayjs } from 'dayjs';

export abstract class TdStatisticAbstract
  extends UI
  implements ITdStatisticAbstract {
  abstract override className: 'TdStatistic' | 'TdCountDown';
  head?: Div;
  content: Div;
  prefix?: TypeElement;
  number: Span;
  suffix?: TypeElement;
  override props: ITdStatisticConfig;

  protected constructor(params: ITdStatisticConfig = {}) {
    super();
    console.warn('TdStatisticAbstract constructor . ');
    if (params?.title || params.slots?.title) {
      this.head = new Div({
        name: 'head',
        styleObj: {
          // font-weight: getCssVar('statistic-title-font-weight'),
          fontWeight: $statistic.titleFontWeight,
          // font-size: getCssVar('statistic-title-font-size'),
          fontSize: $statistic.titleFontSize,
          // color: getCssVar('statistic-title-color'),
          color: $statistic.titleColor,
          lineHeight: '20px',
          marginBottom: '4px'
        }
      });
      if (params?.title) {
        this.head.addChild(new TextNode(params.title));
      } else if (params.slots?.title) {
        console.warn('params.slots.title is ', params.slots.title);
        this.head.addChild(params.slots.title);
      }
      this.addChild(this.head);
    }
    this.content = new Div({
      name: 'content',
      styleObj: {
        // font-weight: getCssVar('statistic-content-font-weight');
        fontWeight: $statistic.contentFontWeight,
        // font-size: getCssVar('statistic-content-font-size');
        fontSize: $statistic.contentFontSize,
        // color: getCssVar('statistic-content-color');
        color: $statistic.contentColor
      }
    });
    if (params?.valueStyle) {
      this.content.style.addObj(params.valueStyle);
    }
    this.addChild(this.content);
    if (params?.prefix) {
      this.prefix = new Div({
        name: 'prefix',
        styleObj: {
          marginRight: '4px',
          display: 'inline-block'
        },
        childNodes: [
          new Span({
            text: params.prefix
          })
        ]
      });
      this.content.addChild(this.prefix);
    }
    if (params?.slots?.prefix) {
      this.prefix = params.slots.prefix;
      this.content.addChild(params.slots.prefix);
    }
    this.number = new Span({
      text: this.formatValue(params?.value || 0),
      styleObj: {
        display: 'inline-block'
      }
    });
    this.content.addChild(this.number);
    if (params?.suffix) {
      this.suffix = new Div({
        name: 'suffix',
        styleObj: {
          marginLeft: '4px',
          display: 'inline-block'
        },
        childNodes: [
          new Span({
            text: params.suffix
          })
        ]
      });
      this.content.addChild(this.suffix);
    }
    if (params?.slots?.suffix) {
      this.suffix = params.slots.suffix;
      this.content.addChild(params.slots.suffix);
    }
    this.props = this.useParams(params);
  }

  formatValue(value: number | string | Dayjs): string {
    const { formatter, precision, decimalSeparator, groupSeparator } =
      this.props;

    if (isFunction(formatter)) {
      return formatter(value as number);
    }

    if (!isNumber(value)) {
      return String(value);
    }

    let [integer, decimal = ''] = String(value).split('.');
    decimal = decimal
      .padEnd(precision || 0, '0') // precision 默认为 0；
      .slice(0, (precision || 0) > 0 ? precision! : 0);
    // groupSeparator 默认 ,
    integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator || ',');
    return [integer, decimal].join(decimal ? decimalSeparator! : '');
  }
}
