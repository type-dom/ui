import { computed, unref } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import {
  ElCheckSvg,
  ElCircleCheckSvg,
  ElCircleCloseSvg,
  ElCloseSvg,
  ElWarningFilledSvg,
} from '@type-dom/svgs';
import { isFunction, isString } from '@type-dom/utils';
import {
  Div,
  Fragment,
  Span,
  SvgPath,
  SvgSvg,
  TypeDiv,
} from '@type-dom/framework';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { ProgressColor, ProgressProps } from './td-progress.interface';
import { progressProps } from './td-progress.const';
import './style/index';

export class TdProgress extends TypeDiv {
  className: 'TdProgress';
  override props: ProgressProps;

  constructor(params: ProgressProps = {}) {
    super();
    this.className = 'TdProgress';

    this.assignProps(progressProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const STATUS_COLOR_MAP: Record<string, string> = {
      success: '#13ce66',
      exception: '#ff4949',
      warning: '#e6a23c',
      default: '#20a0ff',
    };

    const props = this.props;
    const emit = this.emit;

    const ns = useNamespace('progress');

    const barStyle = computed<IStyle>(() => {
      const barStyle: IStyle = {
        width: `${unref(props.percentage)}%`,
        animationDuration: `${props.duration}s`,
      };
      const color = getCurrentColor(unref(props.percentage)!);
      if (color.includes('gradient')) {
        barStyle.background = color;
      } else {
        barStyle.backgroundColor = color;
      }
      return barStyle;
    });

    const relativeStrokeWidth = computed(() =>
      ((props.strokeWidth! / props.width!) * 100).toFixed(1)
    );

    const radius = computed(() => {
      if (['circle', 'dashboard'].includes(props.type!)) {
        return Number.parseInt(
          `${50 - Number.parseFloat(relativeStrokeWidth.get()) / 2}`,
          10
        );
      }
      return 0;
    });

    const trackPath = computed(() => {
      const r = radius.get();
      const isDashboard = props.type === 'dashboard';
      return `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
          `;
    });

    const perimeter = computed(() => 2 * Math.PI * radius.get());

    const rate = computed(() => (props.type === 'dashboard' ? 0.75 : 1));

    const strokeDashoffset = computed(() => {
      const offset = (-1 * perimeter.get() * (1 - rate.get())) / 2;
      return `${offset}px`;
    });

    const trailPathStyle = computed<IStyle>(() => ({
      strokeDasharray: `${
        perimeter.get() * rate.get()
      }px, ${perimeter.get()}px`,
      strokeDashoffset: strokeDashoffset.get(),
    }));

    const circlePathStyle = computed<IStyle>(() => ({
      strokeDasharray: `${
        perimeter.get() * rate.get() * (unref(props.percentage)! / 100)
      }px, ${perimeter.get()}px`,
      strokeDashoffset: strokeDashoffset.get(),
      transition:
        'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease, opacity ease 0.6s',
    }));

    const stroke = computed(() => {
      let ret: string;
      if (props.color) {
        ret = getCurrentColor(unref(props.percentage)!);
      } else {
        ret = STATUS_COLOR_MAP[props.status!] || STATUS_COLOR_MAP.default;
      }
      return ret;
    });

    const statusIcon = computed(() => {
      if (props.status === 'warning') {
        return ElWarningFilledSvg;
      }
      if (props.type === 'line') {
        return props.status === 'success' ? ElCircleCheckSvg : ElCircleCloseSvg;
      } else {
        return props.status === 'success' ? ElCheckSvg : ElCloseSvg;
      }
    });

    const progressTextSize = computed(() => {
      return props.type === 'line'
        ? 12 + props.strokeWidth! * 0.4
        : props.width! * 0.111111 + 2;
    });

    const content = computed(() => props.format?.(unref(props.percentage)!));

    function getColors(color: ProgressColor[]) {
      const span = 100 / color.length;
      const seriesColors = color.map((seriesColor, index) => {
        if (isString(seriesColor)) {
          return {
            color: seriesColor,
            percentage: (index + 1) * span,
          };
        }
        return seriesColor;
      });
      return seriesColors.sort((a, b) => a.percentage - b.percentage);
    }

    const getCurrentColor = (percentage: number) => {
      const color  = unref(props.color);
      if (isFunction(color)) {
        return color(percentage);
      } else if (isString(color)) {
        return color;
      } else {
        const colors = getColors(color as ProgressColor[]);
        for (const color of colors) {
          if (color.percentage > percentage) return color.color;
        }
        return colors[colors.length - 1]?.color;
      }
    };

    this.attr.addClass(
      computed(() => [
        ns.b(),
        ns.m(props.type),
        ns.is(props.status!),
        {
          [ns.m('without-text')]: !props.showText,
          [ns.m('text-inside')]: props.textInside,
        },
      ])
    );

    this.attr.addObj({
      role: 'progressbar',
      ariaValuenow: props.percentage,
      ariaValuemin: 0,
      ariaValuemax: 100,
    });

    if (props.type === 'line') {
      console.warn('line progress');
      this.addChild(
        new Div({
          class: ns.b('bar'),
          slot: new Div({
            class: ns.be('bar', 'outer'),
            styleObj: {
              height: `${props.strokeWidth}px`,
            },
            slot: new Div({
              class: [
                ns.be('bar', 'inner'),
                {
                  [ns.bem('bar', 'inner', 'indeterminate')]:
                    props.indeterminate,
                },
                { [ns.bem('bar', 'inner', 'striped')]: props.striped },
                { [ns.bem('bar', 'inner', 'striped-flow')]: props.stripedFlow },
              ],
              styleObj: barStyle,
              slot: new Div({
                vIf:
                  (props.showText || (props.slots?.default ?? props.slot)) &&
                  !!props.textInside,
                class: ns.be('bar', 'innerText'),
                slot: isFunction(props.slot)
                  ? props.slot(props.percentage)
                  : props.slot
                    ? this.props.slot
                    : new Span({ slot: content }),
              }),
            }),
          }),
        })
      );
    } else {
      this.addChild(
        new Div({
          class: ns.b('circle'),
          styleObj: {
            height: `${props.width}px`,
            width: `${props.width}px`,
          },
          slot: new SvgSvg({
            attrObj: {
              viewBox: '0 0 100 100',
            },
            slot: [
              new SvgPath({
                attrObj: {
                  class: ns.be('circle', 'track'),
                  d: trackPath.get(),
                  stroke: `var(${ns.cssVarName('fill-color-light')}, #e5e9f2)`,
                  strokeLinecap: props.strokeLinecap,
                  strokeWidth: Number(relativeStrokeWidth.get()),
                  fill: 'none',
                },
                styleObj: trailPathStyle,
              }),
              new SvgPath({
                attrObj: {
                  class: ns.be('circle', 'path'),
                  d: trackPath.get(),
                  stroke: stroke,
                  fill: 'none',
                  opacity: props.percentage ? 1 : 0,
                  strokeLinecap: this.props.strokeLinecap,
                  strokeWidth: Number(relativeStrokeWidth.get()),
                },
                styleObj: circlePathStyle,
              }),
            ],
          }),
        })
      );
    }

    if (
      (props.showText || props.slots?.default || props.slot) &&
      !props.textInside
    ) {
      this.addChild(
        new Div({
          class: ns.e('text'),
          styleObj: {
            fontSize: `${progressTextSize.get()}px`,
          },
          slot: isFunction(props.slot)
            ? props.slot(props.percentage)
            : props.slot
              ? props.slot
              : new Fragment({
                slot: !props.status
                  ? new Span({
                    slot: content,
                  })
                  : new TdIcon({
                    slot: new (statusIcon.get() as any)(),
                  })
              }),
        })
      );
    }
  }
}
