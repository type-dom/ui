import {
  defineExpose,
  Div,
  Head,
  onMounted,
  P,
  Parser,
  SvgSvg,
  TextNode,
  Transition,
  TypeElement,
  TypeFragment,
  useEventListener,
  useTimeoutFn,
} from '@type-dom/framework';
import { computed, Signal, signal } from '@type-dom/signals';
import { CloseComponents, ElCloseSvg, TypeComponentsMap } from '@type-dom/svgs';
import { IStyle } from '@type-dom/css-type';
import { EVENT_CODE } from '../../../constants/aria';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { useGlobalComponentSettings } from '../../configuration/td-config-provider';
import { notificationEmits, notificationProps } from './td-notification.const';
import {
  ITdNotification,
  NotificationProps,
} from './td-notification.interface';

export class TdNotification extends TypeFragment implements ITdNotification {
  className: 'TdNotification';
  override props: NotificationProps;
  visible?: Signal<boolean>;
  close?: () => void;
  divRef: Signal<HTMLElement | undefined>;

  // todo option 基于notify中的调用设置
  constructor(params: NotificationProps = {}) {
    super();
    this.className = 'TdNotification';
    this.divRef = signal<HTMLElement | undefined>();
    this.addEmits(notificationEmits);
    this.assignProps(notificationProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    const { ns, zIndex } = useGlobalComponentSettings('notification');
    const { nextZIndex, currentZIndex } = zIndex;

    const { Close } = CloseComponents;

    const visible = signal(false);
    let timer: (() => void) | undefined = undefined;

    const typeClass = computed(() => {
      const type = props.type;
      return type && TypeComponentsMap[type] ? ns.m(type) : '';
    });

    const iconComponent = computed(() => {
      if (!props.type) return props.icon;
      return TypeComponentsMap[props.type] || props.icon;
    });

    const horizontalClass = computed(() =>
      props.position?.endsWith('right') ? 'right' : 'left'
    );

    const verticalProperty = computed(() =>
      props.position?.startsWith('top') ? 'top' : 'bottom'
    );

    const positionStyle = computed<IStyle>(() => {
      return {
        [verticalProperty.get()]: `${props.offset}px`,
        zIndex: props.zIndex ?? currentZIndex.get(),
      };
    });

    function startTimer() {
      if (props.duration! > 0) {
        ({ stop: timer } = useTimeoutFn(() => {
          if (visible.get()) close();
        }, props.duration!));
      }
    }

    function clearTimer() {
      timer?.();
    }

    function close() {
      visible.set(false);
    }

    function onKeydown({ code }: KeyboardEvent) {
      if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) {
        clearTimer(); // press delete/backspace clear timer
      } else if (code === EVENT_CODE.esc) {
        // press esc to close the notification
        if (visible.get()) {
          close();
        }
      } else {
        startTimer(); // resume timer
      }
    }

    // lifecycle
    onMounted(() => {
      startTimer();
      nextZIndex();
      visible.set(true);
    });

    useEventListener(document, 'keydown', onKeydown);

    defineExpose({
      visible,
      /** @description close notification */
      close,
    });

    this.addChild(
      new Transition({
        name: 'fade',
        onBeforeLeave: () => {
          console.log('beforeLeave');
          props.onClose?.();
        },
        onAfterLeave: () => {
          console.log('afterLeave');
          emit('destroy');
        },
        slot: new Div({
          refDom: this.divRef,
          vShow: visible,
          class: [ns.b(), props.customClass, horizontalClass.get()],
          attrObj: {
            id: props.id,
            role: 'alert',
          },
          styleObj: positionStyle,
          events: {
            mouseenter: clearTimer,
            mouseleave: startTimer,
            click: props.onClick,
          },
          slot: [
            new TdIcon({
              vIf: iconComponent,
              class: [ns.e('icon'), typeClass.get()],
              slot:
                iconComponent.get() &&
                new (iconComponent.get() as unknown as typeof SvgSvg)(),
            }),
            new Div({
              class: 'group',
              slot: [
                new Head({
                  class: ns.e('title'),
                  nodeName: 'h2',
                  slot: props.title,
                }),
                new Div({
                  vShow: props.message,
                  class: ns.e('content'),
                  styleObj: !!props.title ? undefined : { margin: 0 },
                  slot: props.slot ??
                    props.slots?.default ?? [
                      !props.dangerouslyUseHTMLString
                        ? new P({
                            slot: props.message,
                          })
                        : new P({
                            html: props.message as string,
                          }),
                    ],
                }),
                new TdIcon({
                  vIf: props.showClose,
                  class: ns.e('closeBtn'),
                  slot: new Close(),
                  events: {
                    click: (evt) => {
                      evt?.stopPropagation();
                      close();
                    },
                  },
                }),
              ],
            }),
          ],
        }),
      })
    );
  }
}
