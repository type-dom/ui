import { TypeDiv, Span } from '@type-dom/framework';
import { TdDivider, TdIcon } from '@type-dom/ui';
import { ElStarFilledSvg } from '@type-dom/svgs';

export class DividerCustomContentExample extends TypeDiv {
  className: 'DividerCustomContentExample';
  constructor() {
    super();
    this.className = 'DividerCustomContentExample';
    this.addChildren(
      new Span({
        slot: 'What you are you do not see, what you see is your shadow. '
      }),
      new TdDivider({
        contentPosition: 'left',
        slot: 'Rabindranath Tagore'
      }),
      new Span({
        slot: `
        My wishes are fools, they shout across thy song, my Master. Let me but
      listen.
      `
      }),
      new TdDivider({
        slot: new TdIcon({
          slot: new ElStarFilledSvg()
        })
      }),
      new Span({
        slot: `I cannot choose the best. The best chooses me.`
      }),
      new TdDivider({
        contentPosition: 'right',
        slot: 'Rabindranath Tagore',
      })
    )
  }
}