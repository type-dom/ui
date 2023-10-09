import { fromEvent } from 'rxjs';
import { TypeHtml, TypeSelect } from 'type-dom.ts';
import { IOption } from '../../form/field-item/field-item.interface';
import { SelectOption } from './option/option.class';
import { ITdSelect } from './td-select.interface';
export class TdSelect extends TypeSelect implements ITdSelect {
  className: 'TdSelect';
  childNodes: SelectOption[];
  value?: string | number | boolean;
  constructor(public parent: TypeHtml) {
    super();
    this.className = 'TdSelect';
    this.propObj.attrObj = {
      name: 'td-select'
    };
    this.childNodes = [];
  }
  setOptions(options: IOption[], value: string | number | boolean): void {
    this.clearChildNodes();
    this.clearChildDom();
    const firstOpt = new SelectOption(this);
    firstOpt.text.setText('请选择');
    firstOpt.addAttrObj({
      label: '请选择',
      value: 0
    });
    this.addChild(firstOpt);
    options.forEach(opt => {
      const optObj = new SelectOption(this);
      optObj.text.setText(opt.label);
      optObj.addAttrObj({
        label: opt.label,
        value: opt.value
      });
      // console.log('opt is ', opt);
      // opt.selected && optObj.addAttribute('selected', true);
      this.addChild(optObj);
    });
    this.childNodes.forEach(optObj => {
      if (String(optObj.attrObj.value).trim() === String(value).trim()) {
        optObj.addAttribute('selected', true);
      } else {
        // optObj.removeAttribute('selected');
      }
    });
    // console.error('this.dom.value is ', this.dom.value);
  }
  resetOptions(options: IOption[], value: string | number | boolean): void {
    this.setOptions(options, value);
    this.render(); // 需要单独渲染。
    // console.error('this.dom.value is ', this.dom.value);
  }
  initEvents(): void {
    this.events.push(
      // 如果只有一个选项时，监听change，input有问题。
      fromEvent(this.dom, 'click').subscribe((evt) => {
        console.log('this.select.dom click, event is ', evt);
        console.log('this.select.dom.value is ', this.dom.value);
        // console.log(this.reset);
        // this.setValue(this.dom.value);
        this.value = this.dom.value;
      }),
      fromEvent(this.dom, 'change').subscribe((evt) => {
        console.log('this.select.dom change, event is ', evt);
        console.log('this.select.dom.value is ', this.dom.value);
        // console.log(this.reset);
        // this.setValue(this.dom.value);
        this.value = this.dom.value;
      })
    );
  }
  // render(): void {
  //   console.error('select element render . ');
  //   super.render();
  // }
}
