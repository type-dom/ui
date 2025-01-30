import {
  Div,
  P,
  SvgSvg,
  Transition,
  TypeFragment,
  XElement,
  arraySlot,
  defineExpose,
  onMounted,
  useEventListener,
  useResizeObserver,
  useTimeoutFn,
} from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';
import { ElCloseSvg, TypeComponentsMap } from '@type-dom/svgs';
import {
  computed,
  signal,
  watch,
  Signal,
  Computed,
  unref,
} from '@type-dom/signals';
import { EVENT_CODE } from '../../../constants/aria';
import { TdBadge } from '../../data/td-badge/td-badge.class';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { BadgeProps } from '../../data/td-badge/td-badge.interface';
import { useGlobalComponentSettings } from '../../configuration/td-config-provider/hooks/use-global-config';
import { getLastOffset, getOffsetOrSpace } from './instance';
import { messageDefaults, messageEmits } from './td-message.const';
import { ITdMessage, MessageProps } from './td-message.interface';
import './style/index';

export class MessageClass extends TypeFragment implements ITdMessage {
  className: 'TdMessage';
  override props: MessageProps;
  visible?: Signal<boolean>;
  bottom?: Computed<number>;
  close?: () => void;

  constructor(option?: string | MessageProps) {
    super();
    this.className = 'TdMessage';
    let params: MessageProps = {};
    if (typeof option === 'string') {
      params.message = option;
    } else {
      params = option || {};
    }
    this.addEmits(messageEmits);
    this.assignProps(messageDefaults);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    const { ns, zIndex } = useGlobalComponentSettings('message');
    const { currentZIndex, nextZIndex } = zIndex;

    const messageRef = signal<HTMLDivElement>();
    const visible = signal(false);
    const height = signal(0);

    let stopTimer: (() => void) | undefined = undefined;

    const badgeType = computed<BadgeProps['type']>(() =>
      props.type ? (props.type === 'error' ? 'danger' : props.type) : 'info'
    );
    const typeClass = computed(() => {
      const type = props.type;
      return { [ns.bm('icon', type)]: type && !!TypeComponentsMap[type] };
    });
    const iconComponent = computed(
      () => props.icon || TypeComponentsMap[props.type!] || ''
    );

    const lastOffset = computed(() => getLastOffset(props.id!));
    const offset = computed(
      () => getOffsetOrSpace(props.id!, props.offset!) + lastOffset.get()
    );
    const bottom = computed((): number => height.get() + offset.get());
    const customStyle = computed<IStyle>(() => ({
      top: `${offset.get()}px`,
      zIndex: currentZIndex.get(),
    }));

    function startTimer() {
      if (props.duration === 0) return;
      ({ stop: stopTimer } = useTimeoutFn(() => {
        close();
      }, props.duration!));
    }

    function clearTimer() {
      stopTimer?.();
    }

    // const self = this;
    function close() {
      visible.set(false);
      // self.unmount(); // todo add by me;
      // closeMessage(this) // add by me   emits listener has some wrong , not trigger.
    }

    function keydown({ code }: KeyboardEvent) {
      if (code === EVENT_CODE.esc) {
        // press esc to close the message
        close();
      }
    }

    onMounted(() => {
      startTimer();
      nextZIndex();
      visible.set(true);
    });

    watch(
      () => unref(props.repeatNum),
      () => {
        clearTimer();
        startTimer();
      }
    );

    useEventListener(document, 'keydown', keydown);

    useResizeObserver(messageRef, () => {
      height.set(messageRef.get()!.getBoundingClientRect().height);
    });

    defineExpose({
      visible,
      bottom,
      close,
    });

    this.addChild(
      new Transition({
        name: ns.b('fade'),
        // onBeforeLeave: props.onClose, // todo 会提前消除 instance
        onAfterLeave: () => {
          console.error('TdMessage Transition afterLeave');
          props.onClose?.();
          emit('destroy');
        },
        slot: new Div({
          vShow: visible,
          refDom: messageRef,
          attrObj: {
            class: [
              ns.b(),
              { [ns.m(props.type)]: props.type },
              ns.is('center', props.center),
              ns.is('closable', props.showClose),
              ns.is('plain', props.plain),
              props.customClass,
            ],
            role: 'alert',
          },
          styleObj: customStyle,
          events: {
            mouseenter: clearTimer,
            mouseleave: startTimer,
          },
          slot: [
            new TdBadge({
              vIf: computed(() => props.repeatNum && props.repeatNum.get() > 1),
              value: props.repeatNum,
              type: badgeType.get(),
              class: ns.e('badge'),
            }),
            new TdIcon({
              vIf: iconComponent.get(),
              class: [ns.e('icon'), typeClass],
              slot: new (iconComponent.get() as typeof SvgSvg)(),
            }),
            ...arraySlot(
              props.slot ??
                (!props.dangerouslyUseHTMLString
                  ? new P({
                      // vIf: ,
                      class: ns.e('content'),
                      slot: props.message,
                    })
                  : // <!-- Caution here, message could've been compromised, never use user's input as message -->
                    new P({
                      // vIf: props.dangerouslyUseHTMLString,
                      class: ns.e('content'),
                      slot: new XElement({
                        template: props.message as string,
                      }),
                    }))
            ),
            new TdIcon({
              vIf: props.showClose,
              class: ns.e('closeBtn'),
              slot: new ElCloseSvg(),
              events: {
                click: (evt) => {
                  close();
                  evt?.stopPropagation();
                },
              },
            }),
          ],
        }),
      })
    );
  }
}
