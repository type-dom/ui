import { Div, Span, TypeDiv } from '@type-dom/framework';
import { TdBadge, TdButton, TdIcon } from '@type-dom/ui';
import { ElMessageSvg } from '@type-dom/svgs';

export class BadgeCustomExample extends TypeDiv {
  className = 'BadgeCustomExample';

  constructor() {
    super();
    const $item = {
      marginTop: '10px',
      marginRight: '30px'
    };
    this.addChildren(
      new TdBadge({
        value: 'new',
        styleObj: $item,
        slot: new TdButton({
          slot: 'comments'
        })
      }),
      new TdBadge({
        value: 'hot',
        styleObj: $item,
        slot: new TdButton({
          slot: 'replies'
        })
      }),
      new TdBadge({
        value: '99',
        styleObj: $item,
        slot: new TdButton({
          slot: 'share'
        }),
        slots: {
          content: new Div({
            class: 'custom-content',
            styleObj: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            },
            slot: [
              new TdIcon({
                slot: new ElMessageSvg(),
              }),
              new Span({
                slot: '99',
              })
            ]
          })
        },
      })
    );
  }
}
