import { Overlay } from '../overlay/overlay.abstract';
import { IDialogConfig } from './dialog.interface';

export class Dialog extends Overlay {
  className: 'Dialog';

  constructor(config?: Partial<IDialogConfig>) {
    super();
    this.className = 'Dialog';
    this.addAttrObj({
      name: 'dialog'
    });
    this.setConfig(config);
    if (config?.el) {
      this.mount(config.el);
    } else {
      this.mount(document.body);
    }
  }
}
