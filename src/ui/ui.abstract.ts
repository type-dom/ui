import { ISlotNodes, ITypeConfig, SlotNode, TypeComponent, TypeElement } from '@type-dom/framework';
import { IUI, IUISlotNodes } from './ui.interface';

// export let componentId = 0;

export abstract class UI<T extends HTMLElement | undefined = HTMLElement>
  extends TypeComponent<T>
  implements IUI
{
  nodeName!: 'fragment' | string;
  dom!: T; // 默认 HTMLElement; fragment时 undefined
  // componentId: number;

  // 手动的方式设置 fragment; 实现类似 TypeFragment 类
  // protected constructor() {
  //   super();
  //   // Object.assign(this.params, params);
  //   // this.componentId = componentId++;
  //   // this.attr.addObj({
  //   //   componentId: this.componentId,
  //   // });
  //   // this.useTag(tag);
  //   // todo 统一处理，还是在各个类中处理
  //   // this.useSlots(params);
  // }
  //
  // /**
  //  * 确保slot存在，不存在则创建；
  //  * 要在useSlots之后调用
  //  *
  //  * @param name
  //  */
  // getSlotNode(name = 'default') {
  //   return this.slotNodes[name] = this.slotNodes[name] ?? new SlotNode(name);
  // }
  //
  // useSlots(params?: ITypeConfig): ISlotNodes {
  //   if (params?.slot) {
  //     this.getSlotNode().resetSlot(params.slot);
  //   }
  //   params?.slots &&
  //   Object.keys(params.slots).forEach((key) => {
  //     this.getSlotNode(key).resetSlot(params.slots?.[key]);
  //   });
  //   return this.slotNodes;
  // }
}
