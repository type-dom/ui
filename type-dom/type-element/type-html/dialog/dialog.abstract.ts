import { TypeHtml } from '../type-html.abstract';
import { ITypeDialog } from './dialog.interface';
export abstract class TypeDialog extends TypeHtml implements ITypeDialog {
  nodeName: 'dialog';
  dom: HTMLDialogElement;
  protected constructor() {
    super('dialog');
    this.nodeName = 'dialog';
    this.dom = document.createElement(this.nodeName);
  }
}
