import { TypeDiv } from '@type-dom/framework';
import { TdSpace, TdText } from '@type-dom/ui';

export class TextOverrideExample extends TypeDiv {
  className: 'TextOverrideExample';

  constructor() {
    super();
    this.className = 'TextOverrideExample';
    this.addChild(
      new TdSpace({
        direction: 'vertical',
        slot: [
          new TdText({
            slot: 'Span',
          }),
          new TdText({
            tag: 'p',
            slot: 'This is a paragraph.',
          }),
          new TdText({
            tag: 'b',
            slot: 'Bold',
          }),
          new TdText({
            tag: 'i',
            slot: 'Italic',
          }),
          new TdText({
            slot: [
              'This is ',
              new TdText({
                tag: 'sub',
                slot: 'subscript',
                size: 'small'
              })
            ]
          }),
          new TdText({
            slot: [
              'This is ',
              new TdText({
                tag: 'sup',
                slot: 'superscript',
                size: 'small'
              })
            ]
          }),
          new TdText({
            tag: 'ins',
            slot: 'Inserted',
          }),
          new TdText({
            tag: 'del',
            slot: 'Deleted',
          }),
          new TdText({
            tag: 'mark',
            slot: 'Marked',
          })
        ]
      })
    )
  }
}
