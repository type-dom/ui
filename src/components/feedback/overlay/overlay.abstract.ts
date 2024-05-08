import { fromEvent } from 'rxjs';
import { TypeDiv, StyleDisplay, StylePosition, TextNode, Span } from '@type-dom/framework';
import { OverlayContainer } from './container/container';

export abstract class Overlay extends TypeDiv {
  // abstract parent: TypeFormDesigner;
  override childNodes: [OverlayContainer];
  container: OverlayContainer;

  protected constructor() {
    super();
    this.addStyleObj({
      position: StylePosition.fixed,
      left: '0',
      top: '0',
      right: '0',
      bottom: '0',
      height: '100%', // ???
      zIndex: 2000,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      overflow: 'auto',
      display: StyleDisplay.none
    });
    // document.body.appendChild(this.dom); // 挂载在 body 上
    this.container = new OverlayContainer();
    this.container.parent = this;
    this.childNodes = [this.container];
  }

  setTitle(title: string): void {
    this.container.header.title.textNode.setText(title);
    this.container.header.render();
  }

  // 设置消息
  setMsg(msg: string): void {
    const span = new Span({
      parent: this.container.body,
      childNodes: [
        new TextNode(msg)
      ]
    });
    // this.container.body.clearChild();
    this.container.body.clearChildren();
    this.container.body.appendChild(span);
  }

  // 设置复杂的内容
  setContent(content: string) {
    //   ToDo
  }

  clear(): void {
    this.container.header.title.textNode.setText('标题');
    this.container.body.clearChildren();
    this.container.footer.clearChildrenDom();
  }

  clearBody(): void {
    // this.container.body.clearChildDom();
  }

  override initEvents(): void {
    this.subscriptions.push(
      fromEvent(this.dom, 'click').subscribe(() => {
        this.hide();
      })
    );
  }
}
