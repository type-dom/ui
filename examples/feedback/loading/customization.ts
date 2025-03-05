import { Div, Head, Span, TextNode, TypeDiv } from '@type-dom/framework';
import { $dialogTitleStyle, TdButton, TdDialog, TdIcon } from '@type-dom/ui';
import { ElCircleCloseSvg } from '@type-dom/svgs';

export class LoadingCustomizationExample extends TypeDiv {
  className = 'LoadingCustomizationExample';

  constructor() {
    super();
    this.addChildren(
      new TdButton({
        slot: 'Open Dialog with customized header',
        plain: true,
        events: {
          click: (evt, element) => {

          }
        }
      }),
      new TdDialog({
        title: 'Tips',
        modelValue: false,
        width: 500,
        showClose: false,
        slot: new TextNode('This is dialog content.'),
        slots: {
          header: new Div({
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
                slot: 'This is a custom header!',
                styleObj: {
                  ...$dialogTitleStyle,
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                },
              }),
              new TdButton({
                type: 'danger',
                events: {
                  click: (evt, element) => {

                  }
                },
                slot: [
                  new TdIcon({
                    slot: new ElCircleCloseSvg(),
                    styleObj: {
                      marginRight: '5px',
                    }
                  }),
                  new TextNode('Close')
                ]
              })
            ]
          })
        }
      }),
    );
  }
}
