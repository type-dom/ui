import { fromEvent } from 'rxjs';
import { TypeDiv, StyleDisplay, StylePosition, TextNode, Span } from 'type-dom.ts';
import { OverlayContainer } from './container/container';
export abstract class Overlay extends TypeDiv {
  abstract className: string;
  // abstract parent: TypeFormDesigner;
  childNodes: [OverlayContainer];
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
      display: StyleDisplay.none,
    });
    // document.body.appendChild(this.dom); // 挂载在 body 上
    this.container = new OverlayContainer();
    this.container.parent = this;
    this.childNodes = [this.container];
  }

  setTitle(title: string): void {
    this.container.header.title.text.setText(title);
    this.container.header.render();
  }
  // 设置消息
  setMsg(msg: string): void {
    const span = new Span(this.container.body);
    const textNode = new TextNode(msg);
    span.addChild(textNode);
    this.container.body.clearChild();
    this.container.body.appendChild(span);
  }
  // 设置复杂的内容
  setContent(content: string) {
    //   ToDo
  }
  show(): void {
    this.setStyle('display', 'block');
  }
  hide(): void {
    this.setStyle('display', 'none');
  }

  clear(): void {
    this.container.header.title.text.setText('标题');
    this.container.body.clearChildNodes();
    this.container.body.clearChildDom();
    this.container.body.clearChildNodes();
    this.container.footer.clearChildDom();
  }
  clearBody(): void {
    // this.container.body.clearChildDom();
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'click').subscribe(() => {
        this.hide();
      }),
    );
  }
}
