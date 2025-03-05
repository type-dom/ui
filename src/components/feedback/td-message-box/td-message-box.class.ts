import { isFunction, isString } from '@type-dom/utils';
import {
  Div,
  Transition,
  TypeElement,
  TypeFragment,
  Span,
  Button,
  XElement,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from '@type-dom/framework';
import {
  computed,
  Signal,
  signal,
  toRaw,
  unref,
  watch,
} from '@type-dom/signals';
import {
  ElCloseSvg,
  ElLoadingSvg,
  SvgSvg,
  TypeComponentsMap,
} from '@type-dom/svgs';
import { useLockscreen } from '../../../hooks/use-lockscreen';
import { useSameTarget } from '../../../hooks/use-same-target';
import { useId } from '../../../hooks/use-id';
import { useGlobalComponentSettings } from '../../configuration/td-config-provider';
import { useDraggable } from '../../../hooks/use-draggable';
import { TdButton } from '../../basic/td-button/td-button.class';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { TdInput } from '../../form/td-input/td-input.class';
import { TdOverlay } from '../td-overlay/td-overlay.class';
import { TdFocusTrap } from '../td-focus-trap/td-focus-trap.class';
import {
  Action,
  ITdMessageBox,
  MessageBoxProps,
  MessageBoxState,
} from './td-message-box.interface';
import { messageBoxProps } from './td-message-box.const';
import './style/index';

export class TdMessageBox extends TypeFragment implements ITdMessageBox {
  className: 'TdMessageBox';
  override props: MessageBoxProps;
  visible?: Signal<boolean>;

  constructor(params: MessageBoxProps = {}) {
    super();
    this.className = 'TdMessageBox';
    this.assignProps(messageBoxProps);
    // console.warn('params is ', params);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;
    // const popup = usePopup(props, doClose)
    const {
      locale,
      zIndex,
      ns,
      size: btnSize,
    } = useGlobalComponentSettings(
      'message-box',
      computed(() => props.buttonSize)
    );

    const { t } = locale;
    const { nextZIndex } = zIndex;

    const visible = signal(false);
    // s represents state
    const state: MessageBoxState = Object.assign(
      {
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
        // icon: '',
        inputPattern: undefined,
        inputPlaceholder: '',
        inputType: 'text',
        inputValue: signal(undefined),
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
        action: '' as Action,
        confirmButtonLoading: false,
        cancelButtonLoading: false,
        confirmButtonLoadingIcon: new ElLoadingSvg(), // markRaw(Loading),
        cancelButtonLoadingIcon: new ElLoadingSvg(), // markRaw(Loading),
        confirmButtonDisabled: false,
        editorErrorMessage: signal(''),
        // refer to: https://github.com/ElemeFE/element/commit/2999279ae34ef10c373ca795c87b020ed6753eed
        // seemed ok for now without this state.
        // isOnComposition: false, // temporary remove
        validateError: false,
        zIndex: nextZIndex(),
      },
      props
    );

    const typeClass = computed(() => {
      const type = state.type;
      return { [ns.bm('icon', type)]: type && TypeComponentsMap[type] };
    });

    const contentId = useId();
    const inputId = useId();

    const iconComponent = computed(
      () => state.icon || (state.type && TypeComponentsMap[state.type]) || ''
    );
    const hasMessage = computed(() => !!state.message);
    const rootRef = signal<HTMLElement>();
    const headerRef = signal<HTMLElement>();
    const focusStartRef = signal<HTMLElement>();
    const inputRef = signal<TdInput>();
    const confirmRef = signal<TypeElement>();

    const confirmButtonClasses = computed(() => state.confirmButtonClass);

    watch(
      () => state.inputValue?.get(),
      async (val) => {
        await nextTick();
        // console.log('watch state.inputValue , val is ', val);
        if (props.boxType === 'prompt' && val !== undefined) {
          validate();
        }
      },
      { immediate: true }
    );

    watch(
      () => visible.get(),
      (val) => {
        if (val) {
          if (props.boxType !== 'prompt') {
            if (state.autofocus) {
              focusStartRef.set(
                (confirmRef.get()?.dom as HTMLElement) ?? rootRef.get()
              );
            } else {
              focusStartRef.set(rootRef.get());
            }
          }
          state.zIndex = nextZIndex();
        }
        if (props.boxType !== 'prompt') return;
        if (val) {
          nextTick().then(() => {
            if (inputRef.get() && inputRef.get()?.dom) {
              if (state.autofocus) {
                focusStartRef.set(
                  (getInputElement() as HTMLElement) ?? rootRef.get()
                );
              } else {
                focusStartRef.set(rootRef.get());
              }
            }
          });
        } else {
          state.editorErrorMessage?.set('');
          state.validateError = false;
        }
      }
    );

    const draggable = computed(() => props.draggable);
    const overflow = computed(() => props.overflow);
    useDraggable(rootRef, headerRef, draggable, overflow);

    onMounted(async () => {
      await nextTick();
      if (props.closeOnHashChange) {
        window.addEventListener('hashchange', doClose);
      }
    });

    onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        window.removeEventListener('hashchange', doClose);
      }
    });

    function doClose() {
      if (!visible.get()) return;
      visible.set(false);
      nextTick(() => {
        if (state.action) emit('action', state.action);
      });
    }

    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(state.distinguishCancelAndClose ? 'close' : 'cancel');
      }
    };

    const overlayEvent = useSameTarget(handleWrapperClick);

    const handleInputEnter = (e: KeyboardEvent) => {
      if (state.inputType !== 'textarea') {
        e.preventDefault();
        return handleAction('confirm');
      }
    };

    const handleAction = (action: Action) => {
      console.error('handleAction . action is ', action);
      if (props.boxType === 'prompt' && action === 'confirm' && !validate()) {
        return;
      }

      state.action = action;

      if (state.beforeClose) {
        state.beforeClose?.(action, state, doClose);
      } else {
        doClose();
      }
    };

    const validate = () => {
      console.error(
        'validate . state.editorErrorMessage is ',
        state.editorErrorMessage
      );
      if (props.boxType === 'prompt') {
        const inputPattern = state.inputPattern;
        if (inputPattern && !inputPattern.test(state.inputValue?.get() || '')) {
          state.editorErrorMessage?.set(
            state.inputErrorMessage || t('el.messagebox.error')
          );

          state.validateError = true;
          return false;
        }
        const inputValidator = state.inputValidator;
        if (isFunction(inputValidator)) {
          const validateResult = inputValidator(state.inputValue?.get());
          if (validateResult === false) {
            state.editorErrorMessage?.set(
              state.inputErrorMessage || t('el.messagebox.error')
            );

            state.validateError = true;
            return false;
          }
          if (isString(validateResult)) {
            state.editorErrorMessage?.set(validateResult);
            state.validateError = true;
            return false;
          }
        }
      }
      state.editorErrorMessage?.set('');
      state.validateError = false;
      return true;
    };

    const getInputElement = () => {
      const inputRefs = inputRef.get(); // .$refs
      return toRaw(inputRefs?.input) || toRaw(inputRefs?.textarea);
    };

    const handleClose = () => {
      handleAction('close');
    };

    // when close on press escape is disabled, pressing esc should not callout
    // any other message box and close any other dialog-ish elements
    // e.g. Dialog has a close on press esc feature, and when it closes, it calls
    // props.beforeClose method to make a intermediate state by callout a message box
    // for some verification or alerting. then if we allow global event liek this
    // to dispatch, it could callout another message box.
    const onCloseRequested = () => {
      if (props.closeOnPressEscape) {
        handleClose();
      }
    };

    // locks the screen to prevent scroll
    if (props.lockScroll) {
      useLockscreen(visible);
    }

    this.visible = visible;
    // return {
    //   ...toRefs(state),
    //   ns,
    //   overlayEvent,
    //   visible,
    //   hasMessage,
    //   typeClass,
    //   contentId,
    //   inputId,
    //   btnSize,
    //   iconComponent,
    //   confirmButtonClasses,
    //   rootRef,
    //   focusStartRef,
    //   headerRef,
    //   inputRef,
    //   confirmRef,
    //   doClose, // for outside usage
    //   handleClose, // for out side usage
    //   onCloseRequested,
    //   handleWrapperClick,
    //   handleInputEnter,
    //   handleAction,
    //   t,
    // }

    this.addChild(
      new Transition({
        name: 'fade-in-linear',
        onAfterLeave: () => {
          emit('vanish');
        },
        slot: new TdOverlay({
          vShow: visible,
          overlayClass: [ns.is('message-box'), state.modalClass],
          mask: props.modal,
          slot: new Div({
            attrObj: {
              zIndex: state.zIndex,
              role: 'dialog',
              ariaLabel: state.title,
              ariaModal: true,
              ariaDescribedby: !state.showInput ? contentId.get() : undefined,
              class: `${ns.namespace.get()}-overlay-message-box`,
            },
            events: {
              click: overlayEvent.onClick,
              mousedown: overlayEvent.onMousedown,
              mouseup: overlayEvent.onMouseup,
            },
            slot: new TdFocusTrap({
              loop: true,
              trapped: visible,
              focusTrapEl: rootRef,
              focusStartEl: focusStartRef,
              emits: {
                releaseRequested: onCloseRequested,
              },
              slot: () =>
                new Div({
                  refDom: rootRef,
                  class: computed(() => [
                    ns.b(),
                    state.customClass,
                    ns.is('draggable', draggable.get()),
                    { [ns.m('center')]: props.center },
                  ]),
                  styleObj: state.customStyle,
                  attrObj: {
                    tabindex: '-1',
                  },
                  events: {
                    click: (evt) => evt?.stopPropagation(),
                  },
                  slot: [
                    new Div({
                      vIf: state.title !== null && state.title !== undefined,
                      refDom: headerRef,
                      class: [
                        ns.e('header'),
                        { 'show-close': props.showClose },
                      ],
                      slot: [
                        new Div({
                          class: ns.e('title'),
                          slot: [
                            iconComponent.get() && props.center
                              ? new TdIcon({
                                  class: [ns.e('status'), typeClass.get()],
                                  slot: new (iconComponent.get() as unknown as typeof SvgSvg)(),
                                })
                              : undefined,
                            new Span({
                              slot: props.title as string,
                            }),
                          ],
                        }),
                        new Button({
                          vIf: props.showClose,
                          attrObj: {
                            type: 'button',
                            class: ns.e('headerbtn'),
                            ariaLabel: t('el.messagebox.close'),
                          },
                          events: {
                            click: () =>
                              handleAction(
                                state.distinguishCancelAndClose
                                  ? 'close'
                                  : 'cancel'
                              ),
                            keydown: (e?: KeyboardEvent) => {
                              if (e?.key === 'Enter') {
                                handleAction(
                                  state.distinguishCancelAndClose
                                    ? 'close'
                                    : 'cancel'
                                );
                                e?.preventDefault();
                              }
                            },
                          },
                          slot: new TdIcon({
                            class: ns.e('close'),
                            // attrObj: {
                            //   class: ns.e('close')
                            // },
                            slot: new ElCloseSvg(),
                          }),
                        }),
                      ],
                    }),
                    new Div({
                      attrObj: {
                        id: contentId.get(),
                        class: ns.e('content'),
                      },
                      slot: [
                        new Div({
                          class: ns.e('container'),
                          slot: [
                            new TdIcon({
                              vIf: computed(
                                () =>
                                  iconComponent.get() &&
                                  !props.center &&
                                  hasMessage
                              ),
                              class: [ns.e('status'), typeClass.get()],
                              slot:
                                iconComponent.get() &&
                                new (iconComponent.get() as unknown as typeof SvgSvg)(),
                            }),
                            new Div({
                              vIf: hasMessage,
                              class: ns.e('message'),
                              slot: props.slot ??
                                props.slots?.default ?? [
                                  !state.dangerouslyUseHTMLString
                                    ? new XElement({
                                        tag: state.showInput ? 'label' : 'p',
                                        attrObj: {
                                          for: state.showInput
                                            ? inputId.get()
                                            : undefined,
                                        },
                                        slot: !state.dangerouslyUseHTMLString
                                          ? props.message
                                          : '',
                                      })
                                    : new XElement({
                                        tag: state.showInput ? 'label' : 'p',
                                        attrObj: {
                                          for: state.showInput
                                            ? inputId.get()
                                            : undefined,
                                        },
                                        html: props.message as string,
                                      }),
                                ],
                            }),
                          ],
                        }),
                        new Div({
                          vShow: state.showInput,
                          class: ns.e('input'),
                          slot: [
                            new TdInput({
                              refEl: inputRef,
                              vModel: state.inputValue,
                              attrObj: {
                                id: inputId.get(),
                                type: state.inputType,
                                // autocomplete: 'off',
                                placeholder: state.inputPlaceholder,
                                ariaInvalid: state.validateError,
                                class: { invalid: state.validateError },
                                events: {
                                  keydown: (e?: KeyboardEvent) => {
                                    if (e?.key === 'Enter') {
                                      handleInputEnter(e);
                                    }
                                  },
                                },
                              },
                            }),
                            new Div({
                              class: ns.e('errormsg'),
                              styleObj: {
                                visibility: computed(() =>
                                  !!state.editorErrorMessage?.get()
                                    ? 'visible'
                                    : 'hidden'
                                ),
                              },
                              slot: state.editorErrorMessage,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new Div({
                      class: ns.e('btns'),
                      slot: [
                        new TdButton({
                          vIf: state.showCancelButton,
                          loading: state.cancelButtonLoading,
                          loadingIcon: state.cancelButtonLoadingIcon,
                          class: [state.cancelButtonClass],
                          round: props.roundButton,
                          size: btnSize.get(),
                          attrObj: {
                            type: 'button',
                            class: ns.e('action'),
                            ariaLabel: t('el.messagebox.cancel'),
                          },
                          events: {
                            click: () => handleAction('cancel'),
                            keydown: (e?: KeyboardEvent) => {
                              if (e?.key === 'Enter') {
                                handleAction('cancel');
                              }
                              e?.preventDefault();
                              e?.stopPropagation();
                            },
                          },
                          slot: computed(
                            () =>
                              unref(state.cancelButtonText) ||
                              t('el.messagebox.cancel')
                          ),
                        }),
                        new TdButton({
                          vShow: state.showConfirmButton,
                          refEl: confirmRef,
                          type: 'primary',
                          loading: state.confirmButtonLoading,
                          loadingIcon: state.confirmButtonLoadingIcon,
                          class: state.confirmButtonClass,
                          round: props.roundButton,
                          disabled: state.confirmButtonDisabled,
                          size: btnSize.get(),
                          events: {
                            click: () => handleAction('confirm'),
                            keydown: (e?: KeyboardEvent) => {
                              if (e?.key === 'Enter') {
                                handleAction('confirm');
                              }
                              e?.preventDefault();
                              e?.stopPropagation();
                            },
                          },
                          slot: computed(
                            () =>
                              unref(state.confirmButtonText) ||
                              t('el.messagebox.confirm')
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
            }),
          }),
        }),
      })
    );
  }
}
