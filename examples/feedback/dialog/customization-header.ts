import { Div, Head, TypeDiv } from '@type-dom/framework';
import { TdButton, TdDialog, TdIcon } from '@type-dom/ui';
import { ElCircleCloseFilledSvg } from '@type-dom/svgs';
import { signal } from '@type-dom/signals';

export class DialogCustomizationHeaderExample extends TypeDiv {
  className = 'DialogCustomizationHeaderExample';

  constructor() {
    super();
    const visible = signal(false)
    this.addChildren(
      new TdButton({
        slot: 'Open Dialog with customized header',
        plain: true,
        events: {
          click: (evt, element) => visible.set(true),
        },
      }),
      new TdDialog({
        title: 'Tips',
        vModel: visible,
        showClose: false,
        width: 500,
        slot: 'This is dialog content.',
        slots: {
          header: ({ close, titleId, titleClass }) =>
            new Div({
              name: 'my-header',
              styleObj: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '16px',
              },
              slot: [
                new Head({
                  nodeName: 'h4',
                  attrObj: {
                    id: titleId as string,
                  },
                  class: titleClass, // todo Dialog.props.titleClass
                  slot: 'This is a custom header!',
                }),
                new TdButton({
                  type: 'danger',
                  events: {
                    click: close,
                  },
                  slot: [
                    new TdIcon({
                      class: 'td-icon td-icon--left',
                      slot: new ElCircleCloseFilledSvg(),
                    }),
                    'Close',
                  ],
                }),
              ],
            }),
        },
      })
    );
  }
}
