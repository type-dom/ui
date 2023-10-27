import { fromEvent } from 'rxjs';
import { Option, TextNode, TypeHtml, TypeSelect } from 'type-dom.ts';
import { IOptionConfig } from './select.interface';
export class Select extends TypeSelect {
  className: 'Select';
  parent?: TypeHtml;
  childNodes: Option[];
  value: string | number | boolean;
  constructor() {
    super();
    this.className = 'Select';
    this.childNodes = [];
    this.value = '';
  }
  setOptionConfig(optionConfig: IOptionConfig): void {
    this.clearChildNodes();
    this.clearChildDom();
    optionConfig.options.forEach((opt) => {
      const optionObj = new Option(this);
      optionObj.setAttrObj({
        // label: opt.label,
        value: opt.value,
        selected: opt.selected || false,
      });
      if (opt.selected) {
        this.value = opt.value;
      }
      const text = new TextNode(opt.label);
      optionObj.childNodes = [text];
      this.addChild(optionObj);
    });
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'click').subscribe(() => {
        console.log('this.dom click . ');
        console.log('this.dom.value is ', this.dom.value);
        this.value = this.dom.value; // 对应的opt.label.
        this.childNodes.forEach(opt => {
          if (opt.dom.value === this.dom.value) {
            opt.setAttrObj({
              selected: true,
            });
          } else {
            opt.removeAttribute('selected');
          }
        });
      })
    );
  }

  // 1.判断select选项中 是否存在Value="paraValue"的Item
  jsSelectIsExitItem(objSelect: HTMLSelectElement, objItemValue: string): boolean {
    let isExit = false;
    for (let i = 0; i < objSelect.options.length; i++) {
      if (objSelect.options[i].value === objItemValue) {
        isExit = true;
        break;
      }
    }
    return isExit;
  }

  // 2.向select选项中 加入一个Item
  jsAddItemToSelect(objSelect: HTMLSelectElement, objItemText: string | undefined, objItemValue: string): void {
    // 判断是否存在
    if (this.jsSelectIsExitItem(objSelect, objItemValue)) {
      alert('该Item的Value值已经存在');
    } else {
      // let varItem = new Option(objItemText, objItemValue);
      // objSelect.options.add(varItem);
      alert('成功加入');
    }
  }

  // 3.从select选项中 删除一个Item
  jsRemoveItemFromSelect(objSelect: HTMLSelectElement, objItemValue: string): void {
    // 判断是否存在
    if (this.jsSelectIsExitItem(objSelect, objItemValue)) {
      for (let i = 0; i < objSelect.options.length; i++) {
        if (objSelect.options[i].value === objItemValue) {
          objSelect.options.remove(i);
          break;
        }
      }
      alert('成功删除');
    } else {
      alert('该select中 不存在该项');
    }
  }


  // 4.删除select中选中的项
  jsRemoveSelectedItemFromSelect(objSelect: HTMLSelectElement): void {
    let length = objSelect.options.length - 1;
    for (let i = length; i >= 0; i--) {
      if ((objSelect[i] as HTMLOptionElement).selected === true) {
        // objSelect.options[i] = null;
      }
    }
  }

  // 5.修改select选项中 value="paraValue"的text为"paraText"
  jsUpdateItemToSelect(objSelect: HTMLSelectElement, objItemText: string, objItemValue: string): void {
    // 判断是否存在
    if (this.jsSelectIsExitItem(objSelect, objItemValue)) {
      for (let i = 0; i < objSelect.options.length; i++) {
        if (objSelect.options[i].value === objItemValue) {
          objSelect.options[i].text = objItemText;
          break;
        }
      }
      alert('成功修改');
    } else {
      alert('该select中 不存在该项');
    }
  }

  // 6.设置select中text="paraText"的第一个Item为选中
  jsSelectItemByValue(objSelect: HTMLSelectElement, objItemText: string): void {
    // 判断是否存在
    let isExit = false;
    for (let i = 0; i < objSelect.options.length; i++) {
      if (objSelect.options[i].text === objItemText) {
        objSelect.options[i].selected = true;
        isExit = true;
        break;
      }
    }
    // Show出结果
    if (isExit) {
      alert('成功选中');
    } else {
      alert('该select中 不存在该项');
    }
  }

  // // 7.设置select中value="paraValue"的Item为选中
  // document.all.objSelect.value = objItemValue;

  // // 8.得到select的当前选中项的value
  // var currSelectValue = document.all.objSelect.value;

  // // 9.得到select的当前选中项的text
  // var currSelectText = document.all.objSelect.options[document.all.objSelect.selectedIndex].text;

  // // 10.得到select的当前选中项的Index
  // var currSelectIndex = document.all.objSelect.selectedIndex;

  // // 11.清空select的项
  // document.all.objSelect.options.length = 0;
}
