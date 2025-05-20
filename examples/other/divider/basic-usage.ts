import { TypeDiv, Span } from '@type-dom/framework';
import { TdDivider } from '@type-dom/ui';

export class DividerBasicExample extends TypeDiv {
  className: 'DividerBasicExample';
  constructor() {
    super();
    this.className = 'DividerBasicExample';
    this.addChildren(
      new Span({
        slot: 'I sit at my window this morning where the world like a passer-by stops for\n' +
          '      a moment, nods to me and goes.'
      }),
      new TdDivider(),
      new Span({
        slot: `
        There little thoughts are the rustle of leaves; they have their whisper of
      joy in my mind.
      `
      })
    )
  }
}