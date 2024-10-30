import { Div, I, Img, Span, Teleport, Transition } from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';
import { keysOf } from '@type-dom/utils';
import {
  ElArrowLeftSvg,
  ElArrowRightSvg,
  ElCloseSvg,
  ElFullScreenSvg,
  ElRefreshLeftSvg,
  ElRefreshRightSvg,
  ElScaleToOriginalSvg,
  ElZoomInSvg,
  ElZoomOutSvg
} from '@type-dom/svgs';
import { UI } from '../../../ui/ui.abstract';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import {
  ITdImageViewer,
  ITdImageViewerConfig,
  TdImageViewerAction,
  TdImageViewerMode
} from './td-image-viewer.interface';
import {
  $actions,
  $actionsInner,
  $btn,
  $next,
  $prev
} from './td-image-viewer.style';

export class TdImageViewer extends UI<undefined> implements ITdImageViewer {
  className: 'TdImageViewer';
  override props: ITdImageViewerConfig;
  private isSingle: boolean;
  private activeIndex?: number;
  private transform: {
    offsetX: number;
    offsetY: number;
    deg: number;
    enableTransition: boolean;
    scale: number;
  };
  private modes: Record<'CONTAIN' | 'ORIGINAL', TdImageViewerMode>;
  mode: TdImageViewerMode;
  loading = false;
  private transition: Transition;
  private teleport: Teleport;
  private wrapper: Div;

  constructor(params: ITdImageViewerConfig = {}) {
    super();
    this.useTag('fragment');
    this.className = 'TdImageViewer';
    this.transform = {
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false
    };
    this.modes = {
      CONTAIN: {
        name: 'contain',
        // icon:  markRaw(FullScreen),
        icon: new TdIcon({
          svgObj: new ElFullScreenSvg()
        })
      },
      ORIGINAL: {
        name: 'original',
        // icon: markRaw(ScaleToOriginal),
        icon: new TdIcon({
          svgObj: new ElScaleToOriginalSvg()
        })
      }
    };
    this.mode = this.modes.CONTAIN;

    this.wrapper = new Div();
    this.transition =  new Transition({
      slot: this.wrapper,
    });
    this.teleport = new Teleport({
      to: document.body,
    });
    this.teleport.addChild(this.transition);
    // this.mount(document.body);
    // this.attr.addName('wrapper');
    // todo transition 如何设置样式 ？？？ developing ......
    this.wrapper.style.addObj({
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 2000
    });
    this.wrapper.addChildren(
      new Div({
        name: 'mask',
        events: {
          click: (evt, element) => {
            //
            element?.style.hide();
          }
        }
      }),
      // <!-- CLOSE -->
      new Span({
        name: 'close',
        styleObj: {
          ...$btn,
          //   close
          top: '40px',
          right: '40px',
          width: '40px',
          height: '40px',
          fontSize: '40px'
        },
        events: {
          click: (evt, element) => {
            element?.style.hide();
          }
        },
        childNodes: [
          new TdIcon({
            svgObj: new ElCloseSvg(),
            styleObj: {
              fontSize: 'inherit',
              cursor: 'pointer'
            }
          })
        ]
      })
    );
    const urlList = params?.urlList || [];
    this.isSingle = urlList.length <= 1;

    // <!-- ARROW -->
    if (!this.isSingle) {
      this.wrapper.addChildren(
        new Span({
          styleObj: {
            ...$btn,
            ...$prev
          },
          events: {
            click: () => {
              //   todo prev
            }
          },
          childNodes: [
            new TdIcon({
              svgObj: new ElArrowLeftSvg()
            })
          ]
        }),
        new Span({
          styleObj: {
            ...$btn,
            ...$next
          },
          events: {
            click: () => {
              //   todo next
            }
          },
          childNodes: [
            new TdIcon({
              svgObj: new ElArrowRightSvg()
            })
          ]
        })
      );
    }

    // <!-- ACTIONS -->
    this.wrapper.addChild(
      new Div({
        styleObj: {
          ...$btn,
          ...$actions
        },
        childNodes: [
          new Div({
            styleObj: $actionsInner,
            childNodes: [
              new TdIcon({
                svgObj: new ElZoomOutSvg(),
                events: {
                  click: (evt, ele) => {
                    this.handleActions('zoomOut');
                  }
                }
              }),
              new TdIcon({
                svgObj: new ElZoomInSvg(),
                events: {
                  click: (evt, ele) => {
                    this.handleActions('zoomIn');
                  }
                }
              }),
              new I({}),
              new TdIcon({
                // ？？？
                // svgObj: this.mode.icon,
                slot: this.mode.icon,
                events: {
                  click: (evt, ele) => {
                    this.toggleMode();
                  }
                }
              }),
              new I({}),
              new TdIcon({
                svgObj: new ElRefreshLeftSvg(),
                events: {
                  click: (evt, ele) => {
                    this.handleActions('anticlockwise');
                  }
                }
              }),
              new TdIcon({
                svgObj: new ElRefreshRightSvg(),
                events: {
                  click: (evt, ele) => {
                    this.handleActions('clockwise');
                  }
                }
              })
            ]
          })
        ]
      })
    );

    // <!-- CANVAS -->
    const imgList: Img[] = [];
    urlList.forEach((url, index) => {
      imgList.push(
        new Img({
          attrObj: {
            src: url
          },
          styleObj: {
            display: index === this.activeIndex ? 'block' : 'none',
            ...this.imgStyle
          }
        })
      );
    });
    this.wrapper.addChild(
      new Div({
        childNodes: imgList
      })
    );
    this.props = this.useParams(params);
  }

  get imgStyle() {
    const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
    let translateX = offsetX / scale;
    let translateY = offsetY / scale;

    switch (deg % 360) {
      case 90:
      case -270:
        [translateX, translateY] = [translateY, -translateX];
        break;
      case 180:
      case -180:
        [translateX, translateY] = [-translateX, -translateY];
        break;
      case 270:
      case -90:
        [translateX, translateY] = [-translateY, translateX];
        break;
    }

    const style: IStyle = {
      transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
      transition: enableTransition ? 'transform .3s' : ''
    };
    if (this.mode.name === this.modes.CONTAIN.name) {
      style.maxWidth = style.maxHeight = '100%';
    }
    return style;
  }

  toggleMode() {
    if (this.loading) return;
    const modeNames = keysOf(this.modes);
    const modeValues = Object.values(this.modes);
    const currentMode = this.mode.name;
    const index = modeValues.findIndex((i) => i.name === currentMode);
    const nextIndex = (index + 1) % modeNames.length;
    this.mode = this.modes[modeNames[nextIndex]];
    this.reset();
  }

  reset() {
    this.transform = {
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false
    };
  }

  handleActions(action: TdImageViewerAction, options = {}) {
    if (this.loading) return;
    // const { minScale, maxScale } = this.props;
    const minScale = this.props.minScale || 0.2;
    const maxScale = this.props.maxScale || 7;
    const { zoomRate, rotateDeg, enableTransition } = {
      zoomRate: this.props.zoomRate || 1.2,
      rotateDeg: 90,
      enableTransition: true,
      ...options
    };
    switch (action) {
      case 'zoomOut':
        if (this.transform.scale > minScale) {
          this.transform.scale = Number.parseFloat(
            (this.transform.scale / zoomRate).toFixed(3)
          );
        }
        break;
      case 'zoomIn':
        if (this.transform.scale < maxScale) {
          this.transform.scale = Number.parseFloat(
            (this.transform.scale * zoomRate).toFixed(3)
          );
        }
        break;
      case 'clockwise':
        this.transform.deg += rotateDeg;
        // emit('rotate', this.transform.deg)
        break;
      case 'anticlockwise':
        this.transform.deg -= rotateDeg;
        // emit('rotate', this.transform.deg)
        break;
    }
    this.transform.enableTransition = enableTransition;
  }
}
