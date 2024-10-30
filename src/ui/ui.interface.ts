import { ISlotNodes, ITypeConfig, ITypeElement, SlotNode, TypeElement } from '@type-dom/framework';

export interface IUI extends ITypeElement {
  componentId?: string | number;
}

export interface IUIConfig extends ITypeConfig {
  // tag 组件标签 默认 div
  tag?: string;
  items?: ITypeConfig[];
  childNodes?: TypeElement[] | undefined;
}

export interface IUISlotNodes extends ISlotNodes {
  default?: SlotNode; // 默认插槽，也可以没有的。
}
