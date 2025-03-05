// import { createVNode, isVNode, render } from 'vue'
// import {
//   debugWarn,
//   isBoolean,
//   isClient,
//   isElement,
//   isFunction,
//   isNumber,
//   isString,
// } from '@element-plus/utils'
// import { messageConfig } from '@element-plus/components/config-provider'
// import MessageConstructor from './message.vue'
// import { messageDefaults, messageTypes } from './message'
// import { instances } from './instance'
//
// import type { MessageContext } from './instance'
// import type { AppContext } from 'vue'
// import type {
//   Message,
//   MessageFn,
//   MessageHandler,
//   MessageOptions,
//   MessageParams,
//   MessageParamsNormalized,
//   messageType,
// } from './message'

import { isVNode, TypeNode } from '@type-dom/framework';
import {
  debugWarn,
  isBoolean,
  isClient,
  isElement,
  isFunction,
  isNumber,
  isString,
} from '@type-dom/utils';
import { messageConfig } from '../../configuration/td-config-provider/config-provider';
import {
  IMessageType,
  Message,
  MessageContext,
  MessageFn,
  MessageHandler,
  MessageOptions,
  MessageParams,
  MessageParamsNormalized,
} from './td-message.interface';
import { messageDefaults, messageTypes } from './td-message.const';
import { MessageClass } from './td-message.class';
import { instances } from './instance';

let seed = 1;

// TODO: Since Notify.ts is basically the same like this file. So we could do some encapsulation against them to reduce code duplication.

const normalizeOptions = (
  params?: string | TypeNode /* | (() => TypeNode)MessageParams*/
) => {
  const options: MessageOptions =
    !params || isString(params) || isVNode(params) || isFunction(params)
      ? { message: params }
      : params;

  const normalized = {
    ...messageDefaults,
    ...options,
  };

  if (!normalized.appendTo) {
    normalized.appendTo = document.body;
  } else if (isString(normalized.appendTo)) {
    let appendTo = document.querySelector<HTMLElement>(normalized.appendTo);

    // should fallback to default value with a warning
    if (!isElement(appendTo)) {
      debugWarn(
        'TdMessage',
        'the appendTo option is not an HTMLElement. Falling back to document.body.'
      );
      appendTo = document.body;
    }
    // console.error('appendTo is ', appendTo);
    normalized.appendTo = appendTo;
  }

  // When grouping is configured globally,
  // if grouping is manually set when calling message individually and it is not equal to the default value,
  // the global configuration cannot override the current setting. default => false
  // 先添加 config-provider组件；
  if (isBoolean(messageConfig.grouping) && !normalized.grouping) {
    normalized.grouping = messageConfig.grouping;
  }
  if (isNumber(messageConfig.duration) && normalized.duration === 3000) {
    normalized.duration = messageConfig.duration;
  }
  if (isNumber(messageConfig.offset) && normalized.offset === 16) {
    normalized.offset = messageConfig.offset;
  }
  if (isBoolean(messageConfig.showClose) && !normalized.showClose) {
    normalized.showClose = messageConfig.showClose;
  }

  return normalized as MessageParamsNormalized;
};

export const closeMessage = (instance: MessageContext) => {
  const idx = instances.get().indexOf(instance);
  if (idx === -1) return;

  instances.get().splice(idx, 1);
  const { handler } = instance;
  handler.close();
};

const createMessage = ({
  appendTo,
  ...options
}: MessageParamsNormalized): MessageContext => {
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;

  // let container: HTMLElement;

  const props = {
    ...options,
    // now the zIndex will be used inside the message.vue component instead of here.
    // zIndex: nextIndex() + options.zIndex
    id,
    onClose: () => {
      // console.error('createMessage props onClose ');
      userOnClose?.();
      closeMessage(instance);
    },
    emits: {
      // clean message element preventing mem leak
      destroy: () => {
        // todo not trigger
        // since the element is destroy, then the VNode should be collected by GC as well
        // we do not want cause any mem leak because we have returned vm as a reference to users
        // so that we manually set it to false.
        // render(null, container)
        // container?.remove();
        vnode.unmount();
      },
    },
  };
  const vnode = new MessageClass(
    props
    // isFunction(props.message) || isVNode(props.message)
    //   ? {
    //       default: isFunction(props.message)
    //         ? props.message
    //         : () => props.message,
    //     }
    //   : null
  );
  // vnode.appContext = context || message._context
  //
  // render(vnode, container)
  // vnode.mount(container);
  // instances will remove this item when close function gets called. So we do not need to worry about it.
  // appendTo.appendChild(container.firstElementChild!)
  // vnode.mount(appendTo);  // this can trigger TdMessage setup method, then compute instances array will not have this node.
  // container = vnode.downRealElement?.dom as HTMLElement;

  // const vm = vnode.component!

  const handler: MessageHandler = {
    // instead of calling the onClose function directly, setting this value so that we can have the full lifecycle
    // for out component, so that all closing steps will not be skipped.
    close: () => {
      vnode.visible?.set(false);
    },
  };

  const instance: MessageContext = {
    id,
    vnode,
    handler,
    props: vnode.props,
  };
  // todo 为啥不能直接是 TdMessage 的实例；
  return instance;
};

const message: MessageFn & Partial<Message> = (
  options = {} as string | TypeNode
) => {
  // console.log('message options is ', options);
  if (!isClient) return { close: () => undefined };

  const normalized = normalizeOptions(options as any);
  // console.error('normalized is ', normalized);
  if (normalized.grouping && instances.get().length) {
    const instance = instances
      .get()
      .find(({ vnode }) => vnode.props?.message === normalized.message);
    if (instance) {
      // instance.props.repeatNum += 1
      instance.props.repeatNum?.set((instance.props.repeatNum?.get() ?? 0) + 1);
      instance.props.type = normalized.type;
      return instance.handler;
    }
  }
  if (
    isNumber(messageConfig.max) &&
    instances.get().length >= messageConfig.max
  ) {
    return { close: () => undefined };
  }
  normalized.repeatNum?.set(1); // add by me 恢复重复数字
  const instance = createMessage(normalized);
  instances.get().push(instance);
  console.log('message instance then mount appendTo is  ', normalized.appendTo);
  instance.vnode.mount(normalized.appendTo); // add by me
  console.log('instance.vnode is ', instance.vnode);
  // instance.vnode.recurseRender(); // todo 缺少 setup hook；
  // normalized.appendTo.appendChild(instance.vnode.dom!);
  return instance.handler;
};

messageTypes.forEach((type) => {
  message[type] = (options = {}) => {
    const normalized = normalizeOptions(options as any);
    return message({ ...normalized, type });
  };
});

export function closeAll(type?: IMessageType): void {
  for (const instance of instances.get()) {
    if (!type || type === instance.props.type) {
      instance.handler.close();
    }
  }
}

message.closeAll = closeAll;
// message._context = null

export { message as TdMessage };
