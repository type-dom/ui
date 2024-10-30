import { EVENT_CODE } from '@type-dom/utils';
import {
  Div,
  IEvent,
  P,
  Parser,
  SlotNode,
  Transition,
  TypeElement,
  TypeNode,
  useTimeoutFn,
  XElement
} from '@type-dom/framework';
import { IStyle } from '@type-dom/css-type';
import { ElCloseSvg, TypeComponentsMap } from '@type-dom/svgs';
import { UI } from '../../../ui/ui.abstract';
import { TdBadge } from '../../data/td-badge/td-badge.class';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { ITdMessage, ITdMessageConfig, messageDefaults } from './td-message.interface';
import {
  $messageBadgeStyle, $messageCloseBtnStyle,
  $messageContentStyle,
  $messageIconStyle,
  $messageStyle,
  useStyle
} from './td-message.style';

export class TdMessage extends UI<undefined> implements ITdMessage {
  className: 'TdMessage';
  private transition: Transition;
  private message: Div;
  override props: ITdMessageConfig;
  private visible?: boolean;
  private stopTimer: (() => void) | undefined;
  static msgId = 0;
  static msgList: TdMessage[] = [];
  private repeatNum?: number;
  private badge?: TdBadge;

  constructor(option?: string | ITdMessageConfig) {
    super();
    this.useTag('fragment');
    let params: ITdMessageConfig = {};
    if (typeof option === 'string') {
      params.message = option;
    } else {
      params = option || {};
    }
    this.className = 'TdMessage';
    this.visible = false;
    this.stopTimer = undefined;

    useStyle(params);
    this.to = params?.appendTo || document.body;
    this.transition = new Transition({
      name: 'td-message-fade',
      emits: {
        beforeLeave: () => {
          console.log('beforeLeave');
          params.onClose?.();
        },
        afterLeave: () => {
          console.log('afterLeave');
          params.emits?.destroy?.(); // destroy ???
          this.message.dom.remove();
        }
      }
    });
    this.addChild(this.transition);

    this.message = new Div({
      attrObj: {
        role: 'alert'
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
        }
      }
    });
    // this.message.style.hide();
    // this.transition.setSlot(this.message);
    this.transition.addChild(this.message);
    const type = params?.type || 'info';
    const iconComponent = params?.icon || (new TypeComponentsMap[type]()) || '';
    console.log('iconComponent', iconComponent);
    if (iconComponent) {
      this.message.addChild(new TdIcon({
        name: 'icon',
        styleObj: $messageIconStyle,
        svgObj: iconComponent
      }));
    }
    const defaultSlot = new SlotNode('default');
    this.message.addChild(defaultSlot);
    if (params?.slot) {
      defaultSlot.addSlot(params.slot);
    } else {
      if (params?.dangerouslyUseHTMLString) {
        // todo params.message 是否是html字符串
        const parser = new Parser();
        if (typeof params.message === 'string') {
          const item = parser.parseFromString(params.message) as XElement;
          defaultSlot.addSlot(new P({
            name: 'content',
            styleObj: $messageContentStyle,
            childNodes: [item]
          }));
        } else {
          console.error('params.message is not a string . ');
        }
      } else {
        console.log('params.message', params.message);
        if (params.message instanceof TypeElement) {
          defaultSlot.addSlot(new P({
            name: 'content',
            styleObj: $messageContentStyle,
            childNodes: [params.message as TypeElement]
          }));
        } else {
          defaultSlot.addSlot(new P({
            name: 'content',
            styleObj: $messageContentStyle,
            text: params?.message as string || ''
          }));
        }
      }
    }
    if (params?.showClose) {
      this.message.addChild(new TdIcon({
        name: 'close-btn',
        svgObj: new ElCloseSvg(),
        styleObj: $messageCloseBtnStyle,
        events: {
          click: (evt) => {
            console.log('close');
            evt?.stopPropagation();
            this.close();
          }
        }
      }));
    }

    this.props = this.useParams(params);

    const offset = (TdMessage.msgId * 60 + 20) + 'px';
    this.message.style.addObj({
      top: offset
    });

    if (params.grouping) {
      if (TdMessage.msgList.length === 0) {
        TdMessage.msgId = TdMessage.msgId + 1;
        TdMessage.msgList.push(this);
        // 特殊类，需要直接渲染。事件触发的类。
        this.mount(this.to);
      } else {
        const msg = TdMessage.msgList[0];
        msg.repeatNum = (msg.repeatNum || 1) + 1;
        console.log('msg.repeatNum is ', msg.repeatNum);
        if (msg.repeatNum > 1) {
          if (msg.repeatNum === 2) {
            const badgeType = msg.props.type ? (msg.props.type === 'error' ? 'danger' : msg.props.type) : 'info';
            msg.badge = new TdBadge({
              value: msg.repeatNum,
              type: badgeType,
              styleObj: $messageBadgeStyle
            })
            msg.message.addChild(msg.badge);
          } else {
            // msg.badge!.props.value = msg.repeatNum;
            msg.badge?.changeValue(msg.repeatNum);
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

  override destroy(root?: TypeNode ) {
    document.removeEventListener('keydown', this.keydown);
    super.destroy(root);
  }
  static success(message: string) {
    new TdMessage({
      message,
      type: 'success'
    })
  }

  static warning(message: string) {
    new TdMessage({
      message,
      type: 'warning'
    })
  }

  static error(message: string) {
    new TdMessage({
      message,
      type: 'error'
    })
  }

  static info(message: string) {
    new TdMessage({
      message,
      type: 'info'
    })
  }

  startTimer() {
    if (this.props.duration === 0) return;
    ({ stop: this.stopTimer } = useTimeoutFn(() => {
      this.close();
    }, this.props.duration || messageDefaults.duration));
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
    TdMessage.msgList = TdMessage.msgList.filter(item => item !== this);
    console.log('TdMessage.msgList is ', TdMessage.msgList, TdMessage.msgList.length);
    TdMessage.msgList.forEach((msg, index) => {
      const offset = (index * 60 + 20) + 'px';
      const customStyle: IStyle = {
        top: offset
      };
      msg.message.style.setObj(customStyle);
    });
    this.destroy();
  }

  keydown = ({ code }: KeyboardEvent) => {
    if (code === EVENT_CODE.esc) {
      // press esc to close the message
      this.close();
    }
  }
}
