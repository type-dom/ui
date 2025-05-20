import { Div, TypeDiv } from '@type-dom/framework';
import { TdButton } from '@type-dom/ui';
import {
  ElCheckSvg,
  ElDeleteSvg,
  ElEditSvg,
  ElMessageSvg,
  ElSearchSvg,
  ElStarSvg
} from '@type-dom/svgs';

export class ButtonBasicExample extends TypeDiv {
  className = 'ButtonBasicExample';

  constructor() {
    super();
  }

 override  setup() {
    this.addChildren(
      this.createNormalButton(),
      this.createPlainButton(),
      this.createRoundButton(),
      this.createCircleButton()
    );
  }

  createNormalButton() {
    return new Div({
      styleObj: {
        marginBottom: '1rem'
      },
      slot: [
        new TdButton({
          name: 'default-btn',
          slot: 'Default',
          styleObj: {
            margin: '3px 10px'
          },
          events: {
            click: () => {
              console.log('td-button click . ');

            }
          }
        }),
        new TdButton({
          name: 'primary-btn',
          slot: 'Primary',
          type: 'primary',
          styleObj: {
            margin: '3px 10px'
          },
          events: {
            click: () => {
              console.log('td-button click . ');
            }
          }
        }),
        new TdButton({
          name: 'success-btn',
          slot: 'Success',
          type: 'success',
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          slot: 'Info',
          type: 'info',
          name: 'info-btn',
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'warning-btn',
          slot: 'Warning',
          type: 'warning',
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'danger-btn',
          slot: 'Danger',
          type: 'danger',
          styleObj: {
            margin: '3px 10px'
          }
        })
      ]
    });
  }

  createPlainButton() {
    return new Div({
      styleObj: {
        marginBottom: '1rem'
      },
      slot: [
        new TdButton({
          name: 'default-plain-btn',
          slot: 'Plain',
          plain: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'primary-plain-btn',
          slot: 'Primary',
          type: 'primary',
          plain: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'success-plain-btn',
          slot: 'Success',
          type: 'success',
          plain: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'info-plain-btn',
          slot: 'Info',
          type: 'info',
          plain: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'warning-plain-btn',
          slot: 'Warning',
          type: 'warning',
          plain: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'danger-plain-btn',
          slot: 'Danger',
          type: 'danger',
          plain: true,
          styleObj: {
            margin: '3px 10px'
          }
        })
      ]
    });
  }

  createRoundButton() {
    return new Div({
      styleObj: {
        marginBottom: '1rem'
      },
      slot: [
        new TdButton({
          name: 'round-default-btn',
          slot: 'Round',
          round: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'round-primary-btn',
          slot: 'Primary',
          type: 'primary',
          round: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'round-success-btn',
          slot: 'Success',
          type: 'success',
          round: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'round-info-btn',
          slot: 'Info',
          type: 'info',
          round: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'round-warning-btn',
          slot: 'Warning',
          type: 'warning',
          round: true,
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'round-danger-btn',
          slot: 'Danger',
          type: 'danger',
          round: true,
          styleObj: {
            margin: '3px 10px'
          }
        })
      ]
    });
  }

  createCircleButton() {
    const $circleStyle = {
      margin: '3px 10px',
      width: '32px',
      height: '32px'
    };
    return new Div({
      slot: [
        new TdButton({
          name: 'circle-default-btn',
          icon: new ElSearchSvg(),
          circle: true,
          styleObj: $circleStyle,
        }),
        new TdButton({
          type: 'primary',
          circle: true,
          name: 'circle-primary-btn',
          icon: new ElEditSvg(),
          styleObj: $circleStyle
        }),
        new TdButton({
          type: 'success',
          circle: true,
          name: 'circle-success-btn',
          icon: new ElCheckSvg(),
          styleObj: $circleStyle
        }),
        new TdButton({
          type: 'info',
          circle: true,
          name: 'circle-info-btn',
          icon: new ElMessageSvg(),
          styleObj: $circleStyle
        }),
        new TdButton({
          type: 'warning',
          circle: true,
          name: 'circle-warning-btn',
          icon: new ElStarSvg(),
          styleObj: $circleStyle
        }),
        new TdButton({
          type: 'danger',
          circle: true,
          name: 'circle-danger-btn',
          icon: new ElDeleteSvg(),
          styleObj: $circleStyle
        })
      ]
    });
  }
}
