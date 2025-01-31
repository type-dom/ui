import { TextNode, TypeDiv } from '@type-dom/framework';
import { TdIcon, TdLink } from '@type-dom/ui';
import { ElEditSvg, ElViewSvg } from '@type-dom/svgs';

export class LinkIconExample extends TypeDiv {
  className: 'LinkIconExample';

  constructor() {
    super();
    this.className = 'LinkIconExample';
    this.addChildren(
      new TdLink({
        slot:'Edit',
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        },
        icon: new TdIcon({
          slot: new ElEditSvg()
        }),
      }),
      new TdLink({
        styleObj: {
          marginRight: '10px',
          // verticalAlign: 'text-bottom'
        },
        slot: [
          new TextNode('Check'),
          new TdIcon({
            slot: new ElViewSvg()
          })
        ],
      })
    );
  }
}
