import { TypeRoot } from '../type-dom/type-root/type-root.class';
import { TdButton } from './basic/td-button/td-button.class';
import { Br } from '../type-dom/element/html-element/br/br.class';
import { ConnectionSvg } from './svgs/connetion/connection';
import { CloseSvg } from './svgs/close/close';
import { TimeSvg } from './svgs/time/time';
import { AddSvg } from './svgs/add/add';
import { AttachmentSvg } from './svgs/attachment/attachment';
import { DeleteSvg } from './svgs/delete/delete';
import { SelectSvg } from './svgs/select/select';
import { DateSvg } from './svgs/date/date';
import { TextNode } from '../type-dom/text-node/text-node.class';
import { Division } from '../type-dom/element/html-element/division/division.class';
/**
 * 应用根节点，必须存在。
 * 应用继承 TypeRoot;
 * 因为属性和方法要全局调用，所以全部设置为静态 static; 包括get也设置为静态
 * UI组件显示页面
 */
export class UIView extends TypeRoot {
  className: 'UIView';
  constructor(editorEl: HTMLElement) {
    super(editorEl);
    console.log('UIView constructor . ');
    this.className = 'UIView';
    this.addStyleObj({
      padding: '30px'
    });
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
              }
            },
            config: {
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
                name: 'primary-btn',
              }
            },
            config: {
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
      {
        TypeClass: Br
      }
    ]);
    // this.addChildren(...normalItems);
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
              SvgClass: CloseSvg,
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
              SvgClass: DeleteSvg,
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
              SvgClass: SelectSvg,
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
              SvgClass: DateSvg,
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
              SvgClass: TimeSvg,
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
              SvgClass: ConnectionSvg,
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
              SvgClass: CloseSvg,
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
              SvgClass: DeleteSvg,
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
              SvgClass: SelectSvg,
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
              SvgClass: DateSvg,
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
              SvgClass: TimeSvg,
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
              SvgClass: ConnectionSvg,
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
              SvgClass: CloseSvg,
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
              SvgClass: DeleteSvg,
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
              SvgClass: SelectSvg,
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
              SvgClass: DateSvg,
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
              SvgClass: TimeSvg,
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
              SvgClass: ConnectionSvg,
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
              SvgClass: CloseSvg,
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
              SvgClass: DeleteSvg,
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
              SvgClass: SelectSvg,
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
    this.render();
  }
}
