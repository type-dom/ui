import { A, Div } from '@type-dom/framework';
import { UI } from '../../../../ui/ui.abstract';
import { ITdAnchorLink, ITdAnchorLinkConfig } from './td-anchor-link.interface';

export class TdAnchorLink extends UI implements ITdAnchorLink {
  className: 'TdAnchorLink';
  private href: A;
  private list?: Div;

  constructor(params: ITdAnchorLinkConfig = {}) {
    super();
    this.className = 'TdAnchorLink';
    this.href = new A({
      text: params?.title || '',
      attrObj: {
        href: params?.href || ''
      },
      events: {
        click: () => {
          console.log('click . ');
        }
      }
    });
    this.addChild(this.href);
    if (params?.contents) {
      this.list = new Div({});
      this.list.addChildren(...params.contents);
      this.addChild(this.list);
    }
    this.useParams(params);
  }
}
