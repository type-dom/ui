import { TypeDiv } from '@type-dom/framework';
import { TdButton } from '@type-dom/ui';

export class ButtonTagExamples extends TypeDiv {
  className: 'ButtonTagExamples'
  constructor() {
    super();
    this.addChildren(
      new TdButton({
        slot: 'button',
      }),
      new TdButton({
        slot: 'div',
        tag: 'div',
        attrObj: {
          role: 'button',
          tabindex: 0
        }
      }),
      new TdButton({
        slot: 'a',
        tag: 'a',
        type: 'primary',
        attrObj: {
          target: '_blank',
          href: 'https://github.com/element-plus/element-plus',
          rel: 'noopener noreferrer'
        }
      })
    )
  }
}
