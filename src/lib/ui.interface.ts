import { ITypeConfig, ITypeHtml } from '@type-dom/framework';

export interface IUI extends ITypeHtml {
  componentId?: string | number;
}

export interface IUIConfig extends ITypeConfig {
  // tag 组件标签 默认 div
  tag?: string;
  items?: IUIConfig[];
  // childNodes?: undefined; // todo 不能传子元素 td-container 有问题；
}
