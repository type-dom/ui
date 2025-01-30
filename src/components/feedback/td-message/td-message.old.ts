import {
  Div,
  Fragment,
  P,
  Parser,
  Transition,
  TypeElement,
  TypeFragment,
  useTimeoutFn,
} from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';
import { ElCloseSvg, TypeComponentsMap } from '@type-dom/svgs';
import { EVENT_CODE } from '../../../constants/aria';
import { TdBadge } from '../../data/td-badge/td-badge.class';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { ITdMessage, MessageProps } from './td-message.interface';
import {
  $messageBadgeStyle,
  $messageCloseBtnStyle,
  $messageContentStyle,
  $messageIconStyle,
  $messageStyle,
  useMessageStyle,
} from './td-message.style';
import { messageDefaults } from './td-message.const';

export class TdMessage extends TypeFragment implements ITdMessage {
  className: 'TdMessage';
  content: Transition;
  private message: Div;
  override props: MessageProps;
  private visible?: boolean;
  private stopTimer: (() => void) | undefined;
  static msgId = 0;
  static msgList: TdMessage[] = [];
  static groupList: TdMessage[] = [];
  private repeatNum?: number;
  private badge?: TdBadge;

  constructor(option?: string | MessageProps) {
    super();
    let params: MessageProps = {};
    if (typeof option === 'string') {
      params.message = option;
    } else {
      params = option || {};
    }
    this.className = 'TdMessage';
    this.visible = false;
    this.stopTimer = undefined;

    useMessageStyle(params);
    this.to = params?.appendTo || document.body;
    this.message = new Div({
      attrObj: {
        name: 'td-message',
        role: 'alert',
      },
      styleObj: $messageStyle,
      events: {
        mouseenter: () => {
          console.log('mouseenter');
          this.clearTimer();
        },
        mouseleave: () => {
          console.log('mouseleave');
          this.startTimer();
        },
      },
    });
    if (params.zIndex) {
      this.message.style.addObj({
        zIndex: params.zIndex,
      });
    }
    if (params.styleObj) {
      this.message.style.addObj(params.styleObj);
    }
    this.content = new Transition({
      name: 'td-message-fade',
      slot: this.message,
      emits: {
        beforeLeave: () => {
          console.log('beforeLeave');
          params.onClose?.();
        },
        afterLeave: () => {
          console.log('afterLeave');
          params.emits?.unmount?.(); // destroy ???
          this.message.dom?.remove();
        },
      },
    });
    this.addChild(this.content);
    // this.message.style.hide();
    const type = params?.type || 'info';
    const iconComponent = params?.icon || TypeComponentsMap[type];
    console.log('iconComponent', iconComponent);
    if (iconComponent) {
      this.message.addChild(
        new TdIcon({
          name: 'icon',
          styleObj: $messageIconStyle,
          slot: new (iconComponent as any)(),
        })
      );
    }
    const defaultSlot = new Fragment({
      name: 'default-slot',
    });
    this.message.addChild(defaultSlot);
    if (params?.slot) {
      defaultSlot.slotChildren(params.slot);
    } else {
      if (params?.dangerouslyUseHTMLString) {
        // todo params.message 是否是html字符串
        const parser = new Parser();
        if (typeof params.message === 'string') {
          const item = parser.parseFromString(params.message);
          defaultSlot.slotChildren(
            new P({
              name: 'content',
              styleObj: $messageContentStyle,
              slot: [item],
            })
          );
        } else {
          console.error('params.message is not a string . ');
        }
      } else {
        console.log('params.message', params.message);
        if (params.message instanceof TypeElement) {
          defaultSlot.slotChildren(
            new P({
              name: 'content',
              styleObj: $messageContentStyle,
              slot: [params.message as TypeElement],
            })
          );
        } else {
          defaultSlot.slotChildren(
            new P({
              name: 'content',
              styleObj: $messageContentStyle,
              slot: (params?.message as string) || '',
            })
          );
        }
      }
    }
    if (params?.showClose) {
      this.message.addChild(
        new TdIcon({
          name: 'close-btn',
          slot: new ElCloseSvg(),
          styleObj: $messageCloseBtnStyle,
          events: {
            click: (evt) => {
              console.log('close');
              evt?.stopPropagation();
              this.close();
            },
          },
        })
      );
    }
    this.assignProps(messageDefaults);
    this.props = this.useParams(params);

    const offset = TdMessage.msgId * 60 + 20 + 'px';
    this.message.style.addObj({
      top: offset,
    });

    if (params.grouping) {
      if (TdMessage.groupList.length === 0) {
        TdMessage.msgId = TdMessage.msgId + 1;
        TdMessage.groupList.push(this);
        // 特殊类，需要直接渲染。事件触发的类。
        this.mount(this.to);
      } else {
        const msg = TdMessage.groupList[0];
        msg.repeatNum = (msg.repeatNum || 1) + 1;
        console.log('msg.repeatNum is ', msg.repeatNum);
        if (msg.repeatNum > 1) {
          if (msg.repeatNum === 2) {
            const badgeType = msg.props.type
              ? msg.props.type === 'error'
                ? 'danger'
                : msg.props.type
              : 'info';
            msg.badge = new TdBadge({
              value: msg.repeatNum,
              type: badgeType,
              styleObj: $messageBadgeStyle,
            });
            msg.message.addChild(msg.badge);
          } else {
            // msg.badge!.props.value = msg.repeatNum;
            // msg.badge?.changeValue(msg.repeatNum);
          }
        }
        this.clearTimer();
        msg.clearTimer();
        msg.startTimer();
        msg.mount(msg.to);
      }
    } else {
      TdMessage.msgId = TdMessage.msgId + 1;
      TdMessage.msgList.push(this);
      // 特殊类，需要直接渲染。事件触发的类。
      this.mount(this.to);
    }
  }

  override mounted() {
    if (this?.repeatNum && this?.repeatNum > 1) {
      return;
    }
    this.startTimer();
    // nextZIndex()
    this.visible = true;
    this.message.style.show('flex');
    document.addEventListener('keydown', this.keydown);
  }

  override unmount(root?: TypeElement) {
    document.removeEventListener('keydown', this.keydown);
    super.unmount(root);
  }

  static success(message: string, styleObj?: IStyle) {
    return new TdMessage({
      message,
      type: 'success',
      styleObj,
    });
  }

  static warning(message: string, styleObj?: IStyle) {
    return new TdMessage({
      message,
      type: 'warning',
      styleObj,
    });
  }

  static error(message: string, styleObj?: IStyle) {
    return new TdMessage({
      message,
      type: 'error',
      styleObj,
    });
  }

  static info(message: string, styleObj?: IStyle) {
    return new TdMessage({
      message,
      type: 'info',
      styleObj,
    });
  }

  startTimer() {
    if (this.props.duration === 0) return;
    ({ stop: this.stopTimer } = useTimeoutFn(() => {
      this.close();
    }, this.props.duration || 3000));
  }

  clearTimer() {
    this.stopTimer?.();
  }

  close() {
    console.log('close . ');
    this.visible = false;
    this.message.style.hide();
    this.clearTimer();
    TdMessage.msgId = (TdMessage.msgId || 1) - 1;
    TdMessage.groupList = TdMessage.groupList.filter((item) => item !== this);
    TdMessage.msgList = TdMessage.msgList.filter((item) => item !== this);
    console.log(
      'TdMessage.msgList is ',
      TdMessage.msgList,
      TdMessage.msgList.length
    );
    TdMessage.msgList.forEach((msg, index) => {
      const offset = index * 60 + 20 + 'px';
      const customStyle: IStyle = {
        top: offset,
      };
      msg.message.style.setObj(customStyle);
    });
    this.unmount();
  }

  keydown = ({ code }: KeyboardEvent) => {
    if (code === EVENT_CODE.esc) {
      // press esc to close the message
      this.close();
    }
  };

  resetZIndex(zIndex: number) {
    this.message.style.setObj({
      zIndex,
    });
  }
}
