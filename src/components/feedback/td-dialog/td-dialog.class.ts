import {
  defineExpose,
  provide,
  useSlots,
  type ISlotRaw,
  Div,
  Transition,
  TypeFragment,
} from '@type-dom/framework';
import { computed, Signal, signal } from '@type-dom/signals';
import { useSameTarget } from '../../../hooks/use-same-target';
import { useNamespace } from '../../../hooks/use-namespace';
import { dialogEmits, dialogProps } from './td-dialog.const';
import { useDeprecated } from '../../../hooks/use-deprecated';
import { TdTeleport } from '../../base';
import { TdOverlay } from '../td-overlay/td-overlay.class';
import { DialogContentProps } from '../td-dialog-content/td-dialog-content.interface';
import { TdDialogContent } from '../td-dialog-content/td-dialog-content.class';
import { TdFocusTrap } from '../td-focus-trap/td-focus-trap.class';
import { dialogInjectionKey } from './constants';
import { useDialog } from './use-dialog';
import { ITdDialog, DialogProps } from './td-dialog.interface';
import './style/index';

// todo 最外层是 Teleport
export class TdDialog extends TypeFragment implements ITdDialog {
  className: 'TdDialog';
  // content: Transition;
  override props: DialogContentProps & DialogProps;
  // private dialogContent: TdDialogContent;
  // private overlay: TdOverlay;
  visible?: Signal<boolean>;
  dialogContentRef?: Signal<TdDialogContent | undefined>;
  resetPosition?: () => void;

  constructor(params: DialogProps & DialogContentProps = {}) {
    super();
    // console.log('TdDialog . ');
    this.className = 'TdDialog';
    this.addEmits(dialogEmits);
    this.assignProps(dialogProps);
    this.props = this.useParams(params) as DialogContentProps & DialogProps;
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;
    const slots = useSlots<{
      header: (arg: any) => any;
      title: ISlotRaw;
      footer: ISlotRaw;
    }>();

    useDeprecated(
      {
        scope: 'el-dialog',
        from: 'the title slot',
        replacement: 'the header slot',
        version: '3.0.0',
        ref: 'https://element-plus.org/en-US/component/dialog.html#slots',
      },
      computed(() => !!slots?.title)
    );

    const ns = useNamespace('dialog');
    const dialogRef = signal<HTMLElement>();
    const headerRef = signal<HTMLElement>();
    const dialogContentRef: Signal<TdDialogContent | undefined> = signal();

    const {
      visible,
      titleId,
      bodyId,
      style,
      overlayDialogStyle,
      rendered,
      zIndex,
      afterEnter,
      afterLeave,
      beforeLeave,
      handleClose,
      onModalClick,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onCloseRequested,
      onFocusoutPrevented,
    } = useDialog(props, dialogRef);

    provide(dialogInjectionKey, {
      dialogRef,
      headerRef,
      bodyId,
      ns,
      rendered,
      style,
    });

    const overlayEvent = useSameTarget(onModalClick);

    const draggable = computed(() => props.draggable && !props.fullscreen);

    const resetPosition = () => {
      dialogContentRef.get()?.resetPosition?.();
    };

    defineExpose({
      /** @description whether the dialog is visible */
      visible,
      dialogContentRef,
      resetPosition,
    });

    this.addChild(
      new TdTeleport({
        to: props.appendTo,
        disabled: props.appendTo !== 'body' ? false : !props.appendToBody,
        slot: new Transition({
          name: 'dialog-fade',
          onAfterEnter: afterEnter,
          onAfterLeave: afterLeave,
          onBeforeLeave: beforeLeave,
          slot: new TdOverlay({
            vShow: visible,
            customMaskEvent: true,
            mask: props.modal,
            overlayClass: props.modalClass,
            attrObj: {
              zIndex: zIndex,
            },
            slot: new Div({
              class: `${ns.namespace.get()}-overlay-dialog`,
              styleObj: overlayDialogStyle,
              attrObj: {
                role: 'dialog',
                ariaModal: true,
                ariaLabel: props.title,
                ariaLabelledby: !props.title ? titleId.get() : undefined,
                ariaDescribedby: bodyId.get(),
              },
              events: {
                click: overlayEvent.onClick,
                mousedown: overlayEvent.onMousedown,
                mouseup: overlayEvent.onMouseup,
              },
              slot: new TdFocusTrap({
                loop: true,
                trapped: visible,
                focusStartEl: 'container',
                events: {
                  // 应该时监听自定义事件
                  focusAfterTrapped: onOpenAutoFocus,
                  focusAfterReleased: onCloseAutoFocus,
                  focusoutPrevented: onFocusoutPrevented,
                  releaseRequested: onCloseRequested,
                },
                slot: () =>
                  new TdDialogContent({
                    vIf: rendered,
                    refEl: dialogContentRef,
                    // v-bind: $attr
                    center: props.center,
                    alignCenter: props.alignCenter,
                    closeIcon: props.closeIcon,
                    draggable: draggable,
                    overflow: props.overflow,
                    fullscreen: props.fullscreen,
                    headerClass: props.headerClass,
                    bodyClass: props.bodyClass,
                    footerClass: props.footerClass,
                    showClose: props.showClose,
                    title: props.title,
                    ariaLevel: props.headerAriaLevel,
                    emits: {
                      close: handleClose,
                    },
                    slot: props.slot ?? props.slots?.default,
                    slots: {
                      header: !slots?.title
                        ? slots?.header?.({
                            close: handleClose,
                            titleId: titleId.get(),
                            titleClass: ns.e('title'),
                          })
                        : slots?.title,
                      footer: slots?.footer,
                    },
                  }),
              }),
            }),
          }),
        }),
      })
    );
  }
}
