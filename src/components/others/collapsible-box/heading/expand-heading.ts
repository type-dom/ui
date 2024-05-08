import { fromEvent } from 'rxjs';
import { Span, TextNode, TypeComponent, TypeElement } from '@type-dom/framework';
import { ElCaretBottomSvg } from '@type-dom/svgs';

export class ExpandHeading extends TypeComponent {
  className: 'ExpandHeading';
  public override parent?: TypeComponent;
  override childNodes: [ElCaretBottomSvg, Span];
  svg: ElCaretBottomSvg;
  title: TextNode;

  constructor(title: string) {
    super('div');
    this.className = 'ExpandHeading';
    this.styleObj = {
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
    };
    this.attrObj = {
      name: 'expand-heading'
    };
    this.svg = new ElCaretBottomSvg({
      attrObj: {
        fill: '#FFF'
      }
    });
    this.title = new TextNode(title);
    // span.setStyle('verticalAlign', 'middle');
    const span = new Span({
      parent: this,
      childNodes: [this.title]
    });
    this.childNodes = [this.svg, span];
  }

  setTitle(title: string) {
    this.title.setText(title);
  }

  override initEvents(): void {
    this.subscriptions.push(
      fromEvent(this.svg.dom, 'click').subscribe((e: Event) => {
        console.log('expand-heading svg.dom clicked');
        e.stopPropagation();
        // const style = getComputedStyle(this.svg.dom);
        // console.log('style.transform is ', style.transform);
        if (this.svg.styleObj.transform === 'rotate(-90deg)') {
          this.svg.setStyleObj({
            transform: 'rotate(0deg)',
            transition: 'transform 0.3s'
          });
          // console.log('style.transform is ', style.transform);
          if (this.parent?.lastChild instanceof TypeElement) {
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
      })
    );
  }
}
