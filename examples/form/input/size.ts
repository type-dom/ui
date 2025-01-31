import { Div, TypeDiv } from '@type-dom/framework';
import { TdInput } from '@type-dom/ui';
import { ElSearchSvg } from '@type-dom/svgs';
import { signal } from '@type-dom/signals';

export class FormInputSizeExample extends TypeDiv {
  className = 'FormInputSizeExample';

  constructor() {
    super();
    const style = {
      marginBottom: '1em',
      gap: '1rem',
      alignItems: 'center',
      display: 'flex'
    }
    const input1 = signal('')
    const input2 = signal('')
    const input3 = signal('')
    this.addChildren(
      new Div({
        styleObj: style,
        slot: [
          new TdInput({
            vModel: input1,
            size: 'large',
            styleObj: {
              paddingRight: '10px',
              width: 240,
            }
          }),
          new TdInput({
            vModel: input1,
            // size: 'default',
            styleObj: {
              width: 240,
              paddingRight: '10px'
            }
          }),
          new TdInput({
            vModel: input1,
            size: 'small',
            styleObj: {
              width: 240,
            }
          })
        ]
      }),
      new Div({
        styleObj: style,
        slot: [
          new TdInput({
            vModel: input2,
            placeholder: 'Type something',
            prefixIcon: new ElSearchSvg(),
            styleObj: {
              width: 240,
              paddingRight: '10px'
            },
            size: 'large'
          }),
          new TdInput({
            vModel: input2,
            placeholder: 'Type something',
            styleObj: {
              width: 240,
              paddingRight: '10px'
            },
            prefixIcon: new ElSearchSvg()
          }),
          new TdInput({
            vModel: input2,
            placeholder: 'Type something',
            prefixIcon: new ElSearchSvg(),
            size: 'small',
            styleObj: {
              width: 240,
            }
          })
        ]
      }),
      new Div({
        styleObj: style,
        slot: [
          new TdInput({
            vModel: input3,
            placeholder: 'Type something',
            styleObj: {
              width: 240,
              paddingRight: '10px'
            },
            suffixIcon: new ElSearchSvg(),
            size: 'large'
          }),
          new TdInput({
            vModel: input3,
            placeholder: 'Type something',
            styleObj: {
              width: 240,
              paddingRight: '10px'
            },
            suffixIcon: new ElSearchSvg()
          }),
          new TdInput({
            vModel: input3,
            placeholder: 'Type something',
            suffixIcon: new ElSearchSvg(),
            size: 'small',
            styleObj: {
              width: 240,
            }
          })
        ]
      })
    );
  }
}
