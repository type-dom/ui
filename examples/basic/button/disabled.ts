import { Div, TypeDiv } from '@type-dom/framework';
import { TdButton } from '@type-dom/ui';

export class ButtonDisabledExample extends TypeDiv {
  className = 'ButtonDisabledExample';

  constructor() {
    super();
    this.addChildren(
      this.createDisableNormalButton(),
      this.createDisablePlainButton()
    );
  }

  createDisableNormalButton() {
    return new Div({
      slot: [
        new TdButton({
          name: 'default-disabled-btn',
          slot: 'Default',
          // type: 'default', // 是否设置是不一样的效果
          disabled: true,
          styleObj: {
            margin: '3px 10px'
          },
          attrObj: {}
        }),
        new TdButton({
          name: 'primary-disabled-btn',
          slot: 'Primary',
          type: 'primary',
          disabled: true,
          styleObj: {
            margin: '3px 10px'
          },
          attrObj: {}
        }),
        new TdButton({
          name: 'success-disabled-btn',
          slot: 'Success',
          type: 'success',
          disabled: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'info-disabled-btn',
          slot: 'Info',
          type: 'info',
          disabled: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'warning-disabled-btn',
          slot: 'Warning',
          type: 'warning',
          disabled: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'danger-disabled-btn',
          slot: 'Danger',
          type: 'danger',
          disabled: true,
          styleObj: {
            margin: '3px 10px'
          }
        })
      ]
    });
  }

  createDisablePlainButton() {
    return new Div({
      slot: [
        new TdButton({
          name: 'default-disabled-btn',
          plain: true,
          slot: 'Default',
          disabled: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          plain: true,
          slot: 'Primary',
          type: 'primary',
          disabled: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'success-plain-disabled-btn',
          plain: true,
          slot: 'Success',
          type: 'success',
          disabled: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'info-plain-disabled-btn',
          plain: true,
          slot: 'Info',
          type: 'info',
          disabled: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'warning-plain-disabled-btn',
          plain: true,
          slot: 'Warning',
          type: 'warning',
          disabled: true,
          styleObj: {
            margin: '3px 10px'
          },
          attrObj: {}
        }),
        new TdButton({
          name: 'danger-disabled-btn',
          plain: true,
          slot: 'Danger',
          type: 'danger',
          disabled: true,
          styleObj: {
            margin: '3px 10px'
          }
        })
      ]
    });
  }
}
