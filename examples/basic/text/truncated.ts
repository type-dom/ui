import { Br, TypeDiv } from '@type-dom/framework';
import { TdRow, TdText } from '@type-dom/ui';

export class TruncatedExample extends TypeDiv {
  className: 'TruncatedExample';

  constructor() {
    super();
    this.className = 'TruncatedExample';
    this.addChildren(
      new TdText({
        truncated: true,
        slot: 'Self element set width 100px',
        styleObj: {
          width: '150px',
        }
      }),
      new TdRow({
        styleObj: {
          width: '150px',
          margin: '5px 0'
        },
        slot: [
          new TdText({
            truncated: true,
            slot: 'Squeezed by parent element',
            styleObj: {
              margin: '5px 0'
            }
          }),
        ]
      }),
      new TdText({
        lineClamp: 2,
        slot: [
          'The -webkit-line-clamp CSS property',
          new Br(),
          'allows limiting of the contents of',
          new Br(),
          'a block to the specified number of lines.'
        ]
      })
    );
  }
}
