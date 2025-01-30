import { A, Div, TypeDiv } from '@type-dom/framework';
import { ITdAnchorLink, AnchorLinkProps } from './td-anchor-link.interface';

export class TdAnchorLink extends TypeDiv implements ITdAnchorLink {
  className: 'TdAnchorLink';
  private href: A;
  private list?: Div;

  constructor(params: AnchorLinkProps = {}) {
    super();
    this.className = 'TdAnchorLink';
    this.href = new A({
      slot: params.slot || params?.title || '',
      attrObj: {
        href: params?.href || '',
      },
      events: {
        click: () => {
          console.log('click . ');
        },
      },
    });
    this.addChild(this.href);
    // if (params?.contents) {
    //   this.list = new Div({});
    //   this.list.addChildren(...params.contents);
    //   this.addChild(this.list);
    // }
    this.useParams(params);
  }
}
