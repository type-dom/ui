import { Span, TextNode, TypeDiv, TypeHtml } from '@type-dom/framework';
import { ElCaretBottomSvg } from '@type-dom/svgs';

export class ExpandHeading extends TypeDiv {
  className: 'ExpandHeading';
  override childNodes: [ElCaretBottomSvg, Span];
  svg: ElCaretBottomSvg;
  title: TextNode;

  constructor(title: string) {
    super();
    this.className = 'ExpandHeading';
    this.style.addObj({
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
      height: '36px',
    });
    this.attr.addName('expand-heading');
    this.svg = new ElCaretBottomSvg({
      attrObj: {
        fill: '#FFF',
      },
    });
    this.title = new TextNode(title);
    // span.setStyle('verticalAlign', 'middle');
    const span = new Span({
      parent: this,
      slot: [this.title],
    });
    this.childNodes = [this.svg, span];
  }

  setTitle(title: string) {
    this.title.setText(title);
  }

  override setup(): void {
    this.svg.addEvents({
      click: (e) => {
        // console.log('expand-heading svg.dom clicked');
        e?.stopPropagation();
        // const style = getComputedStyle(this.svg.dom);
        // console.log('style.transform is ', style.transform);
        if (this.svg.style.get('transform') === 'rotate(-90deg)') {
          this.svg.style.setObj({
            transform: 'rotate(0deg)',
            transition: 'transform 0.3s',
          });
          // console.log('style.transform is ', style.transform);
          if (this.parent?.lastChild instanceof TypeHtml) {
            this.parent.lastChild.style.set('display', 'flex'); // flex
          }
        } else {
          this.svg.style.setObj({
            transform: 'rotate(-90deg)',
            transition: 'transform 0.3s',
          });
          if (this.parent?.lastChild instanceof TypeHtml) {
            this.parent.lastChild.style.set('display', 'none');
          }
        }
      },
    });
  }
}
