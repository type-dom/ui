import {fromEvent} from "rxjs";
import { TypeRoot, Br, ITypeRootOption, Div } from 'type-dom.ts';
import { Dialog, MessageBox } from '../src';
import {TdInputItem} from "../src/form/input-item/td-input-item.class";
import {ButtonWrapper} from "./button-wrapper";
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
  constructor(option: ITypeRootOption) {
    super(option);
    console.log('UIView constructor . ');
    this.className = 'UIView';
    this.addStyleObj({
      padding: '30px'
    });
    const buttonWrapper = new ButtonWrapper(this);
    this.addChild(buttonWrapper);
    this.createFieldItems();
    this.dialog = new Dialog();
    this.messageBox = new MessageBox();
    this.addChildren(this.dialog, this.messageBox);
    console.log('this.childNodes[1].dom is ', this.childNodes[1].dom);
    this.render();
  }
  createFieldItems(): void {
    this.createItems(this, [
      {
        TypeClass: Div,
        childNodes: [
          {
            nodeValue: 'input item: '
          },
          {
            TypeClass: TdInputItem,
            config: {
              labelTitle: 'title',
              readonly: false
            }
          },
          {
            TypeClass: Br
          }
        ]
      }
    ]);
  }
}
