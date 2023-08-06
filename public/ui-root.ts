import { TypeRoot, TextNode, Division, Br } from 'type-dom.ts';
import { TdCloseSvg, TdConnectionSvg, TdDateSvg, TdDeleteSvg, TdSelectSvg, TdTimeSvg } from 'type-dom-svgs';
import { TdButton, Dialog, MessageBox } from '../src';
import {fromEvent} from "rxjs";
/**
 * 应用根节点，必须存在。
 * 应用继承 TypeRoot;
 * 因为属性和方法要全局调用，所以全部设置为静态 static; 包括get也设置为静态
 * UI组件显示页面
 */
export class UiRoot extends TypeRoot {
  className: 'UIView';
  dialog: Dialog;
  messageBox: MessageBox;
  constructor(editorEl: HTMLElement) {
    super(editorEl);
    console.log('UIView constructor . ');
    this.className = 'UIView';
    this.addStyleObj({
      padding: '30px'
    });
    this.createNormalButton();
    this.createPlainButton();
    this.createRoundButton();
    this.createCircleButton();
    this.createDisableNormalButton();
    this.createDisablePlainButton();
    this.createIconLeftButton();
    this.createIconRightButton();
    this.createSizeButton();
    this.dialog = new Dialog(this);
    this.messageBox = new MessageBox(this);
    this.addChildren(this.dialog, this.messageBox);
    this.events.push(
      fromEvent(this.childNodes[0].dom, 'click').subscribe(() => {
        this.dialog.show();
      }),
      fromEvent(this.childNodes[1].dom, 'click').subscribe(() => {
        this.messageBox.toast('MessageBox', 'show MessageBox');
      })
    );
    this.render();
  }
  createNormalButton() {
    this.createItems(this, [
      {
        TypeClass: Division,
        childNodes: [
          {
            TypeClass: TextNode,
            config: {
              title: ' normal: '
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'default-btn',
                click: 'handleClick'
              }
            },
            config: {
              title: 'Default',
            },
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'primary-btn',
                click: 'handleClick'
              }
            },
            config: {
              title: 'Primary',
              type: 'primary',
            },
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'success-btn',
              }
            },
            config: {
              title: 'Success',
              type: 'success',
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'info-btn',
              }
            },
            config: {
              title: 'Info',
              type: 'info',
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'warning-btn',
              }
            },
            config: {
              title: 'Warning',
              type: 'warning',
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'danger-btn',
              }
            },
            config: {
              title: 'Danger',
              type: 'danger'
            },
          },
        ]
      },
      // {
      //   TypeClass: Br
      // }
    ]);
  }
  createPlainButton() {
    this.createItems(this, [
      {
        TypeClass: Division,
        childNodes: [
          {
            TypeClass: TextNode,
            config: {
              title: ' plain: '
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'default-plain-btn',
              }
            },
            config: {
              plain: true,
              title: 'Default',
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'primary-plain-btn',
              }
            },
            config: {
              plain: true,
              title: 'Primary',
              type: 'primary',
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'success-plain-btn',
              }
            },
            config: {
              plain: true,
              title: 'success',
              type: 'success',
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'info-plain-btn',
              }
            },
            config: {
              plain: true,
              title: 'info',
              type: 'info',
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'warning-plain-btn',
              }
            },
            config: {
              plain: true,
              title: 'warning',
              type: 'warning'
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'danger-plain-btn',
              }
            },
            config: {
              plain: true,
              title: 'danger',
              type: 'danger'
            },
          },
        ]
      },
      {
        TypeClass: Br
      }
    ]);
  }
  createRoundButton() {
    this.createItems(this, [
      {
        TypeClass: Division,
        childNodes: [
          {
            TypeClass: TextNode,
            config: {
              title: ' round: '
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'default-btn',
              }
            },
            config: {
              title: 'Default',
              round: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'primary-btn',
              }
            },
            config: {
              title: 'Primary',
              type: 'primary',
              round: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'success-btn',
              }
            },
            config: {
              title: 'Success',
              type: 'success',
              round: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'info-btn',
              }
            },
            config: {
              title: 'Info',
              type: 'info',
              round: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'warning-btn',
              }
            },
            config: {
              title: 'Warning',
              type: 'warning',
              round: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'danger-btn',
              }
            },
            config: {
              title: 'Danger',
              type: 'danger',
              round: true
            },
          },
        ]
      },
      {
        TypeClass: Br
      }
    ]);
  }
  createCircleButton() {
    this.createItems(this, [
      {
        TypeClass: Division,
        childNodes: [
          {
            TypeClass: TextNode,
            config: {
              title: ' circle: '
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'default-btn',
              }
            },
            config: {
              SvgClass: TdCloseSvg,
              circle: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'primary-btn',
              }
            },
            config: {
              SvgClass: TdDeleteSvg,
              type: 'primary',
              circle: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'success-btn',
              }
            },
            config: {
              SvgClass: TdSelectSvg,
              type: 'success',
              circle: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'info-btn',
              }
            },
            config: {
              SvgClass: TdDateSvg,
              type: 'info',
              circle: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'warning-btn',
              }
            },
            config: {
              SvgClass: TdTimeSvg,
              type: 'warning',
              circle: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'danger-btn',
              }
            },
            config: {
              SvgClass: TdConnectionSvg,
              type: 'danger',
              circle: true
            },
          },
        ]
      },
      {
        TypeClass: Br
      }
    ]);
  }
  createDisableNormalButton() {
    this.createItems(this, [
      {
        TypeClass: Division,
        childNodes: [
          {
            TypeClass: TextNode,
            config: {
              title: ' disabled normal: '
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'default-btn',
              }
            },
            config: {
              title: 'Default',
              disabled: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'primary-btn',
              }
            },
            config: {
              title: 'Primary',
              type: 'primary',
              disabled: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'success-btn',
              }
            },
            config: {
              title: 'Success',
              type: 'success',
              disabled: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'info-btn',
              }
            },
            config: {
              title: 'Info',
              type: 'info',
              disabled: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'warning-btn',
              }
            },
            config: {
              title: 'Warning',
              type: 'warning',
              disabled: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'danger-btn',
              }
            },
            config: {
              title: 'Danger',
              type: 'danger',
              disabled: true
            },
          },
        ]
      },
      {
        TypeClass: Br
      }
    ]);
  }
  createDisablePlainButton() {
    this.createItems(this, [
      {
        TypeClass: Division,
        childNodes: [

          {
            TypeClass: TextNode,
            config: {
              title: ' disabled plian: '
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'default-plain-btn',
              }
            },
            config: {
              plain: true,
              title: 'Default',
              disabled: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'primary-plain-btn',
              }
            },
            config: {
              plain: true,
              title: 'Primary',
              type: 'primary',
              disabled: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'success-plain-btn',
              }
            },
            config: {
              plain: true,
              title: 'success',
              type: 'success',
              disabled: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'info-plain-btn',
              }
            },
            config: {
              plain: true,
              title: 'info',
              type: 'info',
              disabled: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'warning-plain-btn',
              }
            },
            config: {
              plain: true,
              title: 'warning',
              type: 'warning',
              disabled: true
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'danger-plain-btn',
              }
            },
            config: {
              plain: true,
              title: 'danger',
              type: 'danger',
              disabled: true
            },
          },
        ]
      },
      {
        TypeClass: Br
      }
    ]);
  }
  createIconLeftButton() {
    this.createItems(this, [
      {
        TypeClass: Division,
        childNodes: [
          {
            TypeClass: TextNode,
            config: {
              title: ' icon button left: '
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'default-btn',
              }
            },
            config: {
              SvgClass: TdCloseSvg,
              title: 'Default'
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'primary-btn',
              }
            },
            config: {
              SvgClass: TdDeleteSvg,
              type: 'primary',
              title: 'Primary'
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'success-btn',
              }
            },
            config: {
              SvgClass: TdSelectSvg,
              title: 'Success',
              type: 'success',
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'info-btn',
              }
            },
            config: {
              SvgClass: TdDateSvg,
              type: 'info',
              title: 'Info'
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'warning-btn',
              }
            },
            config: {
              SvgClass: TdTimeSvg,
              type: 'warning',
              title: 'warning',
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'danger-btn',
              }
            },
            config: {
              SvgClass: TdConnectionSvg,
              type: 'danger',
              title: 'Danger'
            },
          },
        ]
      },
      {
        TypeClass: Br
      }
    ]);
  }
  createIconRightButton() {
    this.createItems(this, [
      {
        TypeClass: Division,
        childNodes: [

          {
            TypeClass: TextNode,
            config: {
              title: ' icon button right: '
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'default-btn',
              }
            },
            config: {
              SvgClass: TdCloseSvg,
              iconPosition: 'right',
              title: 'Default'
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'primary-btn',
              }
            },
            config: {
              SvgClass: TdDeleteSvg,
              iconPosition: 'right',
              type: 'primary',
              title: 'Primary'
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'success-btn',
              }
            },
            config: {
              SvgClass: TdSelectSvg,
              iconPosition: 'right',
              title: 'Success',
              type: 'success',
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'info-btn',
              }
            },
            config: {
              SvgClass: TdDateSvg,
              iconPosition: 'right',
              type: 'info',
              title: 'Info'
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'warning-btn',
              }
            },
            config: {
              SvgClass: TdTimeSvg,
              iconPosition: 'right',
              type: 'warning',
              title: 'warning',
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'danger-btn',
              }
            },
            config: {
              SvgClass: TdConnectionSvg,
              iconPosition: 'right',
              type: 'danger',
              title: 'Danger'
            },
          },
        ]
      },
      {
        TypeClass: Br
      }
    ]);
  }
  createSizeButton() {
    this.createItems(this, [
      {
        TypeClass: Division,
        childNodes: [
          {
            TypeClass: TextNode,
            config: {
              title: ' button size: '
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'large-btn',
              }
            },
            config: {
              SvgClass: TdCloseSvg,
              title: 'Large',
              size: 'large'
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'primary-middle-btn',
              }
            },
            config: {
              SvgClass: TdDeleteSvg,
              type: 'primary',
              title: 'Middle',
              size: 'middle'
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'success-small-btn',
              }
            },
            config: {
              SvgClass: TdSelectSvg,
              title: 'Small',
              type: 'success',
              size: 'small'
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'info-large-btn',
              }
            },
            config: {
              type: 'info',
              title: 'Large',
              size: 'large'
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'warning-middle-btn',
              }
            },
            config: {
              type: 'warning',
              title: 'Middle',
              size: 'middle'
            }
          },
          {
            TypeClass: TdButton,
            propObj: {
              styleObj: {
                margin: '3px 10px',
              },
              attrObj: {
                name: 'danger-small-btn',
              }
            },
            config: {
              type: 'danger',
              title: 'Small',
              size: 'small'
            },
          },
        ]
      },
      {
        TypeClass: Br
      }
    ]);
  }
}
