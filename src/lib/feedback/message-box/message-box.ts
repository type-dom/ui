import { Overlay } from '../overlay/overlay.abstract';
import { IMessageBoxConfig } from './message-box.interface';

export class MessageBox extends Overlay {
  className: 'MessageBox';

  constructor(config?: IMessageBoxConfig) {
    super();
    this.className = 'MessageBox';
    this.addAttrObj({
      name: 'message-box'
    });
    this.setConfig(config);
    if (config?.el) {
      this.mount(config.el);
    } else {
      // 默认挂载到body上;
      // todo 挂载到body上，需要能清理掉，否则会重复挂载
      this.mount(document.body);
    }
  }

  toast(title: string, message: string): void {
    // this.clear();
    this.setTitle(title);
    this.setMsg(message);
    this.show();
  }

  confirm(title: string, message: string): void {
    this.setTitle(title);
    this.setMsg(message);
  }
}
