// import { createVNode, isVNode, render } from 'vue'
// import {
//   debugWarn,
//   hasOwn,
//   isClient,
//   isElement,
//   isFunction,
//   isObject,
//   isString,
//   isUndefined,
// } from '@element-plus/utils'
// import MessageBoxConstructor from './index.vue'
//
// import type { AppContext, ComponentPublicInstance, VNode } from 'vue'

import { isVNode, TypeElement, TypeNode } from '@type-dom/framework';
import {
  debugWarn,
  hasOwn,
  isClient,
  isElement,
  isObject,
  isString,
  isUndefined,
} from '@type-dom/utils';
import { TdMessageBox } from './td-message-box.class';
import type {
  Action,
  Callback,
  MessageBoxProps,
  TdMessageBoxShortcutMethod,
  ITdMessageBox,
  MessageBoxData,
  MessageBoxState,
  ITdMessageBoxFn,
  TdMessageBoxOptions,
} from './td-message-box.interface';

// component default merge props & data
const messageInstance = new Map<
  TypeElement, // marking doClose as function
  {
    options: any;
    callback: Callback | undefined;
    resolve: (res: any) => void;
    reject: (reason?: any) => void;
  }
>();

const getAppendToElement = (props: any): HTMLElement => {
  let appendTo: HTMLElement | null = document.body;
  if (props.appendTo) {
    if (isString(props.appendTo)) {
      appendTo = document.querySelector<HTMLElement>(props.appendTo);
    }
    if (isElement(props.appendTo)) {
      appendTo = props.appendTo;
    }

    // should fallback to default value with a warning
    if (!isElement(appendTo)) {
      debugWarn(
        'TdMessageBox',
        'the appendTo option is not an HTMLElement. Falling back to document.body.'
      );
      appendTo = document.body;
    }
  }
  return appendTo;
};

const initInstance = (
  props: any,
  container: HTMLElement
  // appContext: AppContext | null = null
) => {
  // const vnode = createVNode(
  //   MessageBoxConstructor,
  //   props,
  //   isFunction(props.message) || isVNode(props.message)
  //     ? {
  //       default: isFunction(props.message)
  //         ? props.message
  //         : () => props.message,
  //     }
  //     : null
  // )
  // vnode.appContext = appContext
  // render(vnode, container)
  const node = new TdMessageBox(props);
  node.mount(container);
  getAppendToElement(props).appendChild(container.firstElementChild!);
  return node;
};

const genContainer = () => {
  return document.createElement('div');
};

const showMessage = (options: any) => {
  // console.warn('showMessage options is ', options);
  const container = genContainer();
  // Adding destruct method.
  // when transition leaves emitting `vanish` evt. so that we can do the clean job.
  options.emits = {};
  options.emits.vanish = () => {
    // console.warn('showMessage options emits vanish ');
    // not sure if this causes mem leak, need proof to verify that.
    // maybe calling out like 1000 msg-box then close them all.
    // render(null, container) // todo
    vm.unmount();
    messageInstance.delete(vm); // Remove vm to avoid mem leak.
    // here we were suppose to call document.body.removeChild(container.firstElementChild)
    // but render(null, container) did that job for us. so that we do not call that directly
  };

  options.emits.action = (action: Action) => {
    const currentMsg = messageInstance.get(vm)!;
    let resolve: Action | { value: string; action: Action };
    if (options.showInput) {
      resolve = { value: (vm as any).inputValue, action };
    } else {
      resolve = action;
    }
    if (options.callback) {
      options.callback(resolve, instance);
    } else {
      if (action === 'cancel' || action === 'close') {
        if (options.distinguishCancelAndClose && action !== 'cancel') {
          currentMsg.reject('close');
        } else {
          try {
            // currentMsg.reject('cancel'); // todo 会有什么影响？？？
          } catch (e) {
            console.error(e);
          }
          // currentMsg.reject('cancel');
        }
      } else {
        currentMsg.resolve(resolve);
      }
    }
  };

  const instance = initInstance(options, container)!;

  // This is how we use message box programmatically.
  // Maybe consider releasing a template version?
  // get component instance like v2.
  const vm = instance;
  // <
  //   {
  //     visible: boolean
  //     doClose: () => void
  //   } & MessageBoxState
  // >

  for (const prop in options) {
    if (hasOwn(options, prop) && !hasOwn(vm.props, prop)) {
      (vm as any)[prop] = options[prop];
    }
  }

  // change visibility after everything is settled
  vm.visible?.set(true);
  return vm;
};

async function MessageBox(
  options: TdMessageBoxOptions
  // appContext?: AppContext | null
): Promise<MessageBoxData>;
function MessageBox(
  options: TdMessageBoxOptions | string | TypeNode
  // appContext: AppContext | null = null
): Promise<{ value: string; action: Action } | Action> {
  // console.warn('MessageBox options is ', options);
  if (!isClient) return Promise.reject();
  let callback: Callback | undefined;
  if (isString(options) || isVNode(options)) {
    options = {
      message: options,
    };
  } else {
    callback = options.callback;
  }

  return new Promise((resolve, reject) => {
    const vm = showMessage(
      options
      // appContext ?? (MessageBox as ITdMessageBoxFn)._context
    );
    // collect this vm in order to handle upcoming events.
    messageInstance.set(vm, {
      options,
      callback,
      resolve,
      reject,
    });
    // console.warn('messageInstance is ', messageInstance);
  })
}

const MESSAGE_BOX_VARIANTS = ['alert', 'confirm', 'prompt'] as const;
const MESSAGE_BOX_DEFAULT_OPTS: Record<
  (typeof MESSAGE_BOX_VARIANTS)[number],
  Partial<TdMessageBoxOptions>
> = {
  alert: { closeOnPressEscape: false, closeOnClickModal: false },
  confirm: { showCancelButton: true },
  prompt: { showCancelButton: true, showInput: true },
};

MESSAGE_BOX_VARIANTS.forEach((boxType) => {
  (MessageBox as ITdMessageBoxFn)[boxType] = messageBoxFactory(
    boxType
  ) as TdMessageBoxShortcutMethod;
});

function messageBoxFactory(boxType: (typeof MESSAGE_BOX_VARIANTS)[number]) {
  // console.warn('messageBoxFactory boxType is ', boxType);
  return (
    message: string | TypeNode,
    title: string | TdMessageBoxOptions,
    options?: TdMessageBoxOptions
    // appContext?: AppContext | null
  ) => {
    let titleOrOpts = '';
    if (isObject(title)) {
      options = title as TdMessageBoxOptions;
      titleOrOpts = '';
    } else if (isUndefined(title)) {
      titleOrOpts = '';
    } else {
      titleOrOpts = title as string;
    }

    return MessageBox(
      Object.assign(
        {
          title: titleOrOpts,
          message,
          type: '',
          ...MESSAGE_BOX_DEFAULT_OPTS[boxType],
        },
        options,
        {
          boxType,
        }
      )
      // appContext
    );
  };
}

MessageBox.close = () => {
  // instance.setupInstall.doClose()
  // instance.setupInstall.state.visible = false

  messageInstance.forEach((_, vm) => {
    (vm as any).doClose();
  });

  messageInstance.clear();
};

// ;(MessageBox as ITdMessageBoxFn)._context = null

export default MessageBox as ITdMessageBoxFn;
