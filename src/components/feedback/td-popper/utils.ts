// import { unrefElement } from '@vueuse/core'
// import { isClient } from '@element-plus/utils'

// import type { ComponentPublicInstance } from 'vue'
// import type { MaybeRef } from '@vueuse/core'
// import type { Modifier } from '@popperjs/core'
// import type { Measurable } from './constants'
// import type { PopperCoreConfigProps } from './content'

import { TypeNode, unrefElement } from '@type-dom/framework';
import { MaybeRef } from '@type-dom/signals';
// todo floatingui 的 api 变了
import { detectOverflow, flip, Middleware, offset, PopperOptions } from '@type-dom/popper';
import { isClient } from '@type-dom/utils';
import { PopperCoreConfigProps } from './content/content.interface';
import { Measurable } from './td-popper.interface';

export const buildPopperOptions = (
  props: PopperCoreConfigProps,
  middlewares: Middleware[] = []
) => {
  const { placement, strategy, popperOptions } = props;
  const options: PopperOptions = {
    placement,
    strategy,
    ...popperOptions,
    middleware: [...genMiddleware(props), ...middlewares],
  };

  deriveExtraMiddleware(options, popperOptions?.middleware ?? []);
  // console.error('options is ', options);
  return options;
};

export const unwrapMeasurableEl = (
  $el: MaybeRef<Measurable | TypeNode | undefined>
) => {
  if (!isClient) return;
  return unrefElement($el as HTMLElement);
};

// todo api 变了
//   应该对应新的 middleWare
function genMiddleware(options: PopperCoreConfigProps): Middleware[] {
  const { gpuAcceleration, fallbackPlacements } = options;
  return [
    offset(options.offset ?? 12),
    // {
    //   name: 'offset',
    //   options: {
    //     offset: [0, offset ?? 12],
    //   },
    // },
    // detectOverflow(state, {
    //   padding: {
    //     top: 2,
    //     bottom: 2,
    //     left: 5,
    //     right: 5,
    //   },
    // }),
    // {
    //   name: 'preventOverflow',
    //   options: {
    //   padding: {
    //     top: 2,
    //     bottom: 2,
    //     left: 5,
    //     right: 5,
    //   },
    //   },
    // },
    flip({
      padding: 5,
      fallbackPlacements,
    }),
    // {
    //   name: 'flip',
    //   options: {
    //     padding: 5,
    //     fallbackPlacements,
    //   },
    // },
    // {
    //   name: 'computeStyles',
    //   options: {
    //     gpuAcceleration,
    //   },
    // },
  ];
}

function deriveExtraMiddleware(options: any, middleware: Middleware[]) {
  if (middleware) {
    options.middleware = [...options.middleware, ...(middleware ?? [])];
  }
}
