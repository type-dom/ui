import { defineExpose, Div, Span, TypeDiv } from '@type-dom/framework';
import { Computed, computed } from '@type-dom/signals';
import { isFunction, isNumber } from '@type-dom/utils';
import { useNamespace } from '../../../hooks/use-namespace';
import { StatisticProps, ITdStatistic } from './td-statistic.interface';
import { statisticProps } from './td-statistic.const';
import './style/index';

export class TdStatistic extends TypeDiv implements ITdStatistic {
  className: 'TdStatistic';
  override props: StatisticProps;
  displayValue?: Computed;

  constructor(params: StatisticProps = {}) {
    super();
    // console.warn('TdStatistic constructor . ');
    this.className = 'TdStatistic';
    this.assignProps(statisticProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('statistic');

    const displayValue = computed(() => {
      const { formatter, value, precision, decimalSeparator, groupSeparator } =
        props;

      if (isFunction(formatter)) {
        return formatter(value);
      }

      // https://github.com/element-plus/element-plus/issues/17784
      if (!isNumber(value) || Number.isNaN(value)) {
        return value;
      }

      let [integer, decimal = ''] = String(value).split('.');
      decimal = decimal
        .padEnd(precision!, '0')
        .slice(0, precision! > 0 ? precision : 0);
      integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator!);
      return [integer, decimal].join(decimal ? decimalSeparator : '');
    });

    defineExpose({
      /**
       * @description current display value
       */
      displayValue,
    });

    // this.assignProps({ // 这样的class有问；
    //   class: ns.b()
    // });
    this.attr.addClass(ns.b());

    if (props.slots?.title || props.title) {
      this.addChild(
        new Div({
          class: ns.e('head'),
          slot: props.slots?.title ?? props.title,
        })
      );
    }
    this.addChild(
      new Div({
        class: ns.e('content'),
        slot: [
          new Div({
            vIf: props.slots?.prefix || props.prefix,
            class: ns.e('prefix'),
            slot: props.slots?.prefix ?? props.prefix,
          }),
          new Span({
            class: ns.e('number'),
            styleObj: props.valueStyle,
            slot: displayValue,
          }),
          new Div({
            vIf: props.slots?.suffix || props.suffix,
            class: ns.e('suffix'),
            slot: props.slots?.suffix ?? props.suffix,
          }),
        ],
      })
    );
  }
}
