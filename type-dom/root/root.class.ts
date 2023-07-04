/**
 * Root是一个元素根节点类
 * 作为前端项目的入口文件要继承根节点类，并挂载到对应的 ID 上。
 */
import { TypeDiv } from '../type-element/type-html/div/div.abstract';
import { IRoot } from './root.interface';
export class Root extends TypeDiv implements IRoot {
  // get appRoot(): AppRoot;
  className: 'Root';
  parent: Root;
  // abstract app: any;
  constructor(el: HTMLElement | string) {
    super();
    this.className = 'Root';
    this.parent = this;
    if (el instanceof HTMLElement) {
      el.appendChild(this.dom);
    } else {
      const app = document.querySelector<Element>(el);
      if (app) {
        app.appendChild(this.dom);
      } else {
        throw Error('Can not find id . ');
      }
    }
  }
}
