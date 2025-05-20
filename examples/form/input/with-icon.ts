import { TypeDiv, Div, Span } from '@type-dom/framework';
import { TdInput, TdIcon } from '@type-dom/ui';
import { ElCalendarSvg, ElSearchSvg } from '@type-dom/svgs';
import { signal } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';

export class InputWithIconExample extends TypeDiv {
  className = 'InputWithIconExample';

  constructor() {
    super();
    const style: IStyle = {
      display: 'flex',
      gap: '10px',
      padding: '10px',
    }
    const input1 = signal('')
    const input2 = signal('')
    const input3 = signal('')
    const input4 = signal('')
    this.addChildren(
      new Div({
        styleObj: style,
        class: 'flex gap-4 mb-4',
        slot: [
          new Span({
            slot: 'Using attributes',
          }),
          new TdInput({
            vModel: input1,
            placeholder: 'Pick a date',
            suffixIcon: new ElCalendarSvg(),
            styleObj: {
              width: 240,
              paddingRight: '10px'
            }
          }),
          new TdInput({
            vModel: input2,
            placeholder: 'Type something',
            prefixIcon: new ElSearchSvg(),
            styleObj: {
              width: 240,
            }
          })
        ]
      }),
      new Div({
        styleObj: style,
        slot: [
          new Span({
            slot: 'Using slots',
          }),
          new TdInput({
            vModel: input3,
            placeholder: 'Pick a date',
            styleObj: {
              width: 240,
              paddingRight: '10px'
            },
            slots: {
              suffix: new TdIcon({
                class: 'td-input__icon',
                slot: new ElCalendarSvg()
              })
            }
          }),
          new TdInput({
            vModel: input4,
            placeholder: 'Type something',
            styleObj: {
              width:240,
            },
            slots: {
              prefix: new TdIcon({
                class: 'td-input__icon',
                slot: new ElSearchSvg(),
              }),
            }
          })
        ]
      })
    );
  }
}
