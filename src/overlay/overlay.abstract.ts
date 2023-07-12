import { fromEvent } from 'rxjs';
import { TypeDiv } from 'type-dom.ts';
import { Display, StylePosition } from '../style/style.enum';
import { OverlayContainer } from './container/container';

export abstract class Overlay extends TypeDiv {
  abstract className: string;
  // abstract parent: FormEditor;
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
      display: Display.none,
    });
    // document.body.appendChild(this.dom); // 挂载在 body 上
    this.container = new OverlayContainer(this);
    this.childNodes = [this.container];
    this.initEvents();
  }

  setTitle(title: string): void {
    this.container.header.title.text.setText(title);
    this.container.header.render();
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
