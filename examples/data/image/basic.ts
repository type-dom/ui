import { createClass, Div, For, Span, TypeDiv } from '@type-dom/framework';
import { ImageProps, TdImage } from '@type-dom/ui';

export class ImageBasicExample extends TypeDiv {
  className = 'ImageBasicExample';

 override  setup() {
    const fits = [
      'fill',
      'contain',
      'cover',
      'none',
      'scale-down',
    ] as ImageProps['fit'][]
    const url =
      'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    this.attr.addClass('demo-image');
    this.addChild(new For({
      data: fits,
      getter: (fit: ImageProps['fit']) => new Div({
        class: 'block',
        // styleObj: $block,
        slot: [
          new Span({
            class: 'demonstration',
            // styleObj: $demonstration,
            slot: fit,
          }),
          new TdImage({
            styleObj: {
              width: '100px',
              height: '100px',
            },
            src: url,
            fit: fit
          })
        ]
      })
    }))

    createClass('demo-image block', {
      padding: '30px 0',
      textAlign: 'center',
      borderRight: 'solid 1px var(--td-border-color)',
      // borderRight: 'solid 1px ' + $borderColor.base,
      display: 'inline-block',
      width: '20%',
      boxSizing: 'border-box',
      verticalAlign: 'top',
    });
    createClass('demo-image block:last-child', {
      borderRight: 'none'
    });
    createClass('demo-image demonstration', {
      display: 'block',
      color: 'var(--td-text-color-secondary)',
      // color: $textColor.secondary,
      fontSize: '14px',
      marginBottom: '20px',
    });
  }
}
