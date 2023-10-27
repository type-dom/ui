import { fromEvent } from 'rxjs';
import { Span, TextNode, TypeComponent, TypeElement } from 'type-dom.ts';
import { ElCaretBottomSvg } from 'type-dom-svgs';
export class ExpandHeading extends TypeComponent {
  className: 'ExpandHeading';
  public parent?: TypeComponent;
  childNodes: [ElCaretBottomSvg, Span];
  svg: ElCaretBottomSvg;
  title: TextNode;
  constructor(title: string) {
    super('div');
    this.className = 'ExpandHeading';
    this.propObj = {
      styleObj: {
        margin: '0',
        paddingLeft: '10px',
        boxSizing: 'border-box',
        backgroundColor: '#a0a0a0',
        color: '#fff',
        textIndent: '20px',
        borderRadius: '4px 4px 0 0',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        height: '36px'
      },
      attrObj: {
        name: 'expand-heading',
      }
    };

    this.svg = new ElCaretBottomSvg(this);
    this.svg.addAttrObj({
      fill: '#FFF',
    });
    this.title = new TextNode(title);
    // span.setStyle('verticalAlign', 'middle');
    const span = new Span(this);
    span.childNodes = [this.title];
    this.childNodes = [this.svg, span];
  }
  setTitle(title: string) {
    this.title.setText(title);
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.svg.dom, 'click').subscribe((e: Event) => {
        e.stopPropagation();
        const style = getComputedStyle(this.svg.dom);
        console.log('style.transform is ', style.transform);
        if (this.svg.styleObj.transform === 'rotate(-90deg)') {
          this.svg.setStyleObj({
            transform: 'rotate(0deg)',
            transition: 'transform 0.3s'
          });
          console.log('style.transform is ', style.transform);
          if (this?.parent?.lastChild instanceof TypeElement) {
            this.parent.lastChild.setStyle('display', 'flex'); // flex
          }
        } else {
          this.svg.setStyleObj({
            transform: 'rotate(-90deg)',
            transition: 'transform 0.3s'
          });
          if (this.parent?.lastChild instanceof TypeElement) {
            this.parent.lastChild.setStyle('display', 'none');
          }
        }
      }),
    );
  }
}
