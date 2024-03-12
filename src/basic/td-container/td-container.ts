import { TdContainer } from './td-container.class';
export class TdContainerComp extends HTMLElement {
  public static observedAttributes = [];
  /**
   * connectedCallback会在 custom element 首次被插入到文档 DOM 节点上时被调用，
   * 而 attributeChangedCallback则会在 custom element 增加、删除或者修改某个属性时被调用。
   */
  connectedCallback() { // 省去了监听document加载完毕
    const title = 'td-container';
    const container = new TdContainer();
    container.setAttrName(title);
    // 渲染
    container.render();
    console.log('container is ', container);
  }
}
customElements.define('td-container', TdContainerComp);
