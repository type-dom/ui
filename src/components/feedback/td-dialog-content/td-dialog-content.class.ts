import { Button, Div, Footer, Header, Span } from '@type-dom/framework';
import { ElCloseSvg } from '@type-dom/svgs';
import { UI } from '../../../ui/ui.abstract';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import {
  $dialogBodyStyle, $dialogFooterStyle, $dialogHeaderBtn,
  $dialogHeaderCloseStyle,
  $dialogHeaderStyle,
  $dialogStyle,
  $dialogTitleStyle
} from '../td-dialog/td-dialog.style';
import { TdDialog } from '../td-dialog/td-dialog.class';
import { ITdDialogConfig } from '../td-dialog/td-dialog.interface';
import { ITdDialogContent } from './td-dialog-content.interface';

export class TdDialogContent extends UI implements ITdDialogContent {
  className: 'TdDialogContent';
  override props: ITdDialogConfig;
  header?: Header;
  body: Div;
  footer?: Footer;

  constructor(params: ITdDialogConfig = {}) {
    super();
    this.className = 'TdDialogContent';
    this.useTag('div');
    this.style.addObj($dialogStyle);
    this.header = new Header({
      className: 'td-dialog-content',
      styleObj: $dialogHeaderStyle,
    });
    if (params?.width) {
      this.style.addObj({
        width: params.width,
      })
    }
    this.header.addChild(this.getSlotNode('header'));
    if (params?.slots?.header) {

    } else {
      const header = new Span({
        text: params?.title,
        attrObj: {
          role: 'heading'
        },
        styleObj: $dialogTitleStyle,
      });
      this.getSlotNode('header').addSlot(header);
    }
    const showClose = params?.showClose ?? true;
    const closeIcon = params?.closeIcon ? params.closeIcon : new TdIcon({
      className: 'td-dialog-close-icon',
      svgObj: new ElCloseSvg(),
    });
    if (showClose) {
      this.header.style.addObj($dialogHeaderCloseStyle);
      this.header.addChild(
        new Button({
          className: 'td-dialog-close',
          attrObj: {
            type: 'button',
            ariaLabel: 'Close'
          },
          styleObj: $dialogHeaderBtn,
          childNodes: [
            closeIcon
          ],
          events: {
            click: (evt, element) => {
              element?.up<TdDialog>('TdDialog')?.handleClose();
            }
          }
        }),
      );
    }
    this.body = new Div({
      name: 'td-dialog-body',
      styleObj: $dialogBodyStyle
    });
    this.body.addChild(this.getSlotNode());
    this.addChildren(
      this.header,
      this.body
    );
    if (params?.slots?.footer) {
      this.footer = new Footer({
        name: 'td-dialog-footer',
        styleObj: $dialogFooterStyle,
      });
      this.footer.addChild(this.getSlotNode('footer'));
      this.addChild(this.footer);
    }

    this.props = this.useParams(params);
  }
}
