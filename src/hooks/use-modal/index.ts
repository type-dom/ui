// import { watch } from 'vue'
// import { isClient, useEventListener } from '@vueuse/core'
// import { EVENT_CODE } from '@element-plus/constants'
//
// import type { Ref } from 'vue'
import { isClient } from '@type-dom/utils';
import { watch, Ref } from '@type-dom/signals';
import { useEventListener } from '@type-dom/framework';
import { EVENT_CODE } from '../../constants/aria';

type ModalInstance = {
  handleClose: () => void;
};

const modalStack: ModalInstance[] = [];

const closeModal = (e: KeyboardEvent) => {
  if (modalStack.length === 0) return;
  if (e.code === EVENT_CODE.esc) {
    e.stopPropagation();
    const topModal = modalStack[modalStack.length - 1];
    topModal.handleClose();
  }
};

export const useModal = (instance: ModalInstance, visibleRef: Ref<boolean>) => {
  watch(() => visibleRef.get(), (val) => {
    if (val) {
      modalStack.push(instance);
    } else {
      modalStack.splice(modalStack.indexOf(instance), 1);
    }
  });
};

if (isClient) useEventListener(document, 'keydown', closeModal);
