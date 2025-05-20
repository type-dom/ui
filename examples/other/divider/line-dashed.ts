import { TypeFragment, Div, Span } from '@type-dom/framework';
import { TdDivider } from '@type-dom/ui';

export class DividerLineDashedExample extends TypeFragment {
  className: 'DividerLineDashedExample';
  constructor() {
    super();
    this.className = 'DividerLineDashedExample';
    this.addChildren(
      new Div({
        slot: [
          new Span({
            slot: 'What language is thine, O sea?'
          }),
          new TdDivider({
            borderStyle: 'dashed'
          }),
          new Span({
            slot: `The language of eternal question.`
          }),
        ]
      }),
      new TdDivider({
        borderStyle: 'dotted'
      }),
      new Span({
        slot: `What language is thy answer, O sky?`
      }),
      new TdDivider({
        borderStyle: 'double'
      }),
      new Span({
        slot: `The language of eternal silence.`
      }),
    )
  }
}