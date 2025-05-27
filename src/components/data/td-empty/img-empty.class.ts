import {
  TypeProps,
  SvgDefs,
  SvgG,
  SvgLinearGradient,
  SvgPath,
  SvgPolygon,
  SvgRect,
  SvgStop,
  SvgUse,
  TypeSvgSvg,
} from '@type-dom/framework';
import { useNamespace } from '../../../hooks/use-namespace';
import { useId } from '../../../hooks/use-id';

export class ImgEmpty extends TypeSvgSvg {
  className: 'ImgEmpty';

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'ImgEmpty';
    this.attr.addObj({
      viewBox: '0 0 79 86',
    });
    this.props = this.useParams(params);
  }

  override setup() {
    const ns = useNamespace('empty');
    const id = useId();

    this.addChild(
      new SvgDefs({
        slot: [
          new SvgLinearGradient({
            attrObj: {
              id: `linearGradient-1-` + id.get(),
              x1: '38.8503086%',
              y1: '0%',
              x2: '61.1496914%',
              y2: '100%',
            },
            slot: [
              new SvgStop({
                attrObj: {
                  stopColor: `var(${ns.cssVarBlockName('fill-color-1')})`,
                  offset: '0%',
                },
              }),
              new SvgStop({
                attrObj: {
                  stopColor: `var(${ns.cssVarBlockName('fill-color-4')})`,
                  offset: '100%',
                },
              }),
            ],
          }),
          new SvgLinearGradient({
            attrObj: {
              id: `linearGradient-2-` + id.get(),
              x1: '0%',
              y1: '9.5%',
              x2: '100%',
              y2: '90.5%',
            },
            slot: [
              new SvgStop({
                attrObj: {
                  stopColor: `var(${ns.cssVarBlockName('fill-color-1')})`,
                  offset: '0%',
                },
              }),
              new SvgStop({
                attrObj: {
                  stopColor: `var(${ns.cssVarBlockName('fill-color-6')})`,
                  offset: '100%',
                },
              }),
            ],
          }),
          new SvgRect({
            attrObj: {
              id: `path-3-` + id.get(),
              x: 0,
              y: 0,
              width: 17,
              height: 36,
            },
          }),
        ],
      })
    );
    this.addChild(
      new SvgG({
        attrObj: {
          stroke: 'none',
          strokeWidth: '1',
          fill: 'none',
          fillRule: 'evenodd',
        },
        slot: [
          new SvgG({
            attrObj: {
              transform: 'translate(-1268.000000, -535.000000)',
            },
            slot: [
              new SvgG({
                attrObj: {
                  transform: 'translate(1268.000000, 535.000000)',
                },
                slot: [
                  new SvgPath({
                    attrObj: {
                      d: 'M39.5,86 C61.3152476,86 79,83.9106622 79,81.3333333 C79,78.7560045 57.3152476,78 35.5,78 C13.6847524,78 0,78.7560045 0,81.3333333 C0,83.9106622 17.6847524,86 39.5,86 Z',
                      fill: `var(${ns.cssVarBlockName('fill-color-3')})`,
                    },
                  }),
                  new SvgPolygon({
                    attrObj: {
                      fill: `var(${ns.cssVarBlockName('fill-color-7')})`,
                      transform:
                        'translate(27.500000, 51.500000) scale(1, -1) translate(-27.500000, -51.500000) ',
                      points: '13 58 53 58 42 45 2 45',
                    },
                  }),
                  new SvgG({
                    attrObj: {
                      transform:
                        'translate(34.500000, 31.500000) scale(-1, 1) rotate(-25.000000) translate(-34.500000, -31.500000) translate(7.000000, 10.000000)',
                    },
                    slot: [
                      new SvgPolygon({
                        attrObj: {
                          fill: `var(${ns.cssVarBlockName('fill-color-7')})`,
                          transform:
                            'translate(11.500000, 5.000000) scale(1, -1) translate(-11.500000, -5.000000) ',
                          points: '2.84078316e-14 3 18 3 23 7 5 7',
                        },
                      }),
                      new SvgPolygon({
                        attrObj: {
                          fill: `var(${ns.cssVarBlockName('fill-color-5')})`,
                          points:
                            '-3.69149156e-15 7 38 7 38 43 -3.69149156e-15 43',
                        },
                      }),
                      new SvgRect({
                        attrObj: {
                          fill: 'url(#linearGradient-1-' + id.get() + ')',
                          transform:
                            'translate(46.500000, 25.000000) scale(-1, 1) translate(-46.500000, -25.000000) ',
                          x: 38,
                          y: 7,
                          width: 17,
                          height: 36,
                        },
                      }),
                      new SvgPolygon({
                        attrObj: {
                          fill: `var(${ns.cssVarBlockName('fill-color-2')})`,
                          transform:
                            'translate(39.500000, 3.500000) scale(-1, 1) translate(-39.500000, -3.500000) ',
                          points:
                            '24 7 41 7 55 -3.63806207e-12 38 -3.63806207e-12',
                        },
                      }),
                    ],
                  }),
                  new SvgRect({
                    attrObj: {
                      fill: 'url(#linearGradient-2-' + id.get() + ')',
                      x: 13,
                      y: 45,
                      width: 40,
                      height: 36,
                    },
                  }),
                  new SvgG({
                    attrObj: {
                      transform: 'translate(53.000000, 45.000000)',
                    },
                    slot: [
                      new SvgUse({
                        attrObj: {
                          fill: `var(${ns.cssVarBlockName('fill-color-8')})`,
                          transform:
                            'translate(8.500000, 18.000000) scale(-1, 1) translate(-8.500000, -18.000000) ',
                          xlinkHref: '#path-3-' + id.get(),
                        },
                      }),
                      new SvgPolygon({
                        attrObj: {
                          fill: `var(${ns.cssVarBlockName('fill-color-9')})`,
                          mask: 'url(#mask-4-' + id.get() + ')',
                          transform:
                            'translate(12.000000, 9.000000) scale(-1, 1) translate(-12.000000, -9.000000) ',
                          points: '7 0 24 0 20 18 7 16.5',
                        },
                      }),
                    ],
                  }),
                  new SvgPolygon({
                    attrObj: {
                      fill: `var(${ns.cssVarBlockName('fill-color-2')})`,
                      transform:
                        'translate(66.000000, 51.500000) scale(-1, 1) translate(-66.000000, -51.500000) ',
                      points: '62 45 79 45 70 58 53 58',
                    },
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  }
}
