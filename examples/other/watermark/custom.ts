import { TypeDiv, Div, Img, Head, createStyle } from '@type-dom/framework';
import { signal, unref, Signal } from '@type-dom/signals';
import { TdWatermark, TdForm, TdFormItem, TdInput, TdSpace, TdInputNumber, TdSlider } from '@type-dom/ui';

export class WatermarkCustomExample extends TypeDiv {
  className: 'WatermarkCustomExample';
  constructor() {
    super();
    this.className = 'WatermarkCustomExample';
  }
  override setup() {
    const config = {
      content: signal('Element Plus'),
      font: {
        fontSize: signal(16),
        color: signal('rgba(0, 0, 0, 0.15)'),
      },
      zIndex: signal(0),
      rotate: signal(-22),
      gap: signal<[Signal<number>, Signal<number>]>([signal(100), signal(100)]),
      offset: signal<[Signal<number>, Signal<number>]>([signal<number>(), signal<number>()]),
    }
    createStyle(`
    .wrapper {
      display: flex;
    }
    .watermark {
      display: flex;
      flex: auto;
    }
    .demo {
      flex: auto;
    }
    .form {
      width: 330px;
      margin-left: 20px;
      border-left: 1px solid #eee;
      padding-left: 20px;
    }
    
    img {
      z-index: 10;
      width: 100%;
      max-width: 300px;
      position: relative;
    }
  `, true)
    this.attr.addClass('wrapper');
    this.addChildren(
      new TdWatermark({
        class: 'watermark',
        content: config.content,
        font: config.font,
        zIndex: config.zIndex,
        rotate: config.rotate,
        gap: config.gap,
        offset: config.offset,
        slot: new Div({
          class: 'demo',
          slot: [
            new Head({
              nodeName: 'h1',
              slot: 'Element Plus',
            }),
            new Head({
              nodeName: 'h2',
              slot: 'A Vue 3 based component library for designers and developers',
            }),
            new Img({
              attrObj: {
                src: 'https://element-plus.org/images/hamburger.png',
                alt: '示例图片',
              }
            })
          ]
        })
      }),
      new TdForm({
        class: 'form',
        model: config,
        attrObj: {
          labelPosition: 'top',
          labelWidth: '50px',
        },
        slot: [
          new TdFormItem({
            label: 'Content',
            slot: new TdInput({
              vModel: config.content,
            })
          }),
          new TdFormItem({
            label: 'Color',
            slot: new TdInput({
              vModel: config.font.color,
            })
          }),
          new TdFormItem({
            label: 'FontSize',
            slot: new TdSlider({
              vModel: config.font.fontSize,
            })
          }),
          new TdFormItem({
            label: 'ZIndex',
            slot: new TdSlider({
              vModel: config.zIndex,
            })
          }),
          new TdFormItem({
            label: 'Rotate',
            slot: new TdSlider({
              vModel: config.rotate,
              min: -180,
              max: 180
            })
          }),
          new TdFormItem({
            label: 'Gap',
            slot: new TdSpace({
              slot: [
                new TdInputNumber({
                  vModel: unref(config.gap)[0],
                  controlsPosition: 'right',
                }),
                new TdInputNumber({
                  vModel: unref(config.gap)[1],
                  controlsPosition: 'right',
                })
              ]
            })
          }),
          new TdFormItem({
            label: 'Offset',
            slot: new TdSpace({
              slot: [
                new TdInputNumber({
                  vModel: unref(config.offset)[0],
                  placeholder: 'offsetLeft',
                  controlsPosition: 'right',
                }),
                new TdInputNumber({
                  vModel: unref(config.offset)[1],
                  placeholder: 'offsetTop',
                  controlsPosition: 'right',
                })
              ]
            })
          })
        ]
      })
    )
  }
}