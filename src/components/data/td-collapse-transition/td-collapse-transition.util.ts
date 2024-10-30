import { ITransitionConfig, TypeHtml, TypeSvg } from '@type-dom/framework';

const reset = (element?: TypeHtml | TypeSvg) => {
  const el = element?.dom;
  if (!el) {
    throw Error('element is not exist . ');
  }
  // el.style.maxHeight = '';
  // el.style.overflow = el.dataset.oldOverflow
  // el.style.paddingTop = el.dataset.oldPaddingTop
  // el.style.paddingBottom = el.dataset.oldPaddingBottom
  element?.style.setObj({
    maxHeight: '',
    overflow: el.dataset.oldOverflow,
    paddingTop: el.dataset.oldPaddingTop,
    paddingBottom: el.dataset.oldPaddingBottom
  });
};

export const collapseTransitionConfig: ITransitionConfig = {
  onBeforeEnter(element: TypeHtml | TypeSvg) {
    console.log('beforeEnter . ');
    const el = element?.dom;
    if (!el) {
      throw Error('element is not exist . ');
    }
    if (!el.dataset) {
      // el.dataset = {};
      element.attr.set('dataset', false);
    }
    element.attr.setObj({
      dataOldPaddingTop: el.style.paddingTop,
      dataOldPaddingBottom: el.style.paddingBottom
    });
    // el.dataset.oldPaddingTop = el.style.paddingTop
    // el.dataset.oldPaddingBottom = el.style.paddingBottom
    if (el.style.height) {
      // el.dataset.existsHeight = el.style.height
      element.attr.setObj({
        dataExistsHeight: el.style.height
      });
    }

    // el.style.maxHeight = 0
    // el.style.paddingTop = 0
    // el.style.paddingBottom = 0
    element.style.setObj({
      maxHeight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      transition: 'max-height .3s ease-in-out'
    });
  },

  onEnter(element: TypeHtml | TypeSvg) {
    console.log('enter . ');
    const el = element?.dom;
    if (!el) {
      throw Error('element is not exist . ');
    }
    requestAnimationFrame(() => {
      element.attr.setObj({
        dataOldOverflow: el.style.overflow
      });
      // el.dataset.oldOverflow = el.style.overflow
      if (el.dataset.existsHeight) {
        // el.style.maxHeight = el.dataset.existsHeight
        element.style.setObj({
          maxHeight: el.dataset.existsHeight
        });
      } else if (el.scrollHeight !== 0) {
        // el.style.maxHeight = `${el.scrollHeight}px`
        element.style.setObj({
          maxHeight: `${el.scrollHeight}px`
        });
      } else {
        // el.style.maxHeight = 0
        element.style.setObj({
          maxHeight: 0
        });
      }
      // el.style.paddingTop = el.dataset.oldPaddingTop
      // el.style.paddingBottom = el.dataset.oldPaddingBottom
      // el.style.overflow = 'hidden'
      element.style.setObj({
        paddingTop: el.dataset.oldPaddingTop,
        paddingBottom: el.dataset.oldPaddingBottom,
        overflow: 'hidden'
      });
    });
  },

  onAfterEnter(element: TypeHtml | TypeSvg) {
    // el.style.maxHeight = ''
    // el.style.overflow = el.dataset.oldOverflow
    element?.style.setObj({
      maxHeight: '',
      overflow: element?.dom?.dataset.oldOverflow
    });
  },

  onEnterCancelled(element: TypeHtml | TypeSvg) {
    reset(element);
  },

  onBeforeLeave(element: TypeHtml | TypeSvg) {
    const el = element?.dom;
    if (!el) {
      throw Error('element is not exist . ');
    }
    // if (!el.dataset) el.dataset = {}
    // el.dataset.oldPaddingTop = el.style.paddingTop
    // el.dataset.oldPaddingBottom = el.style.paddingBottom
    // el.dataset.oldOverflow = el.style.overflow
    element.attr.setObj({
      dataOldPaddingTop: el.style.paddingTop,
      dataOldPaddingBottom: el.style.paddingBottom,
      dataOldOverflow: el.style.overflow
    });

    // el.style.maxHeight = `${el.scrollHeight}px`
    // el.style.overflow = 'hidden'
    element.style.setObj({
      maxHeight: `${el.scrollHeight}px`,
      overflow: 'hidden'
    });
  },

  onLeave(element: TypeHtml | TypeSvg) {
    const el = element?.dom;
    if (!el) {
      throw Error('element is not exist . ');
    }
    if (el.scrollHeight !== 0) {
      // el.style.maxHeight = 0
      // el.style.paddingTop = 0
      // el.style.paddingBottom = 0
      element.style.setObj({
        maxHeight: 0,
        paddingTop: 0,
        paddingBottom: 0
      });
    }
  },

  onAfterLeave(element: TypeHtml | TypeSvg) {
    reset(element);
  },

  onLeaveCancelled(element: TypeHtml | TypeSvg) {
    reset(element);
  }
};
