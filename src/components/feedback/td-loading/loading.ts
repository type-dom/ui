// import {
//   Transition,
//   createApp,
//   createVNode,
//   defineComponent,
//   h,
//   reactive,
//   ref,
//   toRefs,
//   vShow,
//   withCtx,
//   withDirectives,
// } from 'vue'
// import { removeClass } from '@element-plus/utils'
// import { useGlobalComponentSettings } from '@element-plus/components/config-provider'
//
// import type { UseNamespaceReturn } from '@element-plus/hooks'

import { signal } from '@type-dom/signals';
import { removeClass } from '@type-dom/utils';
import { Div, P, Transition, TypeFragment } from '@type-dom/framework';
// import { SvgSvg } from '@type-dom/svgs';
import { UseNamespaceReturn } from '../../../hooks/use-namespace';
import { useGlobalComponentSettings } from '../../configuration/td-config-provider';
import { LoadingOptionsResolved } from './types';

export function createLoadingComponent(options: LoadingOptionsResolved) {
  let afterLeaveTimer: ReturnType<typeof setTimeout>;
  // IMPORTANT NOTE: this is only a hacking way to expose the injections on an
  // instance, DO NOT FOLLOW this pattern in your own code.
  const afterLeaveFlag = signal(false);
  const data = {
    ...options,
    originalPosition: '',
    originalOverflow: '',
    visible: false
  };

  function setText(text: string) {
    data.text = text;
  }

  function destroySelf() {
    const target = data.parent!;
    const ns = (vm as any).ns as UseNamespaceReturn;
    if (!target?.vLoadingAddClassList) {
      let loadingNumber: number | string | null | undefined =
        target?.getAttribute('loading-number');
      loadingNumber = Number.parseInt(loadingNumber as any) - 1;
      if (!loadingNumber) {
        removeClass(target, ns.bm('parent', 'relative'));
        target.removeAttribute('loading-number');
      } else {
        target.setAttribute('loading-number', loadingNumber.toString());
      }
      removeClass(target, ns.bm('parent', 'hidden'));
    }
    removeElLoadingChild();
    loadingInstance.unmount();
  }

  function removeElLoadingChild(): void {
    vm.dom?.parentNode?.removeChild(vm.dom);
  }

  function close() {
    if (options.beforeClose && !options.beforeClose()) return;

    afterLeaveFlag.set(true);
    clearTimeout(afterLeaveTimer);

    afterLeaveTimer = setTimeout(handleAfterLeave, 400);
    data.visible = false;

    options.closed?.();
  }

  function handleAfterLeave() {
    if (!afterLeaveFlag.get()) return;
    const target = data.parent;
    afterLeaveFlag.set(false);
    target!.vLoadingAddClassList = undefined;
    destroySelf();
  }

  class TdLoading extends TypeFragment {
    className: 'TdLoading';

    constructor() {
      super();
      this.className = 'TdLoading';
    }

    override setup() {
      const { ns } = useGlobalComponentSettings('loading');
      // const svg = data?.spinner || data?.svg;
      // const spinner = new SvgSvg({
      //   name: 'spinner',
      //   attrObj: {
      //     class: 'circular',
      //     viewBox: data?.svgViewBox ? data.svgViewBox : '0 0 50 50'
      //   },
      //   slot: new SvgCircle({
      //     attrObj: {
      //       class: 'path',
      //       cx: '25',
      //       cy: '25',
      //       r: '20',
      //       fill: 'none'
      //     }
      //   })
      // });
      const spinnerText = data.text ? new P({
        class: ns.b('text'),
        slot: data.text
      }) : undefined;

      this.addChild(new Transition({
        name: ns.b('fade'),
        onAfterLeave: handleAfterLeave,
        slot: new Div({
          vShow: data.visible,
          class: [
            ns.b('mask'),
            data.customClass,
            data.fullscreen ? 'is-fullscreen' : ''
          ],
          styleObj: {
            backgroundColor: data.background || ''
          },
          slot: [
            new Div({
              class: ns.b('spinner'),
              slot: [spinnerText, spinnerText]
            })
          ]
        })
      }));


    }
  }

  // const elLoadingComponent = new TdLoading()

  const loadingInstance = new TdLoading(); // createApp(elLoadingComponent)
  const vm = loadingInstance.mount(document.createElement('div'));

  return {
    // ...toRefs(data),
    data,
    setText,
    removeElLoadingChild,
    close,
    handleAfterLeave,
    vm,
    get $el(): HTMLElement {
      return vm.dom as HTMLElement;
    }
  };
}

// export type LoadingInstance = ReturnType<typeof createLoadingComponent>
