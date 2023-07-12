import { fromEvent } from 'rxjs';
import { UiRoot } from './ui-root';
// ui components 展示页面
fromEvent(document, 'DOMContentLoaded').subscribe(() => {
  // console.log('form mode document DOMContentLoaded, e is ', e);
  const uiEl = document.querySelector('#ui-components-ref') as HTMLElement;
  console.log('uiEl is ', uiEl);
  if (uiEl) {
    const view = new UiRoot(uiEl);
    console.log('view is ', view);
  }
});
