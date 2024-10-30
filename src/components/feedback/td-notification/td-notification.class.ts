import { EVENT_CODE } from '@type-dom/utils';
import {
  Div,
  Head,
  P, Parser,
  TextNode,
  Transition,
  TypeElement, TypeNode,
  useTimeoutFn
} from '@type-dom/framework';
import { ElCloseSvg, TypeComponentsMap } from '@type-dom/svgs';
import { IStyle } from '@type-dom/css-type';
import { UI } from '../../../ui/ui.abstract';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import {
  $notificationCloseBtnStyle,
  $notificationContentStyle,
  $notificationGroupStyle,
  $notificationIconStyle,
  $notificationStyle,
  $notificationTitleStyle,
  useStyle
} from './td-notification.style';
import {
  INotificationPosition,
  ITdNotification,
  ITdNotificationConfig
} from './td-notification.interface';

export class TdNotification extends UI<undefined> implements ITdNotification {
  className: 'TdNotification';
  override props: ITdNotificationConfig;
  visible = false;
  private transition: Transition;
  private notification: Div;
  private group: Div;
  private title: Head;
  private content: Div;
  private closeBtn?: TdIcon;
  static notifyId = 0;
  // This should be a queue but considering there were `non-autoclosable` notifications.
  static notifications: Record<INotificationPosition, TdNotification[]> = {
    'top-left': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-right': [],
  };

  // the gap size between each notification
  GAP_SIZE = 16;
  seed = 1;
  timer: (() => void) | undefined = undefined;
  private verticalProperty: 'top' | 'bottom';

  constructor(option?: string | ITdNotificationConfig) {
    super();
    this.useTag('fragment');
    let params: ITdNotificationConfig | undefined;
    if (typeof option === 'string') {
      params = { message: option };
    } else {
      params = option;
    }
    this.className = 'TdNotification';
    useStyle(params);
    this.to = document.body;
    this.transition = new Transition({
      name: 'fade',
      emits: {
        beforeLeave: (el: HTMLElement, done: () => void) => {
          console.log('beforeLeave');
          params?.onClose && params.onClose();
        },
        afterLeave: (el: HTMLElement, done: () => void) => {
          console.log('afterLeave');
          //   destroy
          this.destroy();
        },
      },
    });
    this.addChild(this.transition);
    this.notification = new Div({
      attrObj: {
        role: 'alert',
      },
      styleObj: $notificationStyle,
      events: {
        mouseenter: () => {
          console.log('mouseenter');
        },
        mouseleave: () => {
          console.log('mouseleave');
        },
        click: () => {
          console.log('click');
        },
      },
    });
    this.transition.addChild(this.notification);

    let iconComponent;
    if (params?.type && TypeComponentsMap[params.type]) {
      console.log('params.type is ', params.type);
      iconComponent = new TypeComponentsMap[params.type]();
    } else {
      iconComponent = params?.icon;
    }
    let icon;
    if (iconComponent) {
      icon = new TdIcon({
        name: 'icon',
        styleObj: $notificationIconStyle,
        svgObj: iconComponent,
      });
      this.notification.addChild(icon);
    }
    this.group = new Div({
      name: 'group',
      styleObj: $notificationGroupStyle,
    });
    this.title = new Head({
      name: 'title',
      nodeName: 'h2',
      text: params?.title,
      styleObj: $notificationTitleStyle,
    });
    this.group.addChild(this.title);
    this.content = new Div({
      name: 'content',
      styleObj: $notificationContentStyle,
    });
    if (params?.slot) {
      this.content.slotChild(params.slot);
    } else {
      if (params?.dangerouslyUseHTMLString) {
        if (typeof params.message === 'string') {
          const parser = new Parser();
          const el = parser.parseFromString(params.message);
          this.content.addChild(
            new P({
              childNodes: [el],
            })
          );
        } else {
          console.warn('params.message is not a string . ');
        }
      } else {
        const p = new P();
        if (params?.message instanceof TypeElement) {
          p.addChild(params.message);
        } else {
          p.addChild(new TextNode(params?.message as string));
        }
        this.content.addChild(p);
      }
    }
    this.group.addChild(this.content);
    if (params?.showClose !== false) {
      this.closeBtn = new TdIcon({
        name: 'close-btn',
        styleObj: $notificationCloseBtnStyle,
        svgObj: new ElCloseSvg(),
        events: {
          click: (evt) => {
            evt?.stopPropagation();
            this.close();
          },
        },
      });
      this.group.addChild(this.closeBtn);
    }

    this.notification.addChild(this.group);

    const position = params?.position || 'top-right';
    const horizontal = position.endsWith('right') ? 'right' : 'left';
    this.notification.style.addObj({ [horizontal]: '16px' });

    this.verticalProperty = position.startsWith('top') ? 'top' : 'bottom';

    let verticalOffset = params?.offset || 0;
    console.log('verticalOffset is ', verticalOffset);
    TdNotification.notifications[position].forEach((item) => {
      verticalOffset += item.notification.dom.offsetHeight + this.GAP_SIZE;
    });
    verticalOffset = verticalOffset + this.GAP_SIZE;
    const positionStyle: IStyle = {
      [this.verticalProperty]: `${verticalOffset}px`,
      zIndex: 9999, // params?.zIndex ?? currentZIndex,
    };
    this.notification.style.addObj(positionStyle);

    TdNotification.notifyId = TdNotification.notifyId + 1;
    TdNotification.notifications[position].push(this);
    this.props = this.useParams(params);

    this.mount(this.to);
  }

  override mounted() {
    this.startTimer();
    // nextZIndex()
    this.visible = true;
    document.addEventListener('keydown', this.onKeydown);
  }

  override destroy(root?: TypeNode) {
    document.removeEventListener('keydown', this.onKeydown);
    super.destroy(root);
  }

  static success(params?: ITdNotificationConfig) {
    new TdNotification({
      type: 'success',
      ...params,
    });
  }

  static warning(params?: ITdNotificationConfig) {
    new TdNotification({
      type: 'warning',
      ...params,
    });
  }

  static error(params?: ITdNotificationConfig) {
    new TdNotification({
      type: 'error',
      ...params,
    });
  }

  static info(params?: ITdNotificationConfig) {
    new TdNotification({
      type: 'info',
      ...params,
    });
  }

  startTimer() {
    console.log('startTimer . ');
    const duration = this.props?.duration ?? 4500;
    if (duration > 0) {
      ({ stop: this.timer } = useTimeoutFn(() => {
        if (this.visible) this.close();
      }, duration));
    }
  }

  clearTimer() {
    this.timer?.();
  }

  close() {
    this.visible = false;
    this.notification.style.hide();
    const position = this.props.position || 'top-right';
    TdNotification.notifications[position] = TdNotification.notifications[
      position
    ].filter((notification) => notification !== this);
    TdNotification.notifyId = TdNotification.notifyId - 1;
    let verticalOffset = this.props.offset || 0;
    console.log('height is ', verticalOffset);
    TdNotification.notifications[position].forEach((item, index) => {
      verticalOffset = verticalOffset + this.GAP_SIZE;
      item.notification.style.setObj({
        [this.verticalProperty]: `${verticalOffset}px`,
      });
      verticalOffset += item.notification.dom.offsetHeight; // + this.GAP_SIZE;
    });
    this.destroy(); // todo 应该是 Transition 的 afterLeave 触发 destroy；  会删除props
  }

  onKeydown = ({ code }: KeyboardEvent) => {
    console.log('onKeydown ', code);
    if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) {
      this.clearTimer(); // press delete/backspace clear timer
    } else if (code === EVENT_CODE.esc) {
      // press esc to close the notification
      if (this.visible) {
        this.close();
      }
    } else {
      this.startTimer(); // resume timer
    }
  }
}
