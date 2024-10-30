import { isElement, isString } from '@type-dom/utils';
import {
  Div,
  IUseSameTargetReturn,
  Label,
  nextTick,
  P,
  Parser,
  TextNode,
  Transition,
  TypeElement,
  useDraggable,
  useSameTarget
} from '@type-dom/framework';
import { ElCloseSvg, TypeComponentsMap } from '@type-dom/svgs';
import { UI } from '../../../ui/ui.abstract';
import { TdButton } from '../../basic/td-button/td-button.class';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { TdInput } from '../../form/td-input/td-input.class';
import { TdOverlay } from '../td-overlay/td-overlay.class';
import { IAction, IMessageBoxState, ITdMessageBox, ITdMessageBoxConfig } from './td-message-box.interface';
import {
  $messageBoxBtnsStyle,
  $messageBoxContainerStyle,
  $messageBoxContentStyle,
  $messageBoxErrorMsgStyle,
  $messageBoxHeaderBtnStyle,
  $messageBoxHeaderStyle,
  $messageBoxInputStyle,
  $messageBoxOverlayStyle,
  $messageBoxStatusStyle,
  $messageBoxStyle,
  $messageBoxTitleStyle,
  useStyle
} from './td-message-box.style';


export class TdMessageBox extends UI<undefined> implements ITdMessageBox {
  className: 'TdMessageBox';
  override props: ITdMessageBoxConfig
  private transition: Transition;
  private overlay: TdOverlay;
  private dialog: Div;
  private messageBox: Div;
  private header?: Div;
  private title?: Div;
  private visible: boolean;
  private state: IMessageBoxState;
  private content: Div;
  private container: Div;
  private inputDiv?: Div;
  private btns: Div;
  private cancelBtn?: TdButton;
  private confirmBtn: TdButton;
  private msgDiv?: Div;
  private input?: TdInput;
  private overlayEvent: IUseSameTargetReturn;
  private errorMsg?: Div;
  private onDraggable: () => void;
  private offDraggable: () => void;

  constructor(params: ITdMessageBoxConfig = {}) {
    super();
    this.useTag('fragment');
    this.className = 'TdMessageBox';
    useStyle(params);
    // const zIndex = useZIndex();
    this.visible = true;
    // s represents state
    this.state = {
      // autofocus element when open message-box
      autofocus: true,
      beforeClose: undefined,
      callback: undefined,
      cancelButtonText: '',
      cancelButtonClass: '',
      confirmButtonText: '',
      confirmButtonClass: '',
      customClass: '',
      customStyle: {},
      dangerouslyUseHTMLString: false,
      distinguishCancelAndClose: false,
      icon: undefined,
      inputPattern: undefined,
      inputPlaceholder: '',
      inputType: 'text',
      inputValue: undefined, // null
      inputValidator: undefined,
      inputErrorMessage: '',
      message: undefined,
      modalFade: true,
      modalClass: '',
      showCancelButton: false,
      showConfirmButton: true,
      type: '',
      title: undefined,
      showInput: false,
      action: '' as IAction,
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      // confirmButtonLoadingIcon: markRaw(Loading),
      // cancelButtonLoadingIcon: markRaw(Loading),
      confirmButtonDisabled: false,
      editorErrorMessage: '',
      // refer to: https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
      // seemed ok for now without this state.
      isOnComposition: false, // temporary remove
      validateError: false,
      zIndex: 2000, // todo nextZIndex(),
    };
    // Object.assign(this.state, params); // todo this.state params 关系？？？
    this.to = this.getAppendToElement(params);
    this.messageBox = new Div({
      name: 'message-box',
      attrObj: {
        tabindex: '-1',
      },
      styleObj: $messageBoxStyle,
      events: {
        click: (evt) => {
          evt?.stopPropagation();
        },
      },
    });
    this.dialog = new Div({
      name: 'message-box-overlay',
      childNodes: [this.messageBox], // 有问题， Div 不能直接用slot
      attrObj: {
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': 'dialog',
        'aria-describedby': 'message-box-container',
        'aria-labelledby': 'message-box-title',
      },
      styleObj: {
        ...$messageBoxOverlayStyle,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },
      events: {
        click: (evt) => this.overlayEvent.onClick(evt),
        mousedown: (evt) => this.overlayEvent.onMousedown(evt),
        mouseup: (evt) => this.overlayEvent.onMouseup(evt),
      },
    });
    // this.dialog.addChild(this.messageBox);
    this.overlay = new TdOverlay({
      name: 'overlay',
      // styleObj: $messageBoxStyle,
      slot: this.dialog,
    });
    this.overlayEvent = useSameTarget(this.handleWrapperClick);
    this.transition = new Transition({
      name: 'fade-in-linear',
      emits: {
        afterLeave: () => {
          // params?.emits?.vanish?.();
          this.emit('vanish');
        },
      },
      slot: this.overlay,
    });
    this.addChild(this.transition);

    let iconComponent;
    if (params?.icon) {
      iconComponent = params.icon;
    } else if (params?.type && TypeComponentsMap[params.type]) {
      iconComponent = new TypeComponentsMap[params.type]();
    }
    if (params?.title) {
      this.header = new Div({
        name: 'header',
        styleObj: $messageBoxHeaderStyle,
      });
      this.messageBox.addChild(this.header);
      this.title = new Div({
        name: 'title',
        styleObj: $messageBoxTitleStyle,
      });
      this.header.addChild(this.title);
      if (iconComponent && params.center) {
        this.title.addChild(
          new TdIcon({
            name: 'icon',
            styleObj: $messageBoxStatusStyle,
            svgObj: iconComponent,
          })
        );
      }
      this.title.addChild(new TextNode(params.title));
      if (params.showClose !== false) {
        this.header?.addChild(
          new TdButton({
            styleObj: $messageBoxHeaderBtnStyle,
            svgObj: new ElCloseSvg(),
            events: {
              click: () => {
                this.handleClose();
              },
              keydown: (evt) => {
                evt?.preventDefault();
                if ((evt as KeyboardEvent).key === 'Enter') {
                  this.handleClose();
                }
              },
            },
            slots: {
              icon: new ElCloseSvg(),
            },
            // childNodes: [
            //   new TdIcon({
            //     name: 'close',
            //     styleObj: $messageBoxHeaderCloseStyle,
            //     svgObj: new ElCloseSvg(),
            //   })
            // ]
          })
        );
      }
    }
    this.content = new Div({
      name: 'content',
      styleObj: $messageBoxContentStyle,
    });
    this.messageBox.addChild(this.content);
    this.container = new Div({
      name: 'message-box-container',
      styleObj: $messageBoxContainerStyle,
    });
    const hasMessage = !!params?.message;
    if (iconComponent && !params?.center && hasMessage) {
      this.container.addChild(
        new TdIcon({
          name: 'status',
          styleObj: $messageBoxStatusStyle,
          svgObj: iconComponent,
        })
      );
    }
    if (hasMessage) {
      this.msgDiv = new Div({
        name: 'message',
      });
      this.container.addChild(this.msgDiv);
      this.msgDiv.addChild(this.getSlotNode());
      if (params?.slot) {
      //
      } else {
        if (!params?.dangerouslyUseHTMLString) {
          if (params?.showInput) {
            if (typeof params?.message === 'string') {
              this.getSlotNode().resetSlot(
                new Label({
                  name: 'label',
                  text: params.message || '',
                })
              );
            } else if (params.message instanceof TypeElement) {
              this.getSlotNode().resetSlot(
                new Label({
                  name: 'label',
                  childNodes: [params.message],
                })
              );
            } else {
              console.warn('message must be a string or a TypeElement');
            }
          } else {
            if (typeof params?.message === 'string') {
              this.getSlotNode().resetSlot(
                new P({
                  name: 'paragraph',
                  text: params.message || '',
                })
              );
            } else if (params?.message instanceof TypeElement) {
              this.getSlotNode().resetSlot(
                new P({
                  name: 'paragraph',
                  childNodes: [params.message],
                })
              );
            } else {
              console.warn('message must be a string or a TypeElement');
            }
          }
        } else {
          if (typeof params.message === 'string') {
            const parser = new Parser();
            const element = parser.parseFromString(params.message);
            if (params?.showInput) {
              this.getSlotNode().resetSlot(
                new Label({
                  name: 'label',
                  childNodes: [element],
                })
              );
            } else {
              this.getSlotNode().resetSlot(
                new P({
                  name: 'paragraph',
                  childNodes: [element],
                })
              );
            }
          } else {
            console.warn('message must be a string');
          }
        }
      }
    }

    this.content.addChild(this.container);
    if (params?.showInput) {
      this.input = new TdInput({
        // id: params.inputId,
        type: params.inputType || 'text',
        placeholder: params.inputPlaceholder,
        // ariaInvalid: this.state.validateError,
        events: {
          keydown: (evt) => {
            if ((evt as KeyboardEvent).key === 'Enter') {
              this.handleInputEnter(evt as KeyboardEvent);
            }
          },
        },
      });
      this.errorMsg = new Div({
        name: 'error-message',
        styleObj: {
          ...$messageBoxErrorMsgStyle,
          // visibility: !!this.state.editorErrorMessage ? 'visible' : 'hidden'
        },
        childNodes: [new TextNode(this.state.editorErrorMessage)],
      });
      this.errorMsg.textNode = this.errorMsg.childNodes[0] as TextNode;
      this.inputDiv = new Div({
        name: 'input-div',
        styleObj: $messageBoxInputStyle,
        childNodes: [this.input, this.errorMsg],
      });
      this.content.addChild(this.inputDiv);
    }

    this.btns = new Div({
      name: 'btns',
      styleObj: $messageBoxBtnsStyle,
    });
    this.messageBox.addChild(this.btns);
    if (params?.showCancelButton) {
      this.cancelBtn = new TdButton({
        name: 'cancel-btn',
        // size: params.btnSize,
        // loading: params.cancelButtonLoading,
        loadingIcon: params.cancelButtonLoadingIcon,
        slot: params.cancelButtonText || 'Cancel',
        round: params.roundButton,
        // styleObj: $messageBoxCancelBtnStyle,
        events: {
          click: () => { // todo
            console.log('this.cancelBtn click . ');
            this.handleAction('cancel');
            this.resolve({ action: 'cancel' });
          },
          keydown: (evt) => {
            evt?.preventDefault();
            if (evt?.key === 'Enter') {
              this.handleAction('cancel');
              this.resolve({ action: 'cancel' });
            }
          }
        },
      });
      this.btns.addChild(this.cancelBtn);
    }
    this.confirmBtn = new TdButton({
      name: 'confirm-btn',
      type: 'primary',
      // loading: params.confirmButtonLoading,
      loadingIcon: params?.confirmButtonLoadingIcon,
      slot: params?.confirmButtonText || 'OK',
      round: params?.roundButton,
      // styleObj: $messageBoxConfirmBtnStyle,
      styleObj: {
        marginLeft: '12px',
      },
      events: {
        click: () => {
          this.handleAction('confirm');
          const input = this.input;
          this.resolve({ action: 'confirm', input });
        },
        keydown: (evt, element) => {
          evt?.preventDefault();
          if (evt?.key === 'Enter') {
            this.handleAction('confirm');
            const input = this.input;
            this.resolve({ action: 'confirm', input });
          }
        },
      },
    });
    this.btns.addChild(this.confirmBtn);

    this.props = this.useParams(params);

    const draggable = params?.draggable;
    const overflow = params?.overflow;
    const { onDraggable, offDraggable } = useDraggable(
      this.messageBox.dom,
      this.header?.dom,
      draggable,
      overflow
    );
    this.onDraggable = onDraggable;
    this.offDraggable = offDraggable;
    this.mount(this.to);
  }

  override mounted() {
    if (this.props.draggable) {
      this.onDraggable?.();
    } else {
      this.offDraggable();
    }
  }
  override beforeDestroy() {
    this.offDraggable();
  }

  // onMounted(() => {
  //     watchEffect(() => {
  //       if (draggable.value) {
  //         onDraggable()
  //       } else {
  //         offDraggable()
  //       }
  //     })
  //   })
  //
  //   onBeforeUnmount(() => {
  //     offDraggable()
  //   })

  // 普通显示
  static info(params?: ITdMessageBoxConfig) {
    console.log('TdMessageBox show params is ', params);
    return new TdMessageBox(params);
  }

  // 用 callback
  static alert(message: string, title?: string, params?: ITdMessageBoxConfig) {
    new TdMessageBox({
      boxType: 'alert',
      message,
      title,
      ...params,
    });
  }

  static confirm(
    message: string,
    title?: string,
    params?: ITdMessageBoxConfig
  ) {
    return new TdMessageBox({
        boxType: 'confirm',
        message,
        title,
        showCancelButton: true,
        ...params,
      });
  }

  // todo 多次提交时，不触发返回操作。
  static prompt(message: string, title?: string, params?: ITdMessageBoxConfig) {
    return new TdMessageBox({
        boxType: 'prompt',
        message,
        title,
        showCancelButton: true,
        showInput: true,
        ...params,
      });
  }

  doClose(): void {
    console.log('doClose . ');
    if (!this.visible) {
      return;
    }
    this.visible = false;
    this.messageBox.style.hide();
    nextTick(() => {
      if (this.state.action) {
        this.emit('action', this.state.action);
        // this.props.emits?.action?.(this.state.action);
        this.destroy();
      }
    });
  }

  // 作为参数调用要用箭头函数
  handleWrapperClick = () => {
    if (this.props.closeOnClickModal) {
      this.handleAction(
        this.state.distinguishCancelAndClose ? 'close' : 'cancel'
      );
    }
  }

  handleInputEnter = (e: KeyboardEvent) => {
    if (this.state.inputType !== 'textarea') {
      e.preventDefault();
      return this.handleAction('confirm');
    }
  };

  handleAction(action: IAction) {
    console.log('handleAction', action);
    if (
      this.props.boxType === 'prompt' &&
      action === 'confirm' &&
      !this.validate()
    ) {
      return;
    }

    this.props?.callback && this.props.callback(action);

    this.state.action = action;

    if (this.state.beforeClose) {
      this.state.beforeClose?.(action, this.state, this.doClose);
    } else {
      this.doClose();
    }
  }

  validate() {
    if (this.props.boxType === 'prompt') {
      console.log('validate . ');
      const inputPattern = this.props.inputPattern;
      if (inputPattern && !inputPattern.test(this.input?.value || '')) {
        this.state.editorErrorMessage = this.props.inputErrorMessage; // || t('el.messagebox.error') todo t 是国际化翻译的全局方法
        this.state.validateError = true;
        this.errorMsg?.style.setObj({
          visibility: this.state.editorErrorMessage ? 'visible' : 'hidden',
        });
        this.errorMsg?.textNode?.setText(this.state.editorErrorMessage || '');
        return false;
      }
      const inputValidator = this.state.inputValidator;
      if (typeof inputValidator === 'function') {
        const validateResult = inputValidator(this.input?.value);
        if (validateResult === false) {
          this.state.editorErrorMessage = this.props.inputErrorMessage; // || t('el.messagebox.error')
          this.state.validateError = true;

          this.errorMsg?.style.setObj({
            visibility: this.state.editorErrorMessage ? 'visible' : 'hidden',
          });
          this.errorMsg?.textNode?.setText(this.state.editorErrorMessage || '');
          return false;
        }
        if (typeof validateResult === 'string') {
          this.state.editorErrorMessage = validateResult;
          this.state.validateError = true;

          this.errorMsg?.style.setObj({
            visibility: this.state.editorErrorMessage ? 'visible' : 'hidden',
          });
          this.errorMsg?.textNode?.setText(this.state.editorErrorMessage || '');
          return false;
        }
      }
    }
    this.state.editorErrorMessage = '';
    this.state.validateError = false;
    return true;
  }

  getInputElement() {
    // const inputRefs = this.input;
    // return (inputRefs?.input || inputRefs?.textarea) as HTMLElement
    return this.input?.panel.inner.dom;
  }

  handleClose() {
    this.handleAction('close');
  }

  // when close on press escape is disabled, pressing esc should not callout
  // any other message box and close any other dialog-ish elements
  // e.g. Dialog has a close on press esc feature, and when it closes, it calls
  // props.beforeClose method to make a intermediate state by callout a message box
  // for some verification or alerting. then if we allow global event liek this
  // to dispatch, it could callout another message box.
  onCloseRequested() {
    if (this.props.closeOnPressEscape) {
      this.handleClose();
    }
  }

  getAppendToElement(props?: ITdMessageBoxConfig): HTMLElement {
    let appendTo: HTMLElement | null = document.body;
    if (props?.appendTo) {
      if (isString(props.appendTo)) {
        appendTo = document.querySelector<HTMLElement>(props.appendTo);
      }
      if (isElement(props.appendTo)) {
        appendTo = props.appendTo;
      }

      // should fallback to default value with a warning
      if (!isElement(appendTo)) {
        console.warn(
          'MessageBox',
          'the appendTo option is not an HTMLElement. Falling back to document.body.'
        );
        appendTo = document.body;
      }
    }
    return appendTo;
  }
}
