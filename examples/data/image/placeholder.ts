import { createClass, Div, Span, TypeDiv } from '@type-dom/framework';
import { TdImage } from '@type-dom/ui';

export class ImagePlaceholderExample extends TypeDiv {
  className = 'ImagePlaceholderExample';
  constructor() {
    super();
    createClass('demo-image__placeholder block', {
        padding: '30px 0',
        textAlign: 'center',
        borderRight: 'solid 1px var(--td-border-color)',
        // borderRight: 'solid 1px ' + $borderColor.base,
        display: 'inline-block',
        width: '49%',
        boxSizing: 'border-box',
        verticalAlign: 'top',
    })

    createClass('demo-image__placeholder demonstration', {
        display: 'block',
        color: 'var(--td-text-color-secondary)',
        // color: $textColor.secondary,
        fontSize: '14px',
        marginBottom: '20px',
    })

    createClass('demo-image__placeholder td-image', {
      padding: '0 5px',
      maxWidth: '300px',
      maxHeight: '200px',
    })

    createClass('demo-image__placeholder image-slot', {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      background: 'var(--td-fill-color-light)',
      // background: $fillColor.light,
      color: 'var(--td-text-color-secondary)',
      // color: $textColor.secondary,
      fontSize: '14px',
    })

    const src =
      'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'

    this.addChild(
      new Div({
        class: 'demo-image__placeholder',
        slot: [
          new Div({
            name: 'block',
            class: 'block',
            // styleObj: $block,
            slot: [
              new Span({
                name: 'title',
                slot: 'Default',
                class: 'demonstration',
                // styleObj: $demonstration,
              }),
              new TdImage({
                src: src,
              })
            ]
          }),
          new Div({
            class: 'block',
            // styleObj: $block,
            slot: [
              new Span({
                class: 'demonstration',
                slot: 'Custom',
                // styleObj: $demonstration,
              }),
              new TdImage({
                src: src,
                // styleObj: $tdImage,
                slots: {
                  placeholder: new Div({
                    class: 'image-slot',
                    // styleObj: $imageSlot,
                    slot: [
                      'Loading',
                      new Span({
                        name: 'dot',
                        slot: '...',
                        class: 'dot',
                        styleObj: {
                          animation: 'dot 2s infinite steps(3, start)',
                          overflow: 'hidden',
                        }
                      })
                    ]
                  })
                }
              })
            ]
          }),
        ],
      })
    );
  }
}
