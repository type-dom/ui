import { Teleport, Transition } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { TdDialogContent } from '../td-dialog-content/td-dialog-content.class';
import { ITdDialog, ITdDialogConfig } from './td-dialog.interface';
import { overlayZIndex, TdOverlay } from '../td-overlay/td-overlay.class';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';

export class TdDialog extends UI<undefined> implements ITdDialog {
  className: 'TdDialog';
  override props: ITdDialogConfig;
  private teleport: Teleport;
  private dialogContent: TdDialogContent;
  private overlay: TdOverlay;

  constructor(params: ITdDialogConfig = {}) {
    super();
    this.useTag('fragment');
    console.log('TdDialog . ');
    this.className = 'TdDialog';
    const appendTo = params?.appendToBody ? document.body : params?.appendTo;
    this.dialogContent = new TdDialogContent(params);
    this.overlay = new TdOverlay({
      name: 'td-dialog-overlay',
      styleObj: {
        display: params?.modelValue ? 'block' : 'none',
      },
      slot: this.dialogContent,
    });
    if (params?.appendToBody) {
      this.overlay.style.addObj({
        zIndex: overlayZIndex + 1000,
      })
    }
    this.teleport = new Teleport({
      // disabled: appendTo !== document.body ? false : false,
      to: appendTo,
      childNodes: [
        new Transition({
          name: 'dialog-fade',
          emits: {
            afterEnter: () => {
              console.log('afterEnter . ');
              this.afterEnter()
            },
            afterLeave: () => {
              console.log('afterLeave . ');
              this.afterLeave()
            },
            beforeLeave: () => {
              console.log('beforeLeave . ');
              this.beforeLeave()
            }
          },
          slot: this.overlay,
        }),
      ]
    });
    this.addChild(this.teleport);
    this.props = this.useParams(params);
  }

  show() {
    console.log('TdDialog . show . ');
    this.overlay.style.show();
  }
  handleClose() {
    this.overlay.style.hide();
    // function hide(shouldCancel?: boolean) {
    //   if (shouldCancel) return
    //   // closed.value = true
    //   // visible.value = false
    // }
    //
    // if (this.props.emits?.beforeClose) {
    //   this.props.emits.beforeClose(hide)
    // } else {
    //   close()
    // }
  }


  afterEnter() {
    this.emit('opened')
  }

  afterLeave() {
    this.emit('closed')
    this.emit(UPDATE_MODEL_EVENT, false)
    if (this.props.destroyOnClose) {
      this.rendered = false
    }
  }

  beforeLeave() {
    this.emit('close')
  }

}
